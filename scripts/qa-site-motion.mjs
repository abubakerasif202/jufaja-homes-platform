/** Sitewide top-of-page QA after retiring the decorative 3D architectural stage. */
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';
import { isPermittedDesignQaBase, installScopedPreviewBypass } from './remote-design-image-verification.mjs';

const argument = (name, fallback) =>
  process.argv.find(value => value.startsWith('--' + name + '='))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
assert(isPermittedDesignQaBase(base, argument('live', 'false'), argument('preview-host', '')), 'Use localhost or explicitly name the approved JUFAJA preview host');
const widths = argument('widths', '320,390,430,768,1024,1440,1920').split(',').map(Number);
assert(widths.every(width => Number.isInteger(width) && width >= 320), 'Invalid viewport widths');
const output = argument('output', path.join(tmpdir(), 'jufaja-site-motion'));
await mkdir(output, { recursive: true });
const designs = JSON.parse(await readFile(new URL('../src/data/designs.json', import.meta.url), 'utf8'));
assert(designs[0]?.slug, 'Need an existing design detail route');
const routes = ['/', '/projects', '/contact', '/designs/' + designs[0].slug];
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
  assert.equal(response?.status(), 200, 'HTTP ' + route);
  await page.locator('main h1').first().waitFor({ state: 'visible' });
  assert.equal(await page.locator('.architectural-stage, .architectural-stage__model').count(), 0, 'No retired 3D stage: ' + route);
  assert.equal(await page.getByRole('button', { name: /^(Pause|Resume) motion$/i }).count(), 0, 'No obsolete 3D motion control');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), 'Horizontal overflow: ' + route + ' at ' + width + 'px');

  if (route === '/') {
    const hero = page.locator('.cv-hero');
    await hero.waitFor({ state: 'visible' });
    const heroBounds = await hero.boundingBox();
    const headerBounds = await page.locator('header').first().boundingBox();
    assert(heroBounds && headerBounds, 'Visible homepage hero and header');
    assert(Math.abs(heroBounds.y - (headerBounds.y + headerBounds.height)) <= 24, 'Homepage image should begin directly below the header at ' + width + 'px');
  }
}

try {
  for (const mode of ['normal', 'reduced', 'no-js']) {
    const current = await session({
      reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
      javaScriptEnabled: mode !== 'no-js',
    });
    for (const width of widths) {
      for (const route of routes) {
        await load(current.page, route, width);
        if (mode === 'normal') {
          const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
          await current.page.screenshot({ path: path.join(output, 'page-' + name + '-' + width + '.png') });
        }
        results.push({ mode, route, width, passed: true });
      }
      console.log('PASS ' + mode + ' ' + width + 'px: four routes, 3D strip removed, hero position and no overflow');
    }
    await current.context.close();
  }
  assert.deepEqual(errors, [], 'Browser console/page errors');
  await writeFile(path.join(output, 'site-motion-report.json'), JSON.stringify({ base: base.origin, results, errors }, null, 2));
  console.log('PASS ' + results.length + ' sitewide layout cases; evidence: ' + output);
} finally {
  await browser.close();
}
