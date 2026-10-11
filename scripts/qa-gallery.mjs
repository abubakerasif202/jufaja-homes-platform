/** Property-gallery release QA. All images must be local; no delivery requests. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
assert(['localhost', '127.0.0.1'].includes(base.hostname) || (argument('live', 'false') === 'true' && base.origin === 'https://www.jufajaconstructions.com.au'), 'Unapproved QA host');
const text = await readFile(new URL('../src/data/property-locations.ts', import.meta.url), 'utf8');
const properties = JSON.parse(`[${text.split('export const PROPERTY_LOCATIONS: PropertyLocation[] = [')[1].split('\n];')[0]}]`).filter(property => property.photos?.length);
const errors = [];
const browser = await chromium.launch({ headless: true, channel: argument('channel', 'msedge') });
try {
 const context = await browser.newContext({ reducedMotion: 'reduce', hasTouch: true });
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
  for (const property of properties) {
   const address = `${property.street}, ${property.suburb} NSW ${property.postcode}`;
   const trigger = section.locator('article').filter({has: page.getByRole('heading', {name: property.street, exact: true})}).getByRole('button').first();
   await trigger.click();
   const dialog = page.getByRole('dialog');
   await dialog.waitFor({state: 'visible'});
   const photo = dialog.locator('img').first();
   const check = async index => {
    await page.waitForFunction(expected => { const image = document.querySelector('dialog[open] img'); return image?.getAttribute('src') === expected && image.complete && image.naturalWidth > 0; }, property.photos[index]);
    assert.equal(await photo.getAttribute('src'), property.photos[index]);
    assert(property.photos[index].startsWith('/images/projects/'), 'Hotlinked property image');
   };
   await check(0);
   for (let tab = 0; tab < 4; tab++) {
    await page.keyboard.press('Tab');
    assert(await dialog.evaluate(element => element.contains(document.activeElement) || document.activeElement === document.body), 'Modal must prevent focus on background controls');
   }
   assert(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth), `Dialog overflow ${address} at ${width}`);
   if (property.photos.length > 1) {
    await dialog.getByRole('button', {name: 'Next photograph', exact: true}).click(); await check(1);
    await dialog.getByRole('button', {name: 'Previous photograph', exact: true}).click(); await check(0);
    await page.keyboard.press('ArrowLeft'); await check(property.photos.length - 1);
    await page.keyboard.press('ArrowRight'); await check(0);
    for (let index = 0; index < property.photos.length; index++) {
     await dialog.getByRole('button', {name: `Show photograph ${index + 1}`, exact: true}).click(); await check(index);
    }
    await dialog.getByRole('button', {name: 'Show photograph 1', exact: true}).click();
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
   await trigger.click(); await dialog.getByRole('button', {name: 'Close property photo gallery'}).click();
   await dialog.waitFor({state: 'hidden'});
  }
  await section.getByRole('searchbox').fill('no-matching-residence-qa');
  assert.equal(await section.getByRole('button', {name: /View gallery/}).count(), 0);
  await section.getByRole('searchbox').fill('');
  await section.getByRole('combobox').selectOption(properties[0].suburb);
  assert.equal(await section.getByRole('button', {name: /View gallery/}).count(), properties.filter(property => property.suburb === properties[0].suburb).length);
  await section.getByRole('combobox').selectOption('All areas');
  console.log(`PASS ${width}px: ${properties.length} galleries, every image, arrows, thumbnails, swipe, Escape, close, focus and search`);
 }
 assert.deepEqual(errors, [], 'Browser errors');
} finally { await browser.close(); }
