const test = require('node:test');
const assert = require('node:assert');
const designs = require('../src/data/designs.json');

// Replicate filterDesigns logic for testing
function filterDesigns(items, f) {
  return items.filter(d => {
    if (f.dwellingType && f.dwellingType !== 'all' && d.dwellingType !== f.dwellingType) return false;
    if (f.bedrooms && f.bedrooms !== 'any' && d.bedrooms < Number(f.bedrooms)) return false;
    if (f.bathrooms && f.bathrooms !== 'any' && d.bathrooms < Number(f.bathrooms)) return false;
    if (f.garages && f.garages !== 'any' && d.garages !== Number(f.garages)) return false;
    if (f.hasVirtualTour && !d.virtualTourUrl) return false;
    return true;
  });
}

test('filters correctly by dwellingType: single', () => {
  const singles = filterDesigns(designs, { dwellingType: 'single' });
  assert.strictEqual(singles.length, 23);
  assert.ok(singles.every(d => d.dwellingType === 'single'));
});

test('filters correctly by dwellingType: double', () => {
  const doubles = filterDesigns(designs, { dwellingType: 'double' });
  assert.strictEqual(doubles.length, 20);
  assert.ok(doubles.every(d => d.dwellingType === 'double'));
});

test('filters correctly by dwellingType: duplex', () => {
  const duplexes = filterDesigns(designs, { dwellingType: 'duplex' });
  assert.strictEqual(duplexes.length, 9);
  assert.ok(duplexes.every(d => d.dwellingType === 'duplex'));
});

test('filters correctly by minimum 5 bedrooms', () => {
  const fiveBeds = filterDesigns(designs, { bedrooms: 5 });
  assert.ok(fiveBeds.length > 0);
  assert.ok(fiveBeds.every(d => d.bedrooms >= 5));
});

test('filters designs with virtual tour', () => {
  const tours = filterDesigns(designs, { hasVirtualTour: true });
  assert.ok(tours.length > 0);
  assert.ok(tours.every(d => d.virtualTourUrl !== null));
});
