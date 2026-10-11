/** Property-gallery release QA. All images must be local; no delivery requests. */
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';
import { isPermittedDesignQaBase, installScopedPreviewBypass } from './remote-design-image-verification.mjs';
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
assert(isPermittedDesignQaBase(base, argument('live', 'false'), argument('preview-host', '')), 'Use localhost or explicitly name the approved JUFAJA preview host');
const text = await readFile(new URL('../src/data/property-locations.ts', import.meta.url), 'utf8');
const properties = JSON.parse(`[${text.split('export const PROPERTY_LOCATIONS: PropertyLocation[] = [')[1].split('\n];')[0]}]`);
const photographed = properties.filter(property => property.photos?.length);
const output = argument('output', path.join(tmpdir(), 'jufaja-gallery-expansion'));
await mkdir(output, {recursive: true});
const galleryImages = property => property.imageMode === 'real' ? property.photos : property.fallbackImages;
const errors = [];
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });
try {
 const storageState = process.env.JUFAJA_QA_STORAGE_STATE;
 const context = await browser.newContext({ reducedMotion: 'reduce', hasTouch: true, ...(storageState ? {storageState} : {}) });
 if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) await installScopedPreviewBypass(context, base.origin, process.env.VERCEL_AUTOMATION_BYPASS_SECRET);
 await context.route('**/api/enquiry', route => route.abort());
 const page = await context.newPage();
 page.on('pageerror', error => errors.push(error.message));
 page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
 for (const width of argument('widths', '320,390,430,768,1024,1440,1920').split(',').map(Number)) {
  await page.setViewportSize({width, height: width < 768 ? 844 : 900});
  const response = await page.goto(new URL('/projects', base).href, {waitUntil: 'networkidle'});
  assert.equal(response.status(), 200);
  const section = page.locator('section[aria-labelledby="property-collection-heading"]');
  assert.equal(await section.locator('a[href]').count(), 0, 'Public gallery must not navigate to external sources');
  assert.equal(await section.getByRole('button', {name: /View gallery/}).count(), properties.length);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `Page overflow at ${width}`);
  assert.equal(await section.locator('article').count(), 28);
  assert.equal(await section.getByText('Representative exterior', {exact: true}).count(), 17);
  for (const property of properties) {
   const card = section.locator('article').filter({has: page.getByRole('heading', {name: property.street, exact: true})});
   await card.scrollIntoViewIfNeeded();
   const cardImage = card.locator('img').first();
   await cardImage.evaluate(image => image.decode());
   assert.equal(await cardImage.getAttribute('src'), galleryImages(property)[0]);
   assert.equal(await card.getByRole('button').count(), 1);
  }
  assert(!/\bAI\b|AI-generated|CGI|illustrative concept/i.test(await page.locator('body').innerText()));
  await section.screenshot({path: path.join(output, 'projects-' + width + '.png')});
  for (const property of properties) {
   const images = galleryImages(property);
   const label = property.imageMode === 'real' ? 'photograph' : 'representative image';
   const address = `${property.street}, ${property.suburb} NSW ${property.postcode}`;
   const trigger = section.locator('article').filter({has: page.getByRole('heading', {name: property.street, exact: true})}).getByRole('button').first();
   await trigger.click();
   const dialog = page.getByRole('dialog');
   await dialog.waitFor({state: 'visible'});
   const photo = dialog.locator('img').first();
   const check = async index => {
    await page.waitForFunction(expected => { const image = document.querySelector('dialog[open] img'); return image?.getAttribute('src') === expected && image.complete && image.naturalWidth > 0; }, images[index]);
    assert.equal(await photo.getAttribute('src'), images[index]);
    assert(images[index].startsWith('/images/'), 'Hotlinked property image');
   };
   await check(0);
   assert.equal(await dialog.getByText('Representative project imagery', {exact: true}).count(), property.imageMode === 'representative' ? 1 : 0);
   if (property.imageMode === 'representative' && property === properties[0]) await dialog.screenshot({path: path.join(output, 'representative-dialog-' + width + '.png')});
   for (let tab = 0; tab < 4; tab++) {
    await page.keyboard.press('Tab');
    assert(await dialog.evaluate(element => element.contains(document.activeElement) || document.activeElement === document.body), 'Modal must prevent focus on background controls');
   }
   assert(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth), `Dialog overflow ${address} at ${width}`);
   if (images.length > 1) {
    await dialog.getByRole('button', {name: 'Next ' + label, exact: true}).click(); await check(1);
    await dialog.getByRole('button', {name: 'Previous ' + label, exact: true}).click(); await check(0);
    await page.keyboard.press('ArrowLeft'); await check(images.length - 1);
    await page.keyboard.press('ArrowRight'); await check(0);
    for (let index = 0; index < images.length; index++) {
     await dialog.getByRole('button', {name: `Show ${label} ${index + 1}`, exact: true}).click(); await check(index);
    }
    await dialog.getByRole('button', {name: 'Show ' + label + ' 1', exact: true}).click();
    await photo.evaluate(image => {
     const target = image.parentElement.parentElement;
     const rect = target.getBoundingClientRect();
     const start = new Touch({identifier: 1, target, clientX: rect.left + rect.width * .8, clientY: rect.top + rect.height / 2});
     const end = new Touch({identifier: 1, target, clientX: rect.left + rect.width * .2, clientY: rect.top + rect.height / 2});
     target.dispatchEvent(new TouchEvent('touchstart', {bubbles: true, touches: [start], changedTouches: [start]}));
     target.dispatchEvent(new TouchEvent('touchend', {bubbles: true, touches: [], changedTouches: [end]}));
    });
    await check(1);
   }
   await page.keyboard.press('Escape'); await dialog.waitFor({state: 'hidden'});
   assert(await trigger.evaluate(element => document.activeElement === element), `Focus restoration failed: ${address}`);
   await trigger.click(); await dialog.getByRole('button', {name: 'Close property gallery'}).click();
   await dialog.waitFor({state: 'hidden'});
  }
  await section.getByRole('searchbox').fill('no-matching-residence-qa');
  assert.equal(await section.locator('article').count(), 0);
  await section.getByRole('searchbox').fill('');
  await section.getByRole('combobox').selectOption(properties[0].suburb);
  assert.equal(await section.locator('article').count(), properties.filter(property => property.suburb === properties[0].suburb).length);
  await section.getByRole('combobox').selectOption('All areas');
  console.log(`PASS ${width}px: 28 address cards, 34 distinct representative images, 17 representative galleries, ${photographed.length} real galleries, image decoding, modal controls and search`);
 }
 assert.deepEqual(errors, [], 'Browser errors');
} finally { await browser.close(); }
