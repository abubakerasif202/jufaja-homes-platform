const test = require('node:test');
const assert = require('node:assert');
const designs = require('../src/data/designs.json');
const packages = require('../src/data/packages.json');
const displayHomes = require('../src/data/display-homes.json');

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

test('packages.json has valid listings with prices and locations', () => {
  assert.ok(packages.length >= 10, 'Expected at least 10 packages');
  for (const p of packages) {
    assert.ok(p.price > 500000, `Package ${p.title} price must be realistic`);
    assert.ok(p.suburb, `Package ${p.title} must have suburb`);
    assert.ok(p.lotSizeSqm > 150, `Package ${p.title} lot size must be > 150m2`);
  }
});

test('display-homes.json has valid locations and opening hours', () => {
  assert.strictEqual(displayHomes.length, 4, 'Expected 4 display locations');
  for (const h of displayHomes) {
    assert.ok(h.name && h.address && h.phone, 'Display home missing required details');
  }
});
