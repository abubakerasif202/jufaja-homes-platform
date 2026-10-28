/**
 * Hero slideshow and moving-gallery browser test (production server).
 *   node scripts/qa-slideshow.mjs [--base-url=http://127.0.0.1:3010] [--live=true] [--loops=2]
 * Covers: autoplay cadence over complete loops, controls, keyboard, swipe, pause/play, reduced motion, console and
 * network errors, horizontal overflow at 320-1920px, and the gallery marquee (seamless width, motion, pause, reduced motion).
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
const productionHosts = ['jufaja-homes-platform.vercel.app', 'www.jufajaconstructions.com.au', 'jufajaconstructions.com.au'];
assert(local || (argument('live', 'false') === 'true' && base.protocol === 'https:' && productionHosts.includes(base.hostname)), 'Use localhost or an approved HTTPS production host with --live=true');
const loops = Number(argument('loops', '2'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: Boolean(ok), detail }); console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`); };

const SLIDES = 6;
const SLIDE_MS = 6000;
const activeIndex = page => page.evaluate(() => [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active')));
const open = async (options = {}) => {
  const context = await browser.newContext({ viewport: options.touch ? { width: 390, height: 844 } : { width: 1440, height: 900 }, hasTouch: options.touch, reducedMotion: options.reducedMotion ? 'reduce' : 'no-preference' });
  await context.addInitScript(() => {
    sessionStorage.setItem('jufaja_intro_viewed', 'true');
    window.showcaseCls = 0;
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.showcaseCls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  const page = await context.newPage();
  const problems = [];
  page.on('console', message => { if (['error', 'warning'].includes(message.type())) problems.push(`console ${message.type()}: ${message.text().slice(0, 160)}`); });
  page.on('pageerror', error => problems.push(`pageerror: ${error.message}`));
  // Next aborts in-flight route prefetches (?_rsc=) when a context closes or a page navigates; that is benign.
  page.on('requestfailed', request => { if (!request.url().includes('_rsc=')) problems.push(`requestfailed: ${request.url().slice(-80)}`); });
  page.on('response', response => { if (response.status() >= 400) problems.push(`HTTP ${response.status()} ${response.url().slice(-80)}`); });
  await page.goto(new URL('/', base).href, { waitUntil: 'networkidle' });
  return { context, page, problems };
};

// 1. Autoplay: every original slide and destination appears on a six-second cadence.
{
  const { context, page, problems } = await open();
  await page.locator('.cv-hero[data-playing="true"]').waitFor({ timeout: 10000 });
  check('only the active and adjacent images load initially', (await page.locator('.cv-slide img').count()) <= 3);
  const decoded = new Set();
  const seen = [await activeIndex(page)];
  decoded.add(seen[0]);
  const stamps = [Date.now()];
  const target = SLIDES * loops + 1;
  while (seen.length < target) {
    const last = seen.at(-1);
    await page.waitForFunction(index => [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active')) !== index, last, { timeout: SLIDE_MS * 2 });
    seen.push(await activeIndex(page));
    stamps.push(Date.now());
    await page.waitForFunction(() => { const image = document.querySelector('.cv-slide.is-active img'); return image?.complete && image.naturalWidth > 0; }, undefined, { timeout: 5000 });
    decoded.add(seen.at(-1));
  }
  // The first interval starts mid-slide when sampling begins, so it is measured from the second change.
  const gaps = stamps.slice(1).map((time, i) => time - stamps[i]).slice(1);
  check(`autoplay visits slides in order for ${loops} full loops`, seen.every((value, i) => value === i % SLIDES), seen.join(','));
  check('autoplay advances about every 6 seconds', gaps.every(gap => gap > 5300 && gap < 7200), `gaps ${gaps.join(',')}ms`);
  check('all six active images decoded through the loop', decoded.size === SLIDES);
  check('carousel has no headline or shade overlay', await page.locator('.cv-hero__stage h1, .cv-hero__stage h2, .cv-hero__shade').count() === 0);
  check('autoplay does not introduce layout shift', await page.evaluate(() => window.showcaseCls) < 0.01);
  check('autoplay run had no console, request or HTTP errors', problems.length === 0, problems.join(' | '));
  await context.close();
}

// 2. Controls, keyboard, pause/play.
{
  const { context, page } = await open();
  await page.locator('.cv-hero[data-playing="true"]').waitFor();
  const pause = page.getByRole('button', { name: 'Pause slideshow' });
  await pause.click();
  const frozen = await activeIndex(page);
  await page.waitForTimeout(SLIDE_MS + 1500);
  check('pause button stops autoplay', (await activeIndex(page)) === frozen);
  await page.getByRole('button', { name: 'Play slideshow' }).click();
  await page.waitForFunction(index => [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active')) !== index, frozen, { timeout: SLIDE_MS * 2 });
  check('play button resumes autoplay', true);
  await page.getByRole('button', { name: 'Next slide' }).click();
  const afterNext = await activeIndex(page);
  await page.getByRole('button', { name: 'Previous slide' }).click();
  check('next and previous buttons move one slide', (await activeIndex(page)) === (afterNext + SLIDES - 1) % SLIDES);
  await page.getByRole('button', { name: /Go to slide 4/ }).click();
  check('progress control jumps to a slide', (await activeIndex(page)) === 3);
  await page.getByRole('button', { name: 'Next slide' }).focus();
  await page.keyboard.press('ArrowRight');
  check('arrow keys navigate', (await activeIndex(page)) === 4);
  const hidden = await page.evaluate(() => {
    const index = [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active'));
    return [...document.querySelectorAll('.cv-slide:not(.is-active)')].every(slide => slide.getAttribute('aria-hidden') === 'true') &&
      [...document.querySelectorAll('.cv-hero__cta')].every(link => Number(link.dataset.slideIndex) === index || (link.hidden && link.tabIndex === -1));
  });
  check('inactive slides and their destinations are inaccessible', hidden);
  const expectedLinks = ['/designs', '/inspiration#luxury-bathrooms', '/knockdown-rebuild', '/designs?dwelling_type=duplex', '/custom-homes', '/inspiration#modern-kitchens'];
  const heights = [];
  for (let i = 0; i < SLIDES; i += 1) {
    await page.getByRole('button', { name: new RegExp(`Go to slide ${i + 1}:`) }).click();
    check(`slide ${i + 1} retains its destination`, await page.locator('.cv-hero__cta:visible').getAttribute('href') === expectedLinks[i]);
    heights.push(await page.locator('.editorial-hero').evaluate(node => node.getBoundingClientRect().height));
  }
  check('slide changes reserve a stable hero height', Math.max(...heights) - Math.min(...heights) < 1, heights.join(','));
  check('exactly one h1 on the home page', (await page.locator('h1').count()) === 1);
  await context.close();
}

// 3. Touch swipe.
{
  const { context, page } = await open({ touch: true });
  await page.locator('.cv-hero[data-playing="true"]').waitFor();
  await page.getByRole('button', { name: 'Pause slideshow' }).click();
  const swipe = (from, to) => page.evaluate(([a, b]) => {
    const stage = document.querySelector('.cv-hero__stage');
    const fire = (type, x) => stage.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerType: 'touch', clientX: x, clientY: 300 }));
    fire('pointerdown', a); fire('pointerup', b);
  }, [from, to]);
  const start = await activeIndex(page);
  await swipe(340, 80);
  check('swipe left shows the next slide', (await activeIndex(page)) === (start + 1) % SLIDES);
  await swipe(80, 340);
  check('swipe right shows the previous slide', (await activeIndex(page)) === start);
  await swipe(180, 210);
  check('a short drag does not change slides', (await activeIndex(page)) === start);
  await page.locator('.cv-hero__stage').evaluate(stage => {
    stage.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch', clientX: 300, clientY: 100 }));
    stage.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch', clientX: 230, clientY: 450 }));
  });
  check('vertical page scrolling does not trigger a slide', (await activeIndex(page)) === start);
  await page.locator('.cv-hero__stage').evaluate(stage => {
    const event = (type, x) => new PointerEvent(type, { bubbles: true, pointerType: 'touch', clientX: x, clientY: 100 });
    stage.dispatchEvent(event('pointerdown', 340)); stage.dispatchEvent(event('pointercancel', 340)); stage.dispatchEvent(event('pointerup', 80));
  });
  check('a cancelled swipe does not trigger a slide', (await activeIndex(page)) === start);
  await context.close();
}

// 4. Reduced motion: no autoplay, no Ken Burns, manual controls and play still work.
{
  const { context, page } = await open({ reducedMotion: true });
  const start = await activeIndex(page);
  await page.waitForTimeout(SLIDE_MS + 2000);
  check('reduced motion does not autoplay', (await activeIndex(page)) === start);
  const animation = await page.evaluate(() => getComputedStyle(document.querySelector('.cv-slide.is-active .cv-hero__image')).animationName);
  check('reduced motion disables the Ken Burns zoom', animation === 'none', animation);
  check('reduced motion offers a Play control', await page.getByRole('button', { name: 'Play slideshow' }).isVisible());
  await page.getByRole('button', { name: 'Next slide' }).click();
  check('manual navigation works under reduced motion', (await activeIndex(page)) === (start + 1) % SLIDES);
  const manual = await activeIndex(page);
  await page.getByRole('button', { name: 'Play slideshow' }).click();
  await page.waitForFunction(index => [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active')) !== index, manual, { timeout: SLIDE_MS * 2 });
  check('reduced-motion visitors can explicitly start the showcase', true);
  await context.close();
}

// 5. Hover and keyboard-focus interruptions preserve visitor control.
{
  const { context, page } = await open();
  await page.locator('.cv-hero[data-playing="true"]').waitFor();
  await page.locator('.cv-hero__stage').hover();
  const held = await activeIndex(page);
  await page.waitForTimeout(SLIDE_MS + 300);
  check('hovering the photography pauses rotation', await activeIndex(page) === held);
  await page.mouse.move(1400, 850);
  await page.locator('.editorial-hero__content a').first().focus();
  await page.keyboard.press('Shift+Tab');
  const focused = await activeIndex(page);
  await page.waitForTimeout(SLIDE_MS + 300);
  check('keyboard focus entering the carousel pauses rotation', await activeIndex(page) === focused);
  check('keyboard interruption exposes a Play control', await page.getByRole('button', { name: 'Play slideshow' }).isVisible());
  await page.getByRole('button', { name: 'Play slideshow' }).click();
  await page.waitForFunction(index => [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active')) !== index, focused, { timeout: SLIDE_MS * 2 });
  check('explicit Play resumes after keyboard interruption', true);
  await context.close();
}

// 6. Moving galleries.
{
  const { context, page, problems } = await open();
  await page.goto(new URL('/inspiration', base).href, { waitUntil: 'networkidle' });
  const rows = await page.locator('.cv-gallery-row').count();
  check('inspiration page renders eight gallery rows', rows === 8, String(rows));
  const geometry = await page.evaluate(() => [...document.querySelectorAll('.cv-marquee')].map(marquee => {
    const groups = marquee.querySelectorAll('.cv-marquee__group');
    return { primary: groups[0].getBoundingClientRect().width, duplicate: groups[1].getBoundingClientRect().width, viewport: marquee.getBoundingClientRect().width };
  }));
  check('every loop segment is wider than its viewport and equals its copy (seamless)', geometry.every(row => row.primary >= row.viewport && Math.abs(row.primary - row.duplicate) < 1), JSON.stringify(geometry.map(row => Math.round(row.primary))));
  const dupes = await page.evaluate(() => [...document.querySelectorAll('.cv-marquee__group[aria-hidden="true"] a')].every(link => link.tabIndex === -1));
  check('duplicate loop copy is aria-hidden and unfocusable', dupes);
  const position = () => page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('.cv-marquee__track')).transform).m41);
  const first = await position(); await page.waitForTimeout(1500); const second = await position();
  check('gallery moves continuously', first !== second, `${first.toFixed(1)} -> ${second.toFixed(1)}`);
  await page.getByRole('button', { name: 'Pause gallery motion' }).click();
  await page.waitForTimeout(150);
  const held = await position(); await page.waitForTimeout(1200);
  check('gallery pause button stops motion', Math.abs((await position()) - held) < 0.5);
  const broken = await page.evaluate(async () => {
    const images = [...document.querySelectorAll('.cv-marquee img')];
    images.forEach(image => { image.loading = 'eager'; });
    await Promise.all(images.map(image => image.decode().catch(() => undefined)));
    return images.filter(image => !image.complete || image.naturalWidth === 0).length;
  });
  check('all gallery images load', broken === 0, `${broken} broken`);
  check('gallery page had no console, request or HTTP errors', problems.length === 0, problems.join(' | '));
  await context.close();
  const reduced = await open({ reducedMotion: true });
  await reduced.page.goto(new URL('/inspiration', base).href, { waitUntil: 'networkidle' });
  const still = await reduced.page.evaluate(() => { const track = document.querySelector('.cv-marquee__track'); const marquee = document.querySelector('.cv-marquee'); return { animation: getComputedStyle(track).animationName, overflowX: getComputedStyle(marquee).overflowX, duplicate: getComputedStyle(document.querySelector('.cv-marquee__group[aria-hidden="true"]')).display }; });
  check('reduced motion makes galleries a still, scrollable row', still.animation === 'none' && still.overflowX === 'auto' && still.duplicate === 'none', JSON.stringify(still));
  await reduced.context.close();
}

// 7. No horizontal overflow, clear primary CTA, at every audited width.
for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  const { context, page } = await open();
  await page.setViewportSize({ width, height: width < 768 ? 800 : 900 });
  for (const route of ['/', '/inspiration']) {
    await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    check(`no horizontal overflow at ${width}px ${route}`, overflow <= 0, `${overflow}px`);
  }
  await page.goto(new URL('/', base).href, { waitUntil: 'networkidle' });
  const activeCta = page.locator('.cv-hero__cta:visible');
  await activeCta.scrollIntoViewIfNeeded();
  const hero = await page.evaluate(() => {
    const cta = document.querySelector('.cv-hero__cta:not([hidden])').getBoundingClientRect();
    const stage = document.querySelector('.cv-hero__stage').getBoundingClientRect();
    const controls = document.querySelector('.cv-hero__controls').getBoundingClientRect();
    const content = document.querySelector('.editorial-hero__content').getBoundingClientRect();
    const hit = document.elementFromPoint(cta.x + cta.width / 2, cta.y + cta.height / 2);
    const separate = a => a.top >= stage.bottom - 1 || a.left >= stage.right - 1 || a.right <= stage.left + 1;
    return { ctaClear: Boolean(hit && hit.closest('.cv-hero__cta')), ctaOutsidePhoto: separate(cta), controlsOutsidePhoto: separate(controls), editorialOutsidePhoto: separate(content), mobileImageFirst: innerWidth >= 1100 || content.top >= stage.bottom - 1 };
  });
  check(`hero controls and text stay separate from photography at ${width}px`, hero.ctaClear && hero.ctaOutsidePhoto && hero.controlsOutsidePhoto && hero.editorialOutsidePhoto && hero.mobileImageFirst, JSON.stringify(hero));
  await context.close();
}

await browser.close();
const failed = results.filter(result => !result.ok);
console.log(JSON.stringify({ checks: results.length, failed: failed.length }));
if (failed.length) process.exit(1);
