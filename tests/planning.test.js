const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');
const service = load('src/lib/planning/service.ts');
const json = data => new Response(JSON.stringify(data), { status: 200 });
const ring = [[151.20, -33.88], [151.21, -33.88], [151.21, -33.87], [151.20, -33.88]];
const height = { id: 'height', label: 'Height', service: 'Principal_Planning', layer: 14, fields: ['MAX_B_H', 'UNITS'], numeric: 'MAX_B_H', unit: 'm' };

test('planning coordinates reject nonfinite and out-of-NSW inputs', () => {
  for (const pair of [[NaN, -33], [151, Infinity], [0, 0], [130, -33], [151, -20]]) assert.equal(service.validLocation(...pair), false);
  assert.equal(service.validLocation(151.2, -33.8), true);
});

test('mapped height comparisons require unambiguous metre values without area qualifications', () => {
  const feature = a => ({ attributes: a });
  const norm = a => service.normaliseControl(height, a.map(feature), '2026-10-27T00:00:00Z');
  assert.equal(norm([{ MAX_B_H: 8.5, UNITS: 'm' }]).numericValue, 8.5);
  for (const rows of [
    [{ MAX_B_H: 8.5, UNITS: 'RL' }], [{ MAX_B_H: '8.5', UNITS: 'm' }],
    [{ MAX_B_H: 8.5, UNITS: 'm', LEGIS_REF_AREA: 'Area A' }],
    [{ MAX_B_H: 8.5, UNITS: 'm' }, { MAX_B_H: 9, UNITS: 'm' }],
    [{ MAX_B_H: 0, UNITS: 'm' }], [{ MAX_B_H: null, UNITS: 'm' }],
  ]) assert.equal(norm(rows).numericValue, undefined);
  assert.equal(norm([]).status, 'not-mapped');
  assert.match(norm([]).notes, /does not establish/);
});

test('DCP references preserve complete official paths and reject unsafe or third-party links', () => {
  const layer = { id: 'dcp', label: 'DCP', service: 'Development_Control', layer: 220, fields: ['PLAN_NAME'] };
  const result = service.normaliseControl(layer, [
    { attributes: { PLAN_NAME: 'Plan', FILE_NAME: 'https://apps.planningportal.nsw.gov.au/path/FILE WITH SPACES!2023 GMT' } },
    { attributes: { FILE_NAME: 'javascript:alert(1)' } },
    { attributes: { FILE_NAME: 'https://evil.example/test' } },
    { attributes: { FILE_NAME: 'https://user:secret@www.planning.nsw.gov.au/test' } },
  ], 'now');
  assert.equal(result.documentLinks.length, 1);
  assert.equal(result.documentLinks[0].url, 'https://apps.planningportal.nsw.gov.au/path/FILE%20WITH%20SPACES!2023%20GMT');
  assert.match(result.notes, /historical or repealed/);
});

test('address service bounds candidates, removes invalid locations and retains fallback warnings', async () => {
  const saved = global.fetch;
  const requests = [];
  try {
    global.fetch = async (url, options) => {
      requests.push({ url: String(url), options });
      return json({ addressResult: { addresses: [
        { objectId: 1, shortAddressString: 'Test address', addressPoint: { centreX: 151.2, centreY: -33.8 }, council: 'Council' },
        { shortAddressString: 'Bad', addressPoint: { centreX: 0, centreY: 0 } },
      ], searchMethod: { methodDescriptions: ['Nearby match'] } } });
    };
    const result = await service.lookupAddress(new URLSearchParams({ roadName: 'Pitt & Other', suburb: 'Sydney', url: 'https://evil.example' }));
    assert.equal(result.candidates.length, 1);
    assert.deepEqual(result.candidates[0].matchNotes, ['Nearby match']);
    assert.match(result.warnings[0], /substitute nearby/);
    const url = new URL(requests[0].url);
    assert.equal(url.hostname, 'mapsq.six.nsw.gov.au');
    assert.equal(url.searchParams.get('roadName'), 'Pitt & Other');
    assert.equal(url.searchParams.has('url'), false);
    assert.equal(requests[0].options.redirect, 'error');
    await assert.rejects(service.lookupAddress(new URLSearchParams({ roadName: 'x' })), /required/);
    await assert.rejects(service.lookupAddress(new URLSearchParams({ roadName: 'x'.repeat(101), suburb: 's' })), /Invalid/);
  } finally { global.fetch = saved; }
});

test('failed, malformed, oversized and error address responses fail without a success result', async () => {
  const saved = global.fetch;
  const params = new URLSearchParams({ roadName: 'Pitt', suburb: 'Sydney' });
  try {
    for (const response of [new Response('{}', { status: 503 }), new Response('<html>'), json({ error: { message: 'Upstream error' } }), json({ addressResult: { errMsg: 'Failed', addresses: [] } }), new Response('x'.repeat(2_000_001))]) {
      global.fetch = async () => response;
      await assert.rejects(service.lookupAddress(params));
    }
  } finally { global.fetch = saved; }
});

test('parcel failure does not fall back to point-only overlay clearance', async () => {
  const saved = global.fetch;
  let requests = 0;
  try {
    global.fetch = async () => { requests++; throw new Error('Offline'); };
    const result = await service.lookupSite(151.2, -33.8);
    assert.equal(requests, 1);
    assert.equal(result.parcels.length, 0);
    assert.ok(result.controls.filter(c => c.status !== 'requires-assessment').every(c => c.status === 'unavailable'));
    assert.match(result.warnings.join(' '), /no point-only substitute/);
    assert.ok(result.controls.some(c => c.id === 'ncc' && c.status === 'requires-assessment'));
  } finally { global.fetch = saved; }
});

test('official parcel intersections drive layer queries; failed and unmapped layers stay distinct', async () => {
  const saved = global.fetch;
  const urls = [];
  try {
    global.fetch = async url => {
      urls.push(new URL(String(url)));
      const parsed = urls.at(-1);
      if (parsed.pathname.includes('Administration/MapServer/3/')) return json({ features: [{ attributes: { OBJECTID: 1, LOTNUMBER: '4', PLANLABEL: 'DP1' }, geometry: { rings: [ring] } }] });
      assert.equal(parsed.searchParams.get('geometryType'), 'esriGeometryPolygon');
      assert.equal(parsed.searchParams.get('spatialRel'), 'esriSpatialRelIntersects');
      assert.deepEqual(JSON.parse(parsed.searchParams.get('geometry')).rings, [ring]);
      if (parsed.pathname.includes('Hazard/MapServer/229/')) return json({ exceededTransferLimit: true, features: [] });
      if (parsed.pathname.includes('Principal_Planning/MapServer/14/')) return json({ features: [{ attributes: { MAX_B_H: 8.5, UNITS: 'm' } }] });
      return json({ features: [] });
    };
    const result = await service.lookupSite(151.2, -33.8);
    assert.equal(urls.length, 13);
    assert.equal(result.parcels.length, 1);
    assert.equal(result.controls.find(c => c.id === 'height').numericValue, 8.5);
    assert.equal(result.controls.find(c => c.id === 'bushfire').status, 'unavailable');
    assert.equal(result.controls.find(c => c.id === 'flood').status, 'not-mapped');
    assert.ok(urls.every(url => url.hostname === 'mapprod3.environment.nsw.gov.au'));
  } finally { global.fetch = saved; }
});

test('invalid unclosed official parcel ring disables all overlay comparisons', async () => {
  const saved = global.fetch;
  try {
    global.fetch = async () => json({ features: [{ attributes: { OBJECTID: 1 }, geometry: { rings: [[[151.2, -33.8], [151.21, -33.8], [151.21, -33.81], [151.2, -33.81]]] } }] });
    const result = await service.lookupSite(151.2, -33.8);
    assert.equal(result.parcels.length, 0);
    assert.ok(result.controls.filter(c => c.status !== 'requires-assessment').every(c => c.status === 'unavailable'));
  } finally { global.fetch = saved; }
});

test('planning API rejects malformed requests, handles rate limits and releases reservations on failure', async () => {
  let released = 0;
  const overrides = {
    '@/lib/planning/service': { ...service, lookupAddress: async () => { throw new Error('Provider secret'); }, lookupSite: async () => { throw new Error('Provider secret'); } },
    '@/lib/planning/request-limit': { acquirePlanningRequest: () => () => released++ },
  };
  const address = load('src/app/api/planning/address/route.ts', overrides).GET;
  const site = load('src/app/api/planning/site/route.ts', overrides).GET;
  assert.equal((await address(new Request('http://localhost/api/planning/address?roadName=Pitt'))).status, 400);
  assert.equal((await site(new Request('http://localhost/api/planning/site?longitude=NaN&latitude=-33'))).status, 400);
  assert.equal((await address(new Request('http://localhost/api/planning/address?roadName=Pitt&suburb=Sydney'))).status, 503);
  const failure = await site(new Request('http://localhost/api/planning/site?longitude=151&latitude=-33'));
  assert.equal(failure.status, 503);
  assert.doesNotMatch(await failure.text(), /Provider secret/);
  assert.equal(released, 2);
  const limited = load('src/app/api/planning/site/route.ts', { ...overrides, '@/lib/planning/request-limit': { acquirePlanningRequest: () => null } }).GET;
  const response = await limited(new Request('http://localhost/api/planning/site?longitude=151&latitude=-33'));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
});

test('planning limiter bounds concurrent calls and release is idempotent', () => {
  const { acquirePlanningRequest } = load('src/lib/planning/request-limit.ts');
  const request = new Request('http://localhost/api/planning/site', { headers: { 'x-forwarded-for': '192.0.2.99' } });
  const releases = Array.from({ length: 6 }, () => acquirePlanningRequest(request));
  assert.ok(releases.every(Boolean));
  assert.equal(acquirePlanningRequest(request), null);
  releases[0](); releases[0]();
  const replacement = acquirePlanningRequest(request);
  assert.equal(typeof replacement, 'function');
  assert.equal(acquirePlanningRequest(request), null);
  releases.forEach(release => release()); replacement();
});
