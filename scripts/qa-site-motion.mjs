/** Sitewide motion QA: observable animation, pause, reduced motion and no-JS. */
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';
import { isPermittedDesignQaBase, installScopedPreviewBypass } from './remote-design-image-verification.mjs';

const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
assert(isPermittedDesignQaBase(base, argument('live', 'false'), argument('preview-host', '')), 'Use localhost or explicitly name the approved JUFAJA preview host');
const widths = argument('widths', '320,390,430,768,1024,1440,1920').split(',').map(Number);
assert(widths.every(width => Number.isInteger(width) && width >= 320), 'Invalid viewport widths');
const output = argument('output', path.join(tmpdir(), 'jufaja-site-motion'));
await mkdir(output, { recursive: true });
const designs = JSON.parse(await readFile(new URL('../src/data/designs.json', import.meta.url), 'utf8'));
assert(designs[0]?.slug, 'Need an existing design detail route');
const routes = ['/', '/projects', '/contact', `/designs/${designs[0].slug}`];
const errors = [];
const results = [];
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });

async function session(options) {
  const context = await browser.newContext({
    ...options,
    ...(process.env.JUFAJA_QA_STORAGE_STATE ? { storageState: process.env.JUFAJA_QA_STORAGE_STATE } : {}),
  });
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    await installScopedPreviewBypass(context, base.origin, process.env.VERCEL_AUTOMATION_BYPASS_SECRET);
  }
  await context.route('**/api/enquiry', route => route.fulfill({
    status: 503, contentType: 'application/json', body: '{"success":false}',
  }));
  const page = await context.newPage();
  page.on('pageerror', error => errors.push({ url: page.url(), message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error') errors.push({ url: page.url(), message: message.text() });
  });
  return { context, page };
}

async function load(page, route, width) {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
  const response = await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' });
  assert.equal(response?.status(), 200, `HTTP ${route}`);
  await page.locator('main h1').first().waitFor({ state: 'visible' });
  const stage = page.locator('.architectural-stage');
  assert.equal(await stage.count(), 1, `One stage: ${route}`);
  await stage.waitFor({ state: 'visible' });
  assert(await stage.isVisible(), `Stage must remain visible: ${route} at ${width}px`);
  const bounds = await stage.boundingBox();
  assert(bounds && bounds.height >= 100 && bounds.width <= width, 'Visible, contained architectural scene');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `Overflow: ${route} at ${width}px`);
  assert(await page.locator('main h1').first().isVisible(), 'Page heading must remain visible');
  return stage;
}

const transform = page => page.locator('.architectural-stage__model').first().evaluate(element => getComputedStyle(element).transform);
const wait = page => page.waitForTimeout(350);

try {
  const normal = await session({ reducedMotion: 'no-preference' });
  for (const width of widths) {
    for (const route of routes) {
      const stage = await load(normal.page, route, width);
      const pause = stage.getByRole('button', { name: 'Pause motion', exact: true });
      await pause.waitFor({ state: 'visible' });
      const target = await pause.boundingBox();
      assert(target && target.width >= 44 && target.height >= 44, 'Motion control needs a 44px touch target');
      const initial = await transform(normal.page);
      await wait(normal.page);
      assert.notEqual(await transform(normal.page), initial, 'Architectural forms must actually move');
      await pause.focus();
      await normal.page.keyboard.press('Enter');
      const resume = stage.getByRole('button', { name: 'Resume motion', exact: true });
      assert.equal(await resume.getAttribute('aria-pressed'), 'true');
      // Chromium may finish one compositor frame after the paused style is applied.
      await normal.page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      assert.equal(await stage.getAttribute('data-moving'), 'false');
      assert.equal(await stage.locator('.architectural-stage__model').first().evaluate(element => getComputedStyle(element).animationPlayState), 'paused');
      const frozen = await transform(normal.page);
      await wait(normal.page);
      assert.equal(await transform(normal.page), frozen, 'Pause must freeze motion');
      await resume.click();
      assert.equal(await stage.getByRole('button').getAttribute('aria-pressed'), 'false');
      const resumed = await transform(normal.page);
      await wait(normal.page);
      assert.notEqual(await transform(normal.page), resumed, 'Resume must restart motion');
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await stage.screenshot({ path: path.join(output, `stage-${name}-${width}.png`) });
      await normal.page.screenshot({ path: path.join(output, `page-${name}-${width}.png`) });
      results.push({ mode: 'normal', route, width, passed: true });
    }
    console.log(`PASS normal ${width}px: four routes, motion, keyboard pause/resume, touch target and overflow`);
  }
  await normal.context.close();

  for (const mode of ['reduced', 'no-js']) {
    const current = await session({ reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference', javaScriptEnabled: mode !== 'no-js' });
    for (const width of widths) {
      for (const route of routes) {
        const stage = await load(current.page, route, width);
        assert.equal(await stage.getByRole('button').count(), 0, 'No visible motion controls for static presentation');
        const initial = await transform(current.page);
        await wait(current.page);
        assert.equal(await transform(current.page), initial, `Static architecture: ${mode}`);
        assert(await stage.locator('.architectural-stage__model').first().evaluate(element => {
          const style = getComputedStyle(element);
          return style.animationName === 'none' || style.animationPlayState === 'paused';
        }), 'Static presentation must have no active animation');
        results.push({ mode, route, width, passed: true });
      }
      console.log(`PASS ${mode} ${width}px: four routes, static visible stage and accessible heading`);
    }
    await current.context.close();
  }
  assert.deepEqual(errors, [], 'Browser console/page errors');
  await writeFile(path.join(output, 'site-motion-report.json'), JSON.stringify({ base: base.origin, results, errors }, null, 2));
  console.log(`PASS ${results.length} sitewide motion cases; evidence: ${output}`);
} finally {
  await browser.close();
}
