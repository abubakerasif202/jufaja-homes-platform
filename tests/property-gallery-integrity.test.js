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

test('gallery retains all 28 distinct addresses and 50 delivered photos and 58 audited references', () => {
  assert.equal(properties.length, 28);
  const addresses = properties.map(p => `${p.street}|${p.suburb}|${p.postcode}`.toLowerCase());
  assert.equal(new Set(addresses).size, 28);
  assert.equal(properties.filter(p => p.photos?.length).length, 11);
  assert.equal(properties.reduce((sum, p) => sum + (p.photos?.length || 0), 0), 50);
  const provenance = JSON.parse(fs.readFileSync(path.join(root, 'docs/property-photo-provenance.json'), 'utf8'));
  assert.equal(provenance.images.length, 58);
  assert.equal(provenance.images.filter(image => image.error).length, 3);
  assert.equal(provenance.images.filter(image => image.excludedFromPublicGallery).length, 5);
  for (const photo of properties.flatMap(property => property.photos || [])) {
    assert.ok(photo.startsWith('/images/projects/'), 'Property photographs must be local');
    assert.ok(fs.existsSync(path.join(root, 'public', photo)), `Missing local photograph: ${photo}`);
    const record = provenance.images.find(image => image.localPath === photo);
    assert.ok(record?.sourcePage && record.sourceImage, `Missing provenance: ${photo}`);
    const hash = require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(root, 'public', photo))).digest('hex');
    assert.equal(hash, record.sha256, `Photograph differs from reviewed derivative: ${photo}`);
  }
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
