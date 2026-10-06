/** Opening-intro QA under prefers-reduced-motion: no-preference. Never sends an enquiry. */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
assert(local || (argument('live', 'false') === 'true' && base.protocol === 'https:'), 'Use localhost or pass --live=true for an HTTPS host');
const { chromium } = require('playwright');
const viewports = [
  { name: 'mobile', width: 390, height: 844, mobile: true },
  { name: 'mobile-430', width: 430, height: 932, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];
const failures = [];
const check = (label, condition, detail = '') => { if (!condition) failures.push(`${label} ${detail}`.trim()); };
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });
const state = page => page.evaluate(() => ({
  introPresent: Boolean(document.querySelector('.jufaja-intro')),
  introOpacity: document.querySelector('.jufaja-intro') ? getComputedStyle(document.querySelector('.jufaja-intro')).visibility : 'none',
  bodyOverflow: getComputedStyle(document.body).overflowY,
  seen: document.documentElement.classList.contains('jufaja-intro-seen'),
  stored: sessionStorage.getItem('jufaja_intro_viewed'),
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
}));
try {
  for (const vp of viewports) {
    const context = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: vp.width, height: vp.height }, isMobile: Boolean(vp.mobile), hasTouch: Boolean(vp.mobile), deviceScaleFactor: vp.mobile ? 2 : 1 });
    await context.addInitScript(() => {
      window.__qa = { cls: 0, rafScheduled: 0 };
      new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__qa.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
      const raf = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = callback => { window.__qa.rafScheduled += 1; return raf(callback); };
    });
    const page = await context.newPage();
    const problems = [];
    page.on('console', message => { if (['error', 'warning'].includes(message.type())) problems.push(`${message.type()}: ${message.text()}`); });
    page.on('pageerror', error => problems.push(`pageerror: ${error.message}`));
    // Navigation legitimately cancels in-flight prefetches and lazy images.
    page.on('requestfailed', request => { if (request.failure()?.errorText.includes('ERR_ABORTED')) return; problems.push(`requestfailed: ${request.url()} ${request.failure()?.errorText}`); });
    page.on('response', response => { if (response.status() >= 400) problems.push(`${response.status()}: ${response.url()}`); });
    const tag = `[${vp.name} ${vp.width}x${vp.height}]`;

    await page.goto(base.href, { waitUntil: 'commit' });
    await page.waitForSelector('.jufaja-intro', { state: 'attached', timeout: 5000 });
    const early = await state(page);
    check(`${tag} intro plays in normal motion`, early.introPresent && !early.seen);
    check(`${tag} scroll locked while intro plays`, early.bodyOverflow === 'hidden', early.bodyOverflow);
    const dialog = page.getByRole('dialog', { name: /logo introduction/i });
    check(`${tag} intro exposes a skip control`, await page.getByRole('button', { name: /skip intro/i }).isVisible());

    // Resize/orientation mid-intro must not strand the overlay.
    await page.setViewportSize({ width: vp.height, height: vp.width });
    await page.waitForTimeout(250);
    check(`${tag} no overflow after rotation`, (await state(page)).scrollWidth <= vp.height + 1);
    await page.setViewportSize({ width: vp.width, height: vp.height });

    await dialog.waitFor({ state: 'detached', timeout: 7000 }).catch(() => failures.push(`${tag} intro never completed (deadlock)`));
    const after = await state(page);
    check(`${tag} scroll lock released`, after.bodyOverflow !== 'hidden', after.bodyOverflow);
    check(`${tag} intro marked seen and stored`, after.seen && after.stored === 'true');
    check(`${tag} no horizontal overflow`, after.scrollWidth <= after.innerWidth + 1, `${after.scrollWidth}>${after.innerWidth}`);
    await page.getByRole('heading', { level: 1 }).first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => failures.push(`${tag} hero heading hidden after intro`));
    const cta = page.getByRole('link', { name: /explore home designs/i }).first();
    check(`${tag} hero CTA visible and unobstructed`, await cta.isVisible() && await cta.evaluate(node => { const rect = node.getBoundingClientRect(); const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2); return Boolean(hit && node.contains(hit)); }));
    const nav = page.getByRole('navigation').first();
    check(`${tag} navigation present`, await nav.count() > 0);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(250);
    check(`${tag} page scrolls after intro`, await page.evaluate(() => window.scrollY) > 100);
    await page.evaluate(() => window.scrollTo(0, 0));

    // Idle workload: a finished intro must not leave a runaway rAF loop.
    const rafBefore = await page.evaluate(() => window.__qa.rafScheduled);
    await page.waitForTimeout(2000);
    const rafIdle = (await page.evaluate(() => window.__qa.rafScheduled)) - rafBefore;
    check(`${tag} idle requestAnimationFrame workload`, rafIdle < 240, `${rafIdle} callbacks in 2s`);
    const cls = await page.evaluate(() => window.__qa.cls);
    check(`${tag} layout shift`, cls < 0.1, cls.toFixed(3));

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const replay = await state(page);
    check(`${tag} intro does not replay in same session`, !replay.introPresent || replay.introOpacity === 'hidden' || replay.seen);
    check(`${tag} body not scroll-locked on repeat visit`, replay.bodyOverflow !== 'hidden');

    // Skip control and Escape key in a fresh session.
    for (const how of ['skip', 'escape']) {
      const fresh = await context.newPage();
      await fresh.goto(base.href, { waitUntil: 'commit' });
      await fresh.evaluate(() => sessionStorage.clear());
      await fresh.reload({ waitUntil: 'commit' });
      await fresh.getByRole('button', { name: /skip intro/i }).waitFor({ state: 'visible', timeout: 5000 });
      if (how === 'skip') await fresh.getByRole('button', { name: /skip intro/i }).click(); else await fresh.keyboard.press('Escape');
      await fresh.getByRole('dialog', { name: /logo introduction/i }).waitFor({ state: 'detached', timeout: 3000 }).catch(() => failures.push(`${tag} ${how} did not dismiss intro`));
      check(`${tag} scroll released after ${how}`, (await state(fresh)).bodyOverflow !== 'hidden');
      await fresh.close();
    }
    const real = problems.filter(text => !/favicon/.test(text));
    check(`${tag} console/network clean`, real.length === 0, real.slice(0, 3).join(' | '));
    await context.close();
    console.log(`${failures.some(f => f.startsWith(tag)) ? 'FAIL' : 'ok  '} ${tag} cls=${cls.toFixed(3)} idleRaf=${rafIdle}`);
  }
  // The site has no WebGL dependency; prove it stays fully usable with GPU/3D APIs off and with JS off.
  const noGpu = await chromium.launch({ headless: true, channel: argument('channel', 'msedge'), args: ['--disable-3d-apis', '--disable-gpu', '--disable-webgl'] });
  try {
    for (const scenario of [{ name: 'webgl-disabled', js: true }, { name: 'javascript-disabled', js: false }]) {
      const context = await noGpu.newContext({ reducedMotion: 'no-preference', viewport: { width: 390, height: 844 }, javaScriptEnabled: scenario.js });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.goto(base.href, { waitUntil: 'domcontentloaded' });
      const tag = `[${scenario.name}]`;
      if (scenario.js) {
        const webgl = await page.evaluate(() => { const canvas = document.createElement('canvas'); return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')); });
        check(`${tag} WebGL really unavailable`, webgl === false);
        await page.getByRole('dialog', { name: /logo introduction/i }).waitFor({ state: 'detached', timeout: 7000 }).catch(() => failures.push(`${tag} intro stuck`));
      }
      await page.getByRole('heading', { level: 1 }).first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => failures.push(`${tag} hero heading not visible`));
      check(`${tag} CTA visible`, await page.getByRole('link', { name: /explore home designs/i }).first().isVisible());
      check(`${tag} not scroll-locked`, (await state(page)).bodyOverflow !== 'hidden');
      check(`${tag} no console errors`, errors.length === 0, errors.slice(0, 2).join(' | '));
      console.log(`${failures.some(f => f.startsWith(tag)) ? 'FAIL' : 'ok  '} ${tag}`);
      await context.close();
    }
  } finally {
    await noGpu.close();
  }
} finally {
  await browser.close();
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('Normal-motion intro checks passed.');
