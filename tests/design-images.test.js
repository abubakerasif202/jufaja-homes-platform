const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

test('perceptual hashes are calculated from decoded WebP pixels', async () => {
  const { calculatePerceptualHash } = await import('../scripts/audit-design-images.mjs');
  const assignments = JSON.parse(await readFile(path.join(__dirname, '../src/data/design-images.json'), 'utf8'));
  const first = assignments.find((assignment) => assignment.status === 'available');
  const imagePath = path.join(__dirname, '../public', first.image.path.slice(1));

  assert.equal(await calculatePerceptualHash(imagePath), first.image.phash);
  assert.match(first.image.phash, /^[01]{64}$/);
});

test('image audit enforces readable landscape dimensions independently of registry values', async () => {
  const { hasSuitableImageDimensions } = await import('../scripts/audit-design-images.mjs');

  assert.equal(hasSuitableImageDimensions(1440, 1080), true);
  assert.equal(hasSuitableImageDimensions(552, 378), false);
  assert.equal(hasSuitableImageDimensions(1600, 900), false);
  assert.equal(hasSuitableImageDimensions(1080, 1440), false);
});

test('every catalogue design has a reviewed, correctly typed image assignment', async () => {
  const { auditDesignImages } = await import('../scripts/audit-design-images.mjs');
  const result = await auditDesignImages();
  assert.deepEqual(result.errors, []);
  assert.equal(result.catalogueCount, 63);
});

test('published catalogue images have unique slugs, files, hashes, and perceptual compositions', async () => {
  const { auditDesignImages } = await import('../scripts/audit-design-images.mjs');
  const result = await auditDesignImages();
  assert.equal(result.availableCount, 27);
  assert.equal(new Set(result.pendingSlugs).size, 36);
});
