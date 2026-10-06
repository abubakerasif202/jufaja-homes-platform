/**
 * JavaScript-disabled browser test. Loads every public route with javaScriptEnabled:false and checks the page is
 * readable: visible heading, navigation, call to action, footer, no loading skeleton, no blocking overlay.
 *   node scripts/qa-nojs.mjs [--base-url=http://127.0.0.1:3010] [--live=true]
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
const productionHosts = ['jufaja-homes-platform.vercel.app', 'www.jufajaconstructions.com.au', 'jufajaconstructions.com.au'];
assert(local || (argument('live', 'false') === 'true' && base.protocol === 'https:' && productionHosts.includes(base.hostname)), 'Use localhost or an approved HTTPS production host with --live=true');

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
const routes = [...await discover(app), ...designs.map(design => `/designs/${design.slug}`)];
const viewports = [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }];

const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });
const failures = [];
let checked = 0;

for (const viewport of viewports) {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  for (const route of routes) {
    const problems = [];
    const response = await page.goto(new URL(route, base).href, { waitUntil: 'load', timeout: 30000 }).catch(error => ({ error }));
    if (!response || response.error || response.status() !== 200) { failures.push({ route, viewport: viewport.name, problems: [`navigation failed: ${response?.error?.message ?? response?.status()}`] }); continue; }
    checked += 1;

    const heading = page.locator('main h1').first();
    if (!(await heading.isVisible())) problems.push('main <h1> not visible');
    else if ((await heading.innerText()).trim().length < 8) problems.push('main <h1> has no readable text');
    const opacity = await heading.evaluate(node => { let value = 1; for (let el = node; el; el = el.parentElement) value *= Number(getComputedStyle(el).opacity); return value; }).catch(() => 0);
    if (opacity < 0.99) problems.push(`<h1> effective opacity ${opacity}`);

    if (await page.locator('[aria-busy="true"]').count()) problems.push('loading skeleton (aria-busy) present');
    const overlay = page.locator('.jufaja-intro');
    if (await overlay.count() && await overlay.first().isVisible()) problems.push('intro overlay blocks the page without JavaScript');
    const bodyText = (await page.locator('main').innerText()).trim();
    if (bodyText.split(/\s+/).length < 40) problems.push(`main has only ${bodyText.split(/\s+/).length} readable words`);

    // Footer links are the one navigation surface visible at every width; the header bar is desktop-only.
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();
    if (!(await footer.isVisible())) problems.push('footer not visible');
    if (!(await footer.locator('a[href]').first().isVisible())) problems.push('footer links not visible');
    if (viewport.name === 'desktop') {
      for (const href of ['/designs', '/contact']) {
        if (!(await page.locator(`header a[href="${href}"]`).first().isVisible())) problems.push(`header link ${href} not visible`);
      }
    } else if (!(await footer.locator('a[href="/contact"], a[href="/designs"]').first().isVisible())) problems.push('no visible /contact or /designs link in footer on mobile');

    if (route !== '/privacy') {
      const cta = page.locator('main a[href^="/contact"], main a[href^="/designs"], main a[href^="/custom-homes"], main a[href^="/packages"], main a[href^="/knockdown-rebuild"], main a[href^="/display-homes"], main a[href^="/inclusions"], main a[href^="/projects"], main button[type="submit"]');
      let visibleCta = false;
      for (let i = 0; i < Math.min(await cta.count(), 40) && !visibleCta; i += 1) visibleCta = await cta.nth(i).isVisible();
      if (!visibleCta) problems.push('no visible call to action in main');
    }

    // Images: native lazy loading works without JS; every content image needs alt text and must decode once scrolled into view.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 700) { await page.mouse.wheel(0, 700); await page.waitForTimeout(40); }
    await page.waitForLoadState('load');
    const images = await page.evaluate(() => [...document.images].filter(image => image.getClientRects().length).map(image => ({ src: image.currentSrc || image.src, alt: image.getAttribute('alt'), ok: image.complete && image.naturalWidth > 0 })));
    const missingAlt = images.filter(image => image.alt === null);
    const broken = images.filter(image => !image.ok);
    if (missingAlt.length) problems.push(`${missingAlt.length} image(s) without alt attribute: ${missingAlt[0].src.slice(-60)}`);
    if (broken.length) problems.push(`${broken.length}/${images.length} image(s) did not load: ${broken[0].src.slice(-60)}`);
    if (problems.length) failures.push({ route, viewport: viewport.name, problems });
  }
  await context.close();
}
await browser.close();
console.log(JSON.stringify({ base: base.origin, routes: routes.length, pageChecks: checked, failed: failures.length }));
for (const failure of failures.slice(0, 20)) console.log(`FAIL ${failure.viewport} ${failure.route}\n  - ${failure.problems.join('\n  - ')}`);
if (failures.length) process.exit(1);
