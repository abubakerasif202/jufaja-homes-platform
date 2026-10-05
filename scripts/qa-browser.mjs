/** Production browser audit. All enquiries intercepted; never sends a lead. */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
const require = createRequire(import.meta.url);
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
const productionHosts = ['jufaja-homes-platform.vercel.app', 'www.jufajaconstructions.com.au', 'jufajaconstructions.com.au'];
assert(local || (argument('live', 'false') === 'true' && base.protocol === 'https:' && productionHosts.includes(base.hostname)), 'Use localhost or an approved HTTPS production host with --live=true');
const output = argument('output', path.join(tmpdir(), 'jufaja-production-audit'));
await mkdir(output, { recursive: true });
const app = new URL('../src/app/', import.meta.url);
async function discover(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = entries.some(entry => entry.name === 'page.tsx') ? [prefix || '/'] : [];
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[') && entry.name !== 'api') routes.push(...await discover(new URL(`${entry.name}/`, directory), `${prefix}/${entry.name}`));
  }
  return routes;
}
const designs = JSON.parse(await readFile(new URL('../src/data/designs.json', import.meta.url), 'utf8'));
const topRoutes = await discover(app);
const detailRoutes = designs.map(design => `/designs/${design.slug}`);
const samples = ['single', 'double', 'duplex', 'granny', 'rural'].map(type => designs.find(design => design.dwellingType === type)).filter(Boolean).map(design => `/designs/${design.slug}`);
const widths = [...new Set(argument('widths', '320,360,390,430,768,1024,1280,1440,1920').split(',').map(Number))];
assert(widths.length && widths.every(width => Number.isInteger(width) && width >= 320 && width <= 2560), 'Invalid audit widths');
const report = { base: base.origin, output, routes: [...topRoutes, ...detailRoutes], matrix: [], interactions: [], errors: [], enquiriesIntercepted: 0 };
const requestedRoutes = argument('routes', '').split(',').filter(Boolean);
assert(requestedRoutes.every(route => report.routes.includes(route)), 'Audit route is not a discovered public page');
report.routeScope = requestedRoutes.length ? requestedRoutes : 'all';
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    window.auditVitals = { cls: 0, lcp: 0, shifts: [] };
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) {
        window.auditVitals.cls += entry.value;
        window.auditVitals.shifts.push({ value: entry.value, sources: entry.sources.map(source => ({ element: source.node?.outerHTML?.slice(0, 160), previous: source.previousRect, current: source.currentRect })) });
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) window.auditVitals.lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  let delivery = 'error';
  await context.route('**/api/enquiry', async route => {
    report.enquiriesIntercepted++;
    await new Promise(resolve => setTimeout(resolve, 350));
    await route.fulfill({ status: delivery === 'success' ? 200 : 503, contentType: 'application/json', body: JSON.stringify(delivery === 'success' ? { success: true } : { success: false, error: 'Intercepted QA delivery failure.' }) });
  });
  const page = await context.newPage();
  page.on('pageerror', error => {
    const finding = { url: page.url(), viewport: page.viewportSize(), error: error.message, stack: error.stack };
    report.errors.push(finding);
    console.error(finding);
  });
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().includes('503') && !message.text().includes('404')) {
      const finding = { url: page.url(), viewport: page.viewportSize(), error: message.text() };
      report.errors.push(finding);
      console.error(finding);
    }
  });
  const links = new Set();
  async function open(route, expected = 200) {
    const response = await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
    assert.equal(response.status(), expected, route);
    await page.evaluate(() => document.fonts.ready);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 650) { await page.evaluate(top => window.scrollTo(0, top), y); await page.waitForTimeout(25); }
    await page.waitForTimeout(100);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() => [...document.images].filter(image => image.getClientRects().length).every(image => image.complete), undefined, { timeout: 20000 });
    await page.evaluate(async () => Promise.all([...document.images].filter(image => image.getClientRects().length && image.naturalWidth).map(image => image.decode())));
  }
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    const routes = requestedRoutes.length ? requestedRoutes : width === 390 || width === 1440 ? report.routes : [...topRoutes, ...samples];
    for (const route of [...routes, '/audit-missing-page']) {
      await open(route, route === '/audit-missing-page' ? 404 : 200);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        brokenImages: [...document.images].filter(image => image.getClientRects().length && image.complete && !image.naturalWidth).map(image => image.currentSrc),
        h1: document.querySelectorAll('main h1').length,
        mains: document.querySelectorAll('main').length,
        canonical: document.querySelector('link[rel=canonical]')?.href,
        missingAlt: [...document.images].filter(image => !image.hasAttribute('alt')).length,
        vitals: window.auditVitals,
        links: [...document.querySelectorAll('a[href]')].map(link => link.getAttribute('href')).filter(href => href.startsWith('/') && !href.startsWith('//')),
      }));
      result.links.forEach(link => links.add(link));
      delete result.links;
      const screenshot = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '--')}-${width}.png`;
      await page.screenshot({ path: path.join(output, screenshot), fullPage: true });
      report.matrix.push({ route, width, ...result, screenshot });
      assert(result.overflow <= 1, `${route}: ${result.overflow}px overflow at ${width}`);
      assert.equal(result.brokenImages.length, 0, `${route}: broken image at ${width}`);
      assert.equal(result.h1, 1, `${route}: H1 count`);
      assert.equal(result.mains, 1, `${route}: main count`);
      assert.equal(result.missingAlt, 0, `${route}: missing alt`);
    }
    console.log(`Passed width ${width}: ${routes.length + 1} pages`);
  }
  for (const href of links) { const response = await context.request.get(new URL(href, base).href); assert(response.ok(), `Broken internal link: ${href}`); }
  report.interactions.push(`${links.size} unique internal links resolve`);
  for (const route of ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest']) assert((await context.request.get(new URL(route, base).href)).ok(), route);
  for (const route of ['/designs/no-such-home', '/packages/no-such-package']) assert.equal((await context.request.get(new URL(route, base).href)).status(), 404, route);
  report.interactions.push('Unknown design and package URLs return HTTP 404');
  await page.setViewportSize({ width: 390, height: 844 });
  await open('/');
  const menu = page.getByRole('button', { name: 'Open navigation menu', exact: true });
  await menu.click();
  assert(await page.getByRole('dialog', { name: 'Mobile navigation' }).isVisible());
  assert(await page.locator('main').evaluate(element => element.inert));
  await page.keyboard.press('Escape');
  assert(await menu.evaluate(element => element === document.activeElement));
  await menu.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(100);
  assert.equal(await page.locator('main').evaluate(element => element.inert), false);
  report.interactions.push('Mobile menu, focus restoration, Escape and resize unlock');
  const services = page.getByRole('button', { name: 'Services', exact: true });
  await services.focus(); await services.click();
  assert.equal(await services.getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await services.getAttribute('aria-expanded'), 'false');
  report.interactions.push('Desktop services keyboard menu');
  await services.click();
  await page.locator('#services-menu').getByRole('link', { name: 'Custom Homes', exact: true }).click();
  await page.waitForURL('**/custom-homes');
  await page.locator('main h1').waitFor();
  assert.equal(await services.getAttribute('aria-expanded'), 'false');
  await page.goBack({ waitUntil: 'networkidle' });
  assert.equal(new URL(page.url()).pathname, '/');
  report.interactions.push('Service link client navigation and browser back');
  await open('/designs');
  await page.getByRole('button', { name: /Single storey/i }).click();
  await page.waitForURL(/dwelling_type=single/);
  await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
  await page.waitForURL(url => !url.search);
  report.interactions.push('Catalogue filter and reset');
  await open('/contact');
  assert.equal(await page.locator('.mobile-enquiry-rail').count(), 0, 'Contact uses its form and header CTA without an overlapping floating launcher');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  assert.equal(report.enquiriesIntercepted, 0);
  await page.locator('#contact-name').fill('Browser QA');
  await page.locator('#contact-email').fill('qa@example.invalid');
  await page.locator('#contact-phone').fill('0400000000');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  assert(await page.getByRole('button', { name: 'Sending…', exact: true }).isDisabled());
  await page.getByRole('alert').filter({ hasText: 'Intercepted QA' }).waitFor();
  delivery = 'success';
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await page.getByRole('status').filter({ hasText: 'Thank you' }).waitFor();
  report.interactions.push('Contact validation, pending, error and success (mocked)');
  await page.locator('header').getByRole('button', { name: 'Enquire Now', exact: true }).click();
  const drawer = page.getByRole('dialog', { name: 'Enquire With JUFAJA' });
  assert(await drawer.isVisible());
  delivery = 'error';
  await page.locator('#enquiry-name').fill('Drawer QA');
  await page.locator('#enquiry-email').fill('drawer@example.invalid');
  await page.locator('#enquiry-phone').fill('0400000000');
  await drawer.getByRole('button', { name: 'Submit Free Enquiry', exact: true }).click();
  const countBeforeReopen = report.enquiriesIntercepted;
  await page.keyboard.press('Escape');
  await page.locator('header').getByRole('button', { name: 'Enquire Now', exact: true }).click();
  await drawer.getByRole('alert').filter({ hasText: 'Intercepted QA' }).waitFor();
  assert.equal(report.enquiriesIntercepted, countBeforeReopen, 'Reopening must not submit another request');
  delivery = 'success';
  await drawer.getByRole('button', { name: 'Submit Free Enquiry', exact: true }).click();
  await drawer.getByRole('status').filter({ hasText: 'Enquiry Received' }).waitFor();
  report.interactions.push('Drawer pending close/reopen preserves result; mocked error and success');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('main').evaluate(element => element.inert), false);
  report.interactions.push('Drawer opens and Escape unlocks background');
  await open('/');
  assert.equal(await page.getByRole('button', { name: /Skip intro/ }).isVisible(), false);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => sessionStorage.removeItem('jufaja_intro_viewed'));
  await page.evaluate(() => document.documentElement.classList.remove('jufaja-intro-seen'));
  await page.reload();
  const skip = page.getByRole('button', { name: /Skip intro/ });
  await skip.waitFor({ state: 'visible' });
  await skip.click();
  await skip.waitFor({ state: 'hidden' });
  await page.reload();
  assert.equal(await skip.isVisible(), false);
  report.interactions.push('Reduced motion and once-per-session skippable intro');
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  report.status = 'PASS';
} catch (error) {
  report.status = 'FAIL'; report.failure = error.message; process.exitCode = 1; console.error(error);
} finally {
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close();
  console.log(`Browser report: ${path.join(output, 'report.json')}`);
}
