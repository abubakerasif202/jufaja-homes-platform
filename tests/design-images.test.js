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
  assert.equal(hasSuitableImageDimensions(1200, 896), false);
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

test('native dimension exception requires exact owner approval and current image hash', async () => {
  const { acceptsReviewedNativeDimensions } = await import('../scripts/audit-design-images.mjs');
  const sha256 = 'a'.repeat(64);
  const assignment = { image: { width: 1200, height: 896, sha256 } };
  assert.equal(acceptsReviewedNativeDimensions(assignment, 1200, 896), false);
  assignment.dimensionException = {
    sha256,
    reason: 'Supplied native 1200 x 896 render retained without upscaling.',
    approval: { date: '2026-10-12', response: 'Approve native 1200×896 exception', scope: '34 existing supplied renders at native resolution' },
  };
  assert.equal(acceptsReviewedNativeDimensions(assignment, 1200, 896), true);
  assert.equal(acceptsReviewedNativeDimensions(assignment, 1200, 895), false);
  assert.equal(acceptsReviewedNativeDimensions(assignment, 1199, 896), false);
  assert.equal(acceptsReviewedNativeDimensions({ ...assignment, image: { ...assignment.image, height: 900 } }, 1200, 896), false);
  assert.equal(acceptsReviewedNativeDimensions({ ...assignment, dimensionException: { ...assignment.dimensionException, sha256: 'b'.repeat(64) } }, 1200, 896), false);
  assert.equal(acceptsReviewedNativeDimensions({ ...assignment, dimensionException: { ...assignment.dimensionException, reason: 'Generic approval' } }, 1200, 896), false);
  assert.equal(acceptsReviewedNativeDimensions({ ...assignment, dimensionException: { ...assignment.dimensionException, approval: undefined } }, 1200, 896), false);
});

test('published catalogue images have unique slugs, files, hashes, and perceptual compositions', async () => {
  const { auditDesignImages } = await import('../scripts/audit-design-images.mjs');
  const result = await auditDesignImages();
  assert.equal(result.availableCount, 63);
  assert.deepEqual(result.pendingSlugs, []);
});

test('replacement concepts preserve rejected-source provenance and have correct architecture', async () => {
  const assignments = JSON.parse(await readFile(path.join(__dirname, '../src/data/design-images.json'), 'utf8'));
  for (const slug of ['majestic-series', 'stuart-series', 'hastings-series', 'lennox-series', 'collins-series', 'glenbrook-series', 'alpha-series']) {
    const assignment = assignments.find((record) => record.slug === slug);
    assert.equal(assignment.status, 'available');
    assert.equal(assignment.sourceType, 'generated_concept');
    assert.match(assignment.supersededCandidate.sha256, /^[a-f0-9]{64}$/);
    assert.equal(assignment.visualReview.observedStoreys, slug === 'alpha-series' ? 2 : 1);
    assert.equal(assignment.visualReview.garageSpaces, slug === 'lennox-series' ? 1 : 2);
    assert.equal(assignment.visualReview.sha256, assignment.image.sha256);
    assert(assignment.image.width >= 1200 && assignment.image.height >= 900);
  }
});

test('manual visual approval is bound to file bytes and dwelling architecture', async () => {
  const { hasApprovedVisualReview } = await import('../scripts/audit-design-images.mjs');
  const sha256 = 'a'.repeat(64);
  const review = { sha256, outcome: 'approved', observedStoreys: 1, dwellingUnits: 1, notes: 'Manual facade review.' };
  assert.equal(hasApprovedVisualReview('single', sha256, review), true);
  assert.equal(hasApprovedVisualReview('single', sha256, undefined), false);
  assert.equal(hasApprovedVisualReview('single', 'b'.repeat(64), review), false);
  assert.equal(hasApprovedVisualReview('single', sha256, { ...review, observedStoreys: 2 }), false);
  assert.equal(hasApprovedVisualReview('double', sha256, review), false);
  assert.equal(hasApprovedVisualReview('double', sha256, { ...review, observedStoreys: 2 }), true);
  assert.equal(hasApprovedVisualReview('duplex', sha256, review), false);
  assert.equal(hasApprovedVisualReview('duplex', sha256, { ...review, dwellingUnits: 2 }), true);
  assert.equal(hasApprovedVisualReview('single', sha256, { ...review, outcome: 'rejected' }), false);
  assert.equal(hasApprovedVisualReview('single', sha256, { ...review, notes: '' }), false);
  assert.equal(hasApprovedVisualReview('granny', sha256, { ...review, observedStoreys: 2 }), true);
  assert.equal(hasApprovedVisualReview('rural', sha256, review), true);
});
