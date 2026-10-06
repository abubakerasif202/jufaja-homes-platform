/** Hydration stress test (React #418/#423/#425). Never submits an enquiry. */
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
const total = Number(argument('loads', '200'));
const seedArg = Number(argument('seed', '1'));
const output = argument('output', path.join(tmpdir(), 'jufaja-hydration'));
await mkdir(output, { recursive: true });

let seed = seedArg;
const random = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const pick = list => list[Math.floor(random() * list.length)];

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
const widths = [[390, 844], [430, 932], [768, 1024], [1440, 900], [1920, 1080]];
const networks = { none: null, slow: { latency: 150, down: 1.6 * 1024 * 1024 / 8, up: 750 * 1024 / 8 }, fast3g: { latency: 40, down: 10 * 1024 * 1024 / 8, up: 5 * 1024 * 1024 / 8 } };
const HYDRATION = /hydrat|did not match|#418|#423|#425|error #4(18|23|25)/i;

const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });
const events = [];
const failedRequests = [];
let loads = 0;
const log = [];

async function newSession(options) {
  const context = await browser.newContext({ reducedMotion: options.reduced ? 'reduce' : 'no-preference', viewport: { width: options.width, height: options.height } });
  if (options.intercept) await context.route('**/api/enquiry', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"success":false}' }));
  if (options.observers) await context.addInitScript(() => {
    window.auditVitals = { cls: 0, lcp: 0 };
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.auditVitals.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.auditVitals.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  if (options.cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: options.cpu });
  const net = networks[options.network];
  if (net) await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: net.latency, downloadThroughput: net.down, uploadThroughput: net.up });
  const session = { context, page, options, current: null };
  page.on('pageerror', error => record(session, 'pageerror', error.message));
  page.on('console', message => { if (['error', 'warning'].includes(message.type()) && !/Failed to load resource/.test(message.text())) record(session, `console.${message.type()}`, message.text()); });
  page.on('requestfailed', request => { if (!request.failure()?.errorText.includes('ERR_ABORTED')) failedRequests.push(`${request.url()} ${request.failure()?.errorText}`); });
  return session;
}

function record(session, kind, text) {
  if (!HYDRATION.test(text) && kind !== 'pageerror') return;
  if (kind === 'pageerror' && !HYDRATION.test(text)) { log.push({ kind, text: text.slice(0, 200), url: session.page.url() }); return; }
  events.push({ kind, text: text.slice(0, 400), ...session.current, pageUrl: session.page.url(), options: session.options });
  snapshot(session, events.length).catch(() => undefined);
}

async function snapshot(session, index) {
  const url = session.page.url();
  const [state, html] = await Promise.all([
    session.page.evaluate(() => ({ scrollY: window.scrollY, viewport: [innerWidth, innerHeight], storage: Object.fromEntries(Object.entries(sessionStorage)), readyState: document.readyState, html: document.documentElement.outerHTML })),
    session.context.request.get(url).then(response => response.text()).catch(() => ''),
  ]);
  await writeFile(path.join(output, `event-${index}.dom.html`), state.html);
  await writeFile(path.join(output, `event-${index}.server.html`), html);
  events[index - 1].state = { scrollY: state.scrollY, viewport: state.viewport, storage: state.storage, readyState: state.readyState };
}

async function load(session, route, scenario) {
  const { page } = session;
  session.current = { route, scenario, load: loads };
  loads += 1;
  const target = new URL(route, base).href;
  if (scenario === 'early-scroll') {
    await page.goto(target, { waitUntil: 'commit' });
    for (let i = 0; i < 6; i += 1) { await page.evaluate(y => window.scrollTo(0, y), 80 + i * 380).catch(() => undefined); await page.waitForTimeout(25); }
  } else if (scenario === 'reload-scrolled') {
    await page.goto(target, { waitUntil: 'load' });
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(100);
    await page.reload({ waitUntil: 'commit' });
  } else if (scenario === 'back-forward') {
    await page.goto(new URL('/contact', base).href, { waitUntil: 'load' });
    await page.goto(target, { waitUntil: 'load' });
    await page.goBack({ waitUntil: 'load' }).catch(() => undefined);
    await page.goForward({ waitUntil: 'commit' }).catch(() => undefined);
  } else if (scenario === 'resize-immediately') {
    await page.goto(target, { waitUntil: 'commit' });
    const [w, h] = pick(widths);
    await page.setViewportSize({ width: w, height: h });
  } else if (scenario === 'rapid-routes') {
    for (const next of [pick(routes), pick(routes), route]) await page.goto(new URL(next, base).href, { waitUntil: 'commit' }).catch(() => undefined);
  } else if (scenario === 'client-nav') {
    await page.goto(new URL('/', base).href, { waitUntil: 'load' });
    const link = page.locator(`a[href="${route}"]`).first();
    if (await link.count()) await link.evaluate(node => node.click()).catch(() => undefined); else await page.goto(target, { waitUntil: 'commit' });
  } else {
    await page.goto(target, { waitUntil: 'commit' });
  }
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => undefined);
  await page.waitForTimeout(200);
  if (session.options.crawl) {
    // Mirror scripts/qa-browser.mjs: scroll the whole page, decode images, then full-page screenshot.
    const height = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => 0);
    for (let y = 0; y < height; y += 650) { await page.evaluate(top => window.scrollTo(0, top), y).catch(() => undefined); await page.waitForTimeout(25); }
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => undefined);
    await page.evaluate(async () => Promise.all([...document.images].filter(image => image.getClientRects().length && image.naturalWidth).map(image => image.decode().catch(() => undefined)))).catch(() => undefined);
    await page.screenshot({ fullPage: true }).catch(() => undefined);
  }
}

const scenarios = argument('scenarios', 'plain,early-scroll,reload-scrolled,back-forward,resize-immediately,rapid-routes,client-nav').split(',');
let reused = null;
try {
  while (loads < total) {
    const [width, height] = pick(widths);
    const options = {
      width, height,
      network: pick(['none', 'none', 'slow', 'fast3g']),
      cpu: pick([1, 1, 4, 6]),
      reduced: random() < 0.6,
      intercept: argument('force-crawl', 'false') === 'true' ? true : random() < 0.5,
      reuse: argument('force-crawl', 'false') === 'true' ? true : random() < 0.5,
      populated: random() < 0.5,
      observers: argument('force-crawl', 'false') === 'true' ? true : random() < 0.5,
      crawl: argument('force-crawl', 'false') === 'true' ? true : random() < 0.5,
    };
    let session;
    if (options.reuse && reused) { session = reused; session.options = { ...options, reuse: true }; await session.page.setViewportSize({ width, height }); }
    else {
      if (reused) await reused.context.close();
      session = await newSession(options);
      reused = options.reuse ? session : null;
      if (!options.reuse) reused = null;
    }
    if (options.populated) await session.page.addInitScript(() => { try { sessionStorage.setItem('jufaja_intro_viewed', 'true'); } catch { /* storage unavailable */ } });
    for (let i = 0; i < 6 && loads < total; i += 1) {
      await load(session, pick(routes), pick(scenarios));
    }
    if (!options.reuse) await session.context.close();
  }
} finally {
  await browser.close();
}
const summary = { base: base.origin, loads, hydrationEvents: events.length, otherErrors: log.length, failedRequests: failedRequests.length, output };
await writeFile(path.join(output, 'report.json'), JSON.stringify({ summary, events, log, failedRequests }, null, 1));
console.log(JSON.stringify(summary));
for (const event of events.slice(0, 10)) console.log(`HYDRATION ${event.kind} ${event.pageUrl} scenario=${event.scenario} ${JSON.stringify(event.options)} :: ${event.text.slice(0, 120)}`);
for (const entry of log.slice(0, 5)) console.log(`OTHER ${entry.kind} ${entry.url} :: ${entry.text}`);
if (events.length) process.exit(1);
