const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');
const { getEnquiryContext } = load('src/lib/enquiry-context.ts');
const { parseDesignFilters } = load('src/lib/design-filter-params.ts');
const { catalogueDesigns } = load('src/lib/catalogue.ts');

test('service links resolve to the matching contact form selection', () => {
  for (const [interest, expected] of [['House & Land', 'House and land'], ['Display Homes', 'Display home'], ['Custom Home', 'Custom home'], ['Knockdown Rebuild', 'Knockdown rebuild'], ['Inclusions', 'Inclusions']]) {
    assert.deepEqual(getEnquiryContext({ interest }), { enquiryType: expected, target: '' });
  }
});
test('design and concept context is retained and takes precedence over interest', () => {
  assert.deepEqual(getEnquiryContext({ design: 'Blaxland Series', interest: 'House & Land' }), { enquiryType: 'Home design', target: 'Blaxland Series' });
  assert.deepEqual(getEnquiryContext({ project: 'Courtyard Residence' }), { enquiryType: 'Design inspiration', target: 'Courtyard Residence' });
  assert.deepEqual(getEnquiryContext({ design: ['repeated', 'value'], interest: 'unknown' }), { enquiryType: 'General enquiry', target: '' });
  assert.equal(getEnquiryContext({ design: 'x'.repeat(500) }).target.length, 120);
});
test('URL filter state supports navigation and safely ignores invalid values', () => {
  assert.equal(parseDesignFilters(new URLSearchParams('dwelling_type=single&bedrooms=4')).dwellingType, 'single');
  const invalid = parseDesignFilters(new URLSearchParams('dwelling_type=unknown&bedrooms=NaN&bathrooms=-1&garages=99&sort=bad'));
  assert.equal(invalid.dwellingType, 'all');
  assert.equal(invalid.bedrooms, 'any');
  assert.equal(invalid.bathrooms, 'any');
  assert.equal(invalid.garages, 'any');
  assert.equal(invalid.sortBy, 'name');
});
test('published catalogue does not expose unsupported pricing, features or third-party plans', () => {
  assert.equal(catalogueDesigns.length, 63);
  for (const design of catalogueDesigns) {
    assert.equal(design.priceGuideFrom, undefined);
    assert.deepEqual(design.floorplans, []);
    assert.deepEqual(design.features, []);
    assert.equal(design.virtualTourUrl, null);
    for (const facade of design.facades) assert.match(facade.image, /^\/images\/architecture\//);
    if (design.dwellingType === 'single') assert.equal(design.facades[0].image, '/images/architecture/daylight-single-storey-home.webp');
  }
});
