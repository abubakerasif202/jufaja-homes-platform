/**
 * Repeatable local designer QA. Requires Playwright + Chromium and a running local site.
 * All enquiry requests are intercepted; this runner never sends a customer enquiry.
 * Usage: node scripts/qa-browser.mjs [--base-url=http://127.0.0.1:3000] [--browser-path=...]
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3000'));
assert(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'QA must target a local server.');
assert(base.protocol === 'http:', 'Use the local HTTP server.');
const output = path.join(tmpdir(), 'jufaja-designer-qa');
await mkdir(output, { recursive: true });
const designs = JSON.parse(await readFile(new URL('../src/data/designs.json', import.meta.url), 'utf8'));
const details = ['single', 'double', 'duplex'].map(type => {
  const design = designs.find(item => item.dwellingType === type);
  assert(design, `No ${type} listing exists`);
  return `/designs/${design.slug}`;
});
const routes = ['/', '/designs', ...details, '/projects', '/about-us', '/custom-homes', '/knockdown-rebuild', '/packages', '/display-homes', '/inclusions', '/contact', '/privacy'];
const viewports = [
  { width: 1920, height: 1080 }, { width: 1440, height: 900 },
  { width: 1280, height: 720 }, { width: 1280, height: 600 },
  { width: 1024, height: 768 }, { width: 768, height: 1024 },
  { width: 430, height: 932 }, { width: 390, height: 844 },
  { width: 375, height: 812 }, { width: 320, height: 720 },
  { width: 360, height: 640 }, { width: 320, height: 568 },
  { width: 844, height: 390 }, { width: 640, height: 360 },
];
const report = { startedAt: new Date().toISOString(), base: base.origin, output, matrix: [], interactions: [], errors: [], warnings: [], enquiryRequestsIntercepted: 0 };
let browser;
let failure;
try {
  const { chromium } = require('playwright');
  const executablePath = argument('browser-path', undefined);
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const context = await browser.newContext();
  await context.route('**/api/enquiry', async route => {
    report.enquiryRequestsIntercepted++;
    await new Promise(resolve => setTimeout(resolve, 900));
    await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ success: false, error: 'Browser QA interception: no enquiry was sent.' }) });
  });
  const page = await context.newPage();
  page.on('requestfailed', request => {
    if (!request.failure()?.errorText.includes('ERR_ABORTED')) report.errors.push({ url: request.url(), message: request.failure()?.errorText ?? 'Request failed' });
  });
  page.on('response', response => {
    if (response.status() >= 400 && !new URL(response.url()).pathname.endsWith('/api/enquiry')) report.errors.push({ url: response.url(), message: `HTTP ${response.status()}` });
  });
  page.on('pageerror', error => report.errors.push({ url: page.url(), message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error') report.errors.push({ url: page.url(), resource: message.location().url, message: message.text() });
    if (message.type() === 'warning') report.warnings.push({ url: page.url(), message: message.text() });
  });
  async function open(route) {
    const response = await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
    assert(response?.ok(), `${route} returned ${response?.status()}`);
    await page.locator('main h1').first().waitFor({ state: 'attached' });
    await page.evaluate(() => document.fonts.ready);
    const intro = page.getByRole('button', { name: /Skip intro/ });
    if (await intro.isVisible()) await intro.click();
    const pause = page.getByRole('button', { name: 'Pause slideshow', exact: true });
    if (await pause.isVisible()) await pause.click();
    await page.waitForTimeout(1400);
  }
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await open(route);
      // Traverse the real page so lazy media and scroll entrances are exercised.
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let top = 0; top < height; top += Math.max(300, Math.round(viewport.height * .75))) {
        await page.evaluate(y => window.scrollTo(0, y), top);
        await page.waitForTimeout(100);
      }
      await page.waitForTimeout(1400);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        brokenImages: [...document.images].filter(image => image.getClientRects().length && getComputedStyle(image).visibility !== 'hidden' && image.complete && !image.naturalWidth).map(image => image.currentSrc),
        errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog]')),
        h1: document.querySelector('main h1')?.textContent,
      }));
      const name = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '--')}-${viewport.width}x${viewport.height}.png`;
      await page.screenshot({ path: path.join(output, name), fullPage: true });
      report.matrix.push({ route, ...viewport, ...result, screenshot: name });
      assert(result.overflow <= 1, `${route} overflows ${result.overflow}px at ${viewport.width}`);
      assert(!result.errorOverlay, `${route} has a framework error overlay`);
      assert.equal(result.brokenImages.length, 0, `${route} has broken imagery`);
      if (route === '/' && viewport.width <= 767) {
        const rail = await page.locator('.featured-rail').evaluate(element => ({
          width: element.clientWidth,
          scrollWidth: element.scrollWidth,
          cards: [...element.children].map(card => card.getBoundingClientRect().width),
        }));
        assert(rail.scrollWidth > rail.width, 'Mobile catalogue must scroll, not fit all six cards');
        assert(rail.cards.every(width => width >= 240), 'Mobile catalogue cards must remain readable');
      }
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await open('/');
  const intents = page.locator('.intent-tile');
  assert.equal(await intents.count(), 6, 'Expected all six intent links');
  for (const link of await intents.all()) assert((await link.getAttribute('href'))?.startsWith('/'));
  report.interactions.push('All six service intent links');
  const rail = page.getByRole('region', { name: 'Featured home design collection' });
  await rail.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Next home designs', exact: true }).click();
  await page.waitForTimeout(800);
  assert((await rail.evaluate(element => element.scrollLeft)) > 0);
  report.interactions.push('Catalogue rail controls');
  const before = await page.locator('.hs-slide.is-active').getAttribute('aria-label');
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  assert.notEqual(await page.locator('.hs-slide.is-active').getAttribute('aria-label'), before);
  report.interactions.push('Hero manual slide control');
  await page.getByRole('button', { name: 'Play slideshow', exact: true }).click();
  await page.mouse.move(20, 20); // Header is outside the carousel: release hover pause.
  const autoplayBefore = await page.locator('.hs-slide.is-active').getAttribute('aria-label');
  await page.waitForTimeout(7500);
  assert.notEqual(await page.locator('.hs-slide.is-active').getAttribute('aria-label'), autoplayBefore);
  await page.getByRole('button', { name: 'Pause slideshow', exact: true }).click();
  report.interactions.push('Normal-motion autoplay / pause');

  await page.setViewportSize({ width: 390, height: 844 });
  await open('/');
  const toggle = page.getByRole('button', { name: 'Open navigation menu', exact: true });
  await toggle.click();
  assert(await page.getByRole('dialog', { name: 'Mobile navigation' }).isVisible());
  assert(await page.locator('body > main').evaluate(element => element.inert));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  assert(await toggle.evaluate(element => element === document.activeElement));
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(600);
  assert.equal(await page.locator('body > main').evaluate(element => element.inert), false);
  report.interactions.push('Mobile menu / Escape / resize unlock');

  await open('/designs');
  await page.getByRole('button', { name: /Single storey/i }).click();
  await page.waitForURL(/dwelling_type=single/);
  await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
  await page.waitForURL(url => !url.search);
  report.interactions.push('Catalogue filtering / reset');
  for (const route of details) {
    await open(route);
    const controls = page.getByRole('button', { name: /Show illustrative .* facade/ });
    if (await controls.count() > 1) {
      await controls.nth(1).click();
      assert.equal(await controls.nth(1).getAttribute('aria-pressed'), 'true');
    }
  }
  report.interactions.push('Single / double / duplex facade controls');

  await open('/contact');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  assert.equal(report.enquiryRequestsIntercepted, 0, 'An invalid form attempted a request');
  await page.locator('#contact-name').fill('Browser QA');
  await page.locator('#contact-email').fill('browser-qa@example.invalid');
  await page.locator('#contact-phone').fill('0400000000');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  assert(await page.getByRole('button', { name: 'Sending…', exact: true }).isDisabled());
  await page.getByRole('alert').filter({ hasText: 'Browser QA interception' }).waitFor();
  report.interactions.push('Form validation / loading / intercepted error; no delivery');
  await page.locator('header').getByRole('button', { name: 'Enquire Now', exact: true }).click();
  assert(await page.getByRole('dialog', { name: 'Enquire With JUFAJA' }).isVisible());
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('body > main').evaluate(element => element.inert), false);
  report.interactions.push('Enquiry drawer / Escape / background unlock');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open('/');
  const reducedBefore = await page.locator('.hs-slide.is-active').getAttribute('aria-label');
  await page.waitForTimeout(6500);
  assert.equal(await page.locator('.hs-slide.is-active').getAttribute('aria-label'), reducedBefore);
  assert.equal(await page.getByRole('button', { name: /Skip intro/ }).isVisible(), false);
  report.interactions.push('Reduced-motion intro / no autoplay');
  assert.equal(report.errors.filter(item => !(item.resource?.includes('/api/enquiry') && item.message.includes('503'))).length, 0, 'Unexpected runtime/console errors; inspect report');
  console.log(`Browser matrix and interactions passed. Review the screenshots as a designer: ${output}`);
} catch (error) {
  failure = error;
  report.failure = error.message;
  console.error(error.message);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  report.status = failure ? 'FAILED_OR_BLOCKED' : 'AUTOMATION_PASSED_VISUAL_REVIEW_REQUIRED';
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  await browser?.close();
  console.log(`QA report: ${path.join(output, 'report.json')}`);
}
