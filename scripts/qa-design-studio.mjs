import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';

const arg = (name, fallback) => process.argv.find(v => v.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(arg('base-url', 'http://127.0.0.1:3010'));
assert(['127.0.0.1', 'localhost'].includes(base.hostname), 'This fixture-based journey runs only against localhost.');
const output = arg('output', path.join(tmpdir(), 'jufaja-studio-qa'));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const report = { status: 'RUNNING', checks: [], errors: [], widths: [] };
const source = { title: 'QA fixture for official source handling', url: 'https://www.planningportal.nsw.gov.au/spatialviewer/', retrievedAt: '2026-10-27T00:00:00.000Z' };
const fixture = {
  location: { longitude: 151.2, latitude: -33.8 }, retrievedAt: source.retrievedAt,
  parcels: [{ id: 'qa-lot', label: 'QA lot / DP1', rings: [[[151.2,-33.8],[151.2002,-33.8],[151.2002,-33.8003],[151.2,-33.8003],[151.2,-33.8]]], source }],
  controls: [
    { id: 'height', label: 'Mapped building height', status: 'available', values: ['8.5 m'], numericValue: 8.5, unit: 'm', source, notes: 'QA mapped record; not approval.' },
    { id: 'fsr', label: 'Mapped floor space ratio', status: 'available', values: ['0.5'], numericValue: 0.5, source, notes: 'QA mapped record; not approval.' },
    { id: 'flood', label: 'Flood planning map', status: 'unavailable', values: [], source, notes: 'Official service unavailable in this test.' },
  ], warnings: ['QA fixture: survey and assessment required.'], references: [],
};
try {
  const context = await browser.newContext({ reducedMotion: 'reduce', acceptDownloads: true });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  // No QA enquiry may leave the browser. Planning fixtures test state handling;
  // separate live API verification is required before claiming data integration.
  let delivery = 'error', payload;
  await context.route('**/api/enquiry', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: delivery === 'error' ? 503 : 200, json: delivery === 'error' ? { error: 'Intercepted studio QA failure.' } : { success: true } });
  });
  await context.route('**/api/planning/address?*', route => route.fulfill({ json: { source, warnings: ['Confirm the returned candidate.'], candidates: [{ id: 'qa', label: 'QA SITE SYDNEY', longitude: 151.2, latitude: -33.8, council: 'QA council', propertyId: 'qa', matchNotes: [] }] } }));
  await context.route('**/api/planning/site?*', route => route.fulfill({ json: fixture }));
  // Stable local image avoids treating an external basemap outage as an editor failure.
  await context.route('https://maps.six.nsw.gov.au/**', route => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#f1f3ed"/></svg>' }));
  await page.goto(new URL('/design-studio', base).href);
  await page.getByLabel('Concept name').fill('QA renovation concept');
  await page.getByLabel(/^Project type/).selectOption('Renovation');
  await page.getByLabel('Width (m)', { exact: true }).fill('8');
  await page.getByRole('button', { name: '+ Add room', exact: true }).click();
  await page.getByLabel('Room name', { exact: true }).fill('Study');
  await page.getByLabel('Storeys', { exact: true }).fill('3');
  await page.getByLabel('Show floor', { exact: true }).selectOption('2');
  await page.getByLabel('Storeys', { exact: true }).fill('1');
  await page.getByLabel('Concept name').focus();
  assert.equal(await page.locator('.studio-preview svg > g').count(), 4, 'Reducing storeys restores all rooms');
  await page.getByRole('button', { name: 'Floor plan', exact: true }).click();
  await page.getByRole('button', { name: '3D model', exact: true }).click();
  await page.getByLabel('Rotate 3D model').fill('120');
  await page.getByLabel('Preview zoom').fill('1.2');
  report.checks.push('Editable room geometry, storey reduction regression, 2D/3D, rotate and zoom');
  await page.getByLabel('Street number', { exact: true }).fill('1');
  await page.getByLabel('Street name', { exact: true }).fill('QA');
  await page.getByLabel('Suburb', { exact: true }).fill('Sydney');
  await page.getByRole('button', { name: 'Find address', exact: true }).click();
  await page.getByRole('button', { name: /QA SITE SYDNEY/ }).click();
  await page.getByRole('button', { name: 'Use QA lot / DP1 boundary', exact: true }).waitFor();
  assert.match(await page.locator('.studio-comparisons').innerText(), /Limit not established/);
  await page.getByRole('button', { name: 'Use QA lot / DP1 boundary', exact: true }).click();
  assert.match(await page.locator('.studio-comparisons').innerText(), /At or below reference value/);
  assert.match(await page.locator('.studio-control-grid').innerText(), /unavailable/);
  await page.getByRole('button', { name: 'Pan map east', exact: true }).click();
  await page.getByRole('button', { name: 'Look up map centre', exact: true }).click();
  await page.getByRole('button', { name: 'Use QA lot / DP1 boundary', exact: true }).waitFor();
  assert.match(await page.locator('.studio-comparisons').innerText(), /Limit not established/);
  report.checks.push('Address selection, parcel import, mapped value gating, unavailable overlay and map lookup invalidation');
  const reportDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download report', exact: true }).click();
  const reportFile = path.join(output, 'concept-report.txt');
  await (await reportDownload).saveAs(reportFile);
  const text = await readFile(reportFile, 'utf8');
  assert.match(text, /NOT MATCHED/);
  assert.match(text, /NOT APPROVED/);
  assert.match(text, /unavailable/);
  const save = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Save design', exact: true }).click();
  const saved = path.join(output, 'concept.json');
  await (await save).saveAs(saved);
  const project = JSON.parse(await readFile(saved, 'utf8'));
  assert.equal(project.design.projectType, 'Renovation');
  assert.equal(project.design.rooms.length, 4);
  await page.locator('input[type=file]').setInputFiles(saved);
  await page.getByRole('status').filter({ hasText: /Design opened/ }).waitFor();
  assert.equal(await page.locator('.studio-control-grid').count(), 0);
  await page.locator('input[type=file]').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{"version":1}') });
  await page.getByRole('alert').filter({ hasText: /supported JUFAJA/ }).waitFor();
  report.checks.push('JSON roundtrip strips planning authority; invalid import rejected; source/report download retained');
  await page.getByRole('button', { name: 'Discuss this concept', exact: true }).click();
  assert.match(await page.locator('#contact-message').inputValue(), /QA renovation concept/);
  await page.locator('#contact-name').fill('Studio QA');
  await page.locator('#contact-email').fill('qa@example.invalid');
  await page.locator('#contact-phone').fill('0400000000');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'Intercepted studio QA failure.' }).waitFor();
  delivery = 'success';
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await page.getByRole('status').filter({ hasText: 'Thank you' }).waitFor();
  assert.match(payload.message, /QA renovation concept/);
  report.checks.push('Enquiry design snapshot, mocked delivery failure and success; zero real enquiries');
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) report.overflowElements = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 1 && r.left >= 0; }).map(el => ({ tag: el.tagName, className: el.getAttribute('class'), text: el.textContent?.slice(0, 80), right: el.getBoundingClientRect().right })).slice(0, 25));
    assert(overflow <= 1, `${overflow}px overflow at ${width}`);
    report.widths.push({ width, overflow });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: path.join(output, 'studio-desktop.png'), fullPage: true });
  await page.emulateMedia({ media: 'print' });
  assert(await page.locator('.studio-print-summary').isVisible());
  await page.pdf({ path: path.join(output, 'concept-print.pdf'), format: 'A4', printBackground: true });
  assert.deepEqual(report.errors, []);
  report.status = 'PASS';
} catch (error) { report.status = 'FAIL'; report.failure = error.stack; process.exitCode = 1; }
finally { await browser.close(); await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2)); }
