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
const SLIDE_MS = 5000;
const activeIndex = page => page.evaluate(() => [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active')));
const open = async (options = {}) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: options.touch, reducedMotion: options.reducedMotion ? 'reduce' : 'no-preference' });
  await context.addInitScript(() => sessionStorage.setItem('jufaja_intro_viewed', 'true'));
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

// 1. Autoplay: every slide appears, ~5s apart, through complete loops.
{
  const { context, page, problems } = await open();
  await page.locator('.cv-hero[data-playing="true"]').waitFor({ timeout: 10000 });
  const seen = [await activeIndex(page)];
  const stamps = [Date.now()];
  const target = SLIDES * loops + 1;
  while (seen.length < target) {
    const last = seen.at(-1);
    await page.waitForFunction(index => [...document.querySelectorAll('.cv-slide')].findIndex(slide => slide.classList.contains('is-active')) !== index, last, { timeout: SLIDE_MS * 2 });
    seen.push(await activeIndex(page));
    stamps.push(Date.now());
  }
  // The first interval starts mid-slide when sampling begins, so it is measured from the second change.
  const gaps = stamps.slice(1).map((time, i) => time - stamps[i]).slice(1);
  check(`autoplay visits slides in order for ${loops} full loops`, seen.every((value, i) => value === i % SLIDES), seen.join(','));
  check('autoplay advances about every 5 seconds', gaps.every(gap => gap > 4300 && gap < 6200), `gaps ${gaps.join(',')}ms`);
  const headline = await page.locator('.cv-slide.is-active .cv-hero__headline').innerText();
  check('active slide headline is visible text', headline.length > 10, headline.replace(/\s+/g, ' '));
  const imagesOk = await page.evaluate(() => [...document.querySelectorAll('.cv-slide img')].every(image => image.complete && image.naturalWidth > 0));
  check('all six slide images decoded (no blank frames)', imagesOk);
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
  const hidden = await page.evaluate(() => [...document.querySelectorAll('.cv-slide:not(.is-active)')].every(slide => slide.getAttribute('aria-hidden') === 'true' && [...slide.querySelectorAll('a')].every(link => link.tabIndex === -1)));
  check('inactive slides are aria-hidden with unfocusable links', hidden);
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
  await swipe(900, 400);
  check('swipe left shows the next slide', (await activeIndex(page)) === (start + 1) % SLIDES);
  await swipe(400, 900);
  check('swipe right shows the previous slide', (await activeIndex(page)) === start);
  await swipe(600, 630);
  check('a short drag does not change slides', (await activeIndex(page)) === start);
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
  await context.close();
}

// 5. Moving galleries.
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

// 6. No horizontal overflow, clear primary CTA, at every audited width.
for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  const { context, page } = await open();
  await page.setViewportSize({ width, height: width < 768 ? 800 : 900 });
  for (const route of ['/', '/inspiration']) {
    await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    check(`no horizontal overflow at ${width}px ${route}`, overflow <= 0, `${overflow}px`);
  }
  await page.goto(new URL('/', base).href, { waitUntil: 'networkidle' });
  const hero = await page.evaluate(() => {
    const cta = document.querySelector('.cv-slide.is-active .cv-hero__cta').getBoundingClientRect();
    const controls = document.querySelector('.cv-hero__controls').getBoundingClientRect();
    const hit = document.elementFromPoint(cta.x + cta.width / 2, cta.y + cta.height / 2);
    const content = document.querySelector('.cv-slide.is-active .cv-hero__content').getBoundingClientRect();
    const heroBox = document.querySelector('.cv-hero').getBoundingClientRect();
    return { ctaClear: Boolean(hit && hit.closest('.cv-hero__cta')), ctaAboveControls: cta.bottom <= controls.top + 1, contentInside: content.top >= heroBox.top - 1 && content.bottom <= heroBox.bottom + 1 };
  });
  check(`hero CTA visible, unobstructed and clear of controls at ${width}px`, hero.ctaClear && hero.ctaAboveControls, JSON.stringify(hero));
  await context.close();
}

await browser.close();
const failed = results.filter(result => !result.ok);
console.log(JSON.stringify({ checks: results.length, failed: failed.length }));
if (failed.length) process.exit(1);
