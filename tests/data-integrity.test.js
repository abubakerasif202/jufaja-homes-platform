const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const designs = require('../src/data/designs.json');

test('designs.json has 63 items with valid required fields', () => {
  assert.strictEqual(designs.length, 63, 'Expected 63 designs');
  const slugs = new Set();
  for (const d of designs) {
    assert.ok(d.name, 'Design must have name');
    assert.ok(d.slug, 'Design must have slug');
    assert.ok(!slugs.has(d.slug), `Duplicate slug: ${d.slug}`);
    slugs.add(d.slug);
    assert.ok(d.bedrooms > 0, `${d.name} bedrooms must be > 0`);
    assert.ok(d.bathrooms > 0, `${d.name} bathrooms must be > 0`);
    assert.ok(d.garages >= 1, `${d.name} garages must be >= 1`);
    assert.ok(d.houseSizeSquares > 0, `${d.name} squares must be > 0`);
    assert.ok(Array.isArray(d.facades) && d.facades.length > 0, `${d.name} must have facades`);
    assert.ok(Array.isArray(d.floorplans) && d.floorplans.length > 0, `${d.name} must have floorplans`);
  }
});

test('unverified package listings are not shipped or generated as detail pages', () => {
  const packageDataPath = path.join(__dirname, '../src/data/packages.json');
  const packageRoutePath = path.join(__dirname, '../src/app/packages/[slug]/page.tsx');
  assert.strictEqual(fs.existsSync(packageDataPath), false, 'Unverified lot, price and availability data must not ship');
  assert.strictEqual(fs.existsSync(packageRoutePath), false, 'Legacy package URLs must use the standard 404 route');
});

test('unverified display locations and contact details are not shipped', () => {
  const displayDataPath = path.join(__dirname, '../src/data/display-homes.json');
  const displayPage = fs.readFileSync(path.join(__dirname, '../src/app/display-homes/page.tsx'), 'utf8');
  assert.strictEqual(fs.existsSync(displayDataPath), false, 'Unverified addresses, hours and phone details must not ship');
  assert.doesNotMatch(displayPage, /Homeworld|Oxley Ridge|openingHours|8783\s*8800/);
  assert.match(displayPage, /No confirmed display locations or opening hours/i);
});
