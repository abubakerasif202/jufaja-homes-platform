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
  assert.match(galleryText, /properties\.filter/);
  assert.match(galleryText, /<dialog/);
  assert.match(galleryText, /onTouchCancel/);
  assert.match(galleryText, /onKeyDown/);
});

test('all 17 unphotographed addresses use 34 local, source-verified representative exteriors', () => {
  const galleryProps = properties.filter(property => property.photos?.length);
  const unphotographed = properties.filter(property => !property.photos?.length);
  assert.equal(galleryProps.length, 11);
  assert.equal(unphotographed.length, 17);
  const provenance = JSON.parse(fs.readFileSync(path.join(root, 'docs/property-representative-provenance.json'), 'utf8'));
  assert.equal(provenance.addresses.length, 17);
  const images = unphotographed.flatMap(property => property.fallbackImages || []);
  assert.equal(images.length, 34);
  assert.equal(new Set(images).size, 34);
  const crypto = require('node:crypto');
  for (const property of unphotographed) {
    assert.equal(property.imageMode, 'representative');
    assert.equal(property.fallbackImages.length, 2);
    assert.equal(property.displayNote, 'Representative exterior');
    const address = `${property.street}, ${property.suburb} NSW ${property.postcode}`;
    const record = provenance.addresses.find(item => item.address === address);
    assert.ok(record, `Missing representative provenance: ${address}`);
    for (const image of property.fallbackImages) {
      assert.ok(image.startsWith('/images/projects/representative/'));
      const dest = path.join(root, 'public', image);
      assert.ok(fs.existsSync(dest), `Missing representative image: ${image}`);
      const source = record.images.find(item => item.path === image);
      assert.ok(source, `No provenance entry: ${image}`);
      const buffer = fs.readFileSync(dest);
      assert.equal(buffer.length, source.bytes);
      assert.equal(crypto.createHash('sha256').update(buffer).digest('hex'), source.sha256);
    }
  }
  for (const property of galleryProps) {
    assert.equal(property.imageMode, 'real');
    assert.equal(property.fallbackImages, undefined, 'Original real photos must remain unchanged');
  }
  assert.doesNotMatch(galleryText, /PHOTOGRAPHED_PROPERTIES|if \(!firstImage\) return null/);
});


test('public representative imagery is clearly distinguished without prohibited labels', () => {
  const page = fs.readFileSync(path.join(root, 'src/app/projects/page.tsx'), 'utf8');
  assert.doesNotMatch(galleryText + page, /\bAI\b|AI-generated|CGI|illustrative concept/i);
  assert.match(galleryText, /Representative project imagery/);
  assert.match(galleryText, /Architectural references, not photographs of this property/);
  assert.match(galleryText, /propertyGalleryImages/);
});


test('public client receives display fields without listing-source provenance', () => {
  assert.doesNotMatch(galleryText, /from ['\"]@\/data\/property-locations/);
  const publicModel = fs.readFileSync(path.join(root, 'src/lib/property-gallery.ts'), 'utf8');
  assert.doesNotMatch(publicModel, /sourceUrl|listedPhotos/);
  const page = fs.readFileSync(path.join(root, 'src/app/projects/page.tsx'), 'utf8');
  assert.doesNotMatch(page, /sourceUrl|listedPhotos/);
});

test('premium image listings are presented first and historical photo listings last', () => {
  const order = JSON.parse(fs.readFileSync(path.join(root, 'src/data/property-gallery-order.json'), 'utf8'));
  const fullKeys = properties.map(property => property.street + '|' + property.suburb);
  assert.equal(order.length, 28);
  assert.equal(new Set(order).size, 28, 'Gallery ordering must not duplicate addresses');
  assert.deepEqual([...order].sort(), [...fullKeys].sort(), 'Every registered property must be included once');
  assert.deepEqual(order.slice(0, 3), [
    '10 Westview Street|Campbelltown',
    '28 Waterhouse Road|Bradbury',
    '59A Fieldhouse Circuit|Campbelltown',
  ], 'High-resolution multi-image property listings must lead');
  assert.equal(order.at(-1), '34 Horatio Street|Rosemeadow', '2016 historical listing should be last');
  const page = fs.readFileSync(path.join(root, 'src/app/projects/page.tsx'), 'utf8');
  const model = fs.readFileSync(path.join(root, 'src/lib/property-gallery.ts'), 'utf8');
  assert.match(page, /prioritizePropertyCards\(PROPERTY_LOCATIONS\)\.map/);
  assert.match(model, /curatedPositions/);
  assert.match(model, /originalIndex/, 'Future unranked addresses should stay in stable order');
  assert.doesNotMatch(page, /latest builds|recently completed|newest construction/i);
});
