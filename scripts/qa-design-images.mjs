/** Verify published catalogue images against the registry. Never delivers enquiries. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';

const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
const productionHosts = ['jufaja-homes-platform.vercel.app', 'www.jufajaconstructions.com.au', 'jufajaconstructions.com.au'];
assert(local || (argument('live', 'false') === 'true' && base.protocol === 'https:' && productionHosts.includes(base.hostname)), 'Use localhost or an approved HTTPS production host with --live=true');
const output = argument('output', path.join(tmpdir(), 'jufaja-design-image-qa'));
const designs = JSON.parse(await readFile(new URL('../src/data/designs.json', import.meta.url), 'utf8'));
const registry = JSON.parse(await readFile(new URL('../src/data/design-images.json', import.meta.url), 'utf8'));
const records = new Map(registry.map(record => [record.slug, record]));
assert.equal(records.size, designs.length, 'One registry record per design');
assert.equal(registry.length, designs.length, 'No duplicate registry records');
for (const design of designs) assert(records.has(design.slug), `Missing registry record: ${design.slug}`);
const report = { base: base.origin, assets: [], catalogueCards: 0, detailPages: 0, relatedCards: 0, featuredCards: 0, blockedEnquiries: 0, errors: [] };
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await context.route('**/api/enquiry', route => { report.blockedEnquiries++; return route.abort(); });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  for (const record of registry.filter(record => record.status === 'available')) {
    const response = await context.request.get(new URL(record.image.path, base).href);
    assert.equal(response.status(), 200, record.image.path);
    const body = await response.body();
    assert.equal(body.length, record.image.bytes, `${record.slug}: byte count`);
    assert.equal(createHash('sha256').update(body).digest('hex'), record.image.sha256, `${record.slug}: deployed SHA-256`);
    report.assets.push(record.slug);
  }
  async function open(route) {
    const response = await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, route);
  }
  async function checkFrame(frame, slug, lazy) {
    const record = records.get(slug);
    assert(record, `Unknown linked design ${slug}`);
    assert.equal(await frame.count(), 1, `${slug}: image frame`);
    await frame.scrollIntoViewIfNeeded();
    const ratio = await frame.evaluate(element => { const rect = element.getBoundingClientRect(); return rect.width / rect.height; });
    assert(Math.abs(ratio - 4 / 3) < 0.025, `${slug}: frame must be 4:3 (${ratio})`);
    const image = frame.locator('img');
    if (record.status === 'pending') {
      assert.equal(await image.count(), 0, `${slug}: pending must not show facade`);
      const placeholder = frame.locator('[role="img"]').or(frame.and(page.locator('[role="img"]')));
      assert.equal(await placeholder.count(), 1, `${slug}: accessible placeholder`);
      assert.match(await placeholder.getAttribute('aria-label'), /pending review/i);
      return;
    }
    assert.equal(await image.count(), 1, `${slug}: facade image count`);
    await image.evaluate(element => element.decode());
    const state = await image.evaluate(element => ({ src: element.currentSrc || element.src, alt: element.alt, loading: element.loading, fit: getComputedStyle(element).objectFit, width: element.naturalWidth }));
    const url = new URL(state.src);
    assert.equal(url.searchParams.get('url') ?? url.pathname, record.image.path, `${slug}: registry path`);
    assert(state.width > 0, `${slug}: decoded image`);
    assert(state.alt.trim().length > 10, `${slug}: descriptive alt`);
    assert(['cover', 'contain'].includes(state.fit), `${slug}: image stretching (${state.fit})`);
    if (lazy) assert.equal(state.loading, 'lazy', `${slug}: card lazy loading`);
  }
  async function checkCards(selector, frameSelector) {
    const cards = page.locator(selector);
    const slugs = [];
    for (let index = 0; index < await cards.count(); index++) {
      const card = cards.nth(index);
      const href = await card.locator('a[href^="/designs/"]').first().getAttribute('href');
      const slug = href.split('/')[2];
      await checkFrame(card.locator(frameSelector), slug, true);
      slugs.push(slug);
    }
    return slugs;
  }
  await open('/designs');
  const catalogue = await checkCards('.design-card', '.design-card__image');
  assert.deepEqual([...catalogue].sort(), designs.map(design => design.slug).sort(), 'Every catalogue card is represented once');
  report.catalogueCards = catalogue.length;
  await open('/');
  const featured = await checkCards('.cv-design-card', '.cv-design-card__image');
  assert(featured.length > 0, 'Homepage featured images');
  report.featuredCards = featured.length;
  for (const design of designs) {
    await open(`/designs/${design.slug}`);
    await checkFrame(page.locator('.facade-view'), design.slug, false);
    const related = await checkCards('.design-card', '.design-card__image');
    const expected = designs.filter(item => item.dwellingType === design.dwellingType && item.id !== design.id).slice(0, 3).map(item => item.slug);
    assert.deepEqual(related, expected, `${design.slug}: related cards`);
    report.relatedCards += related.length;
    report.detailPages++;
  }
  assert.deepEqual(report.errors, [], 'Browser runtime errors');
} catch (error) {
  report.failure = error.stack;
  process.exitCode = 1;
} finally {
  await browser.close();
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, 'design-images.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, assets: report.assets.length, output }));
}
