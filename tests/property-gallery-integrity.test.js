const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const registryText = fs.readFileSync(path.join(root, 'src/data/property-locations.ts'), 'utf8');
const galleryText = fs.readFileSync(path.join(root, 'src/components/projects/PropertyAddressDirectory.tsx'), 'utf8');
const payload = registryText.split('export const PROPERTY_LOCATIONS: PropertyLocation[] = [')[1]?.split('\n];')[0];
assert.ok(payload, 'Property register must be present and JSON-shaped');
const properties = JSON.parse(`[${payload}]`);

test('gallery retains all 28 distinct addresses and all 58 image references', () => {
  assert.equal(properties.length, 28);
  const addresses = properties.map(p => `${p.street}|${p.suburb}|${p.postcode}`.toLowerCase());
  assert.equal(new Set(addresses).size, 28);
  assert.equal(properties.filter(p => p.photos?.length).length, 15);
  assert.equal(properties.reduce((sum, p) => sum + (p.photos?.length || 0), 0), 58);
});

test('public gallery contains photographs but no map, Google-search or listing-page navigation', () => {
  for (const unwanted of [
    'propertyMapUrl', 'propertyImageSearchUrl', 'Google Maps', 'Search for photos',
    'Full original gallery', 'location.sourceUrl', 'Photography not yet matched',
  ]) assert.ok(!galleryText.includes(unwanted), `Found forbidden gallery reference: ${unwanted}`);
  assert.match(galleryText, /PHOTOGRAPHED_PROPERTIES/);
  assert.match(galleryText, /<dialog/);
  assert.match(galleryText, /onTouchCancel/);
  assert.match(galleryText, /onKeyDown/);
});
