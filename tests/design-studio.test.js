const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');
const { initialDesign, parseDesign, parseProject, polygonArea, validBoundary, roomInside, unionArea, designMetrics, geometryIssues, boundaryClearance, edgeClearance, ringToLocal } = load('src/lib/design-studio.ts');
const copy = value => JSON.parse(JSON.stringify(value));
const room = (patch = {}) => ({ id: 'room', name: 'Living', x: 2, y: 3, width: 4, depth: 5, floor: 0, ...patch });
const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 12 }, { x: 0, y: 12 }];
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-6, `${actual} != ${expected}`);

test('site area is independent of polygon winding and detects invalid or crossed boundaries', () => {
  assert.equal(polygonArea(square), 120);
  assert.equal(polygonArea([...square].reverse()), 120);
  assert.equal(validBoundary(square), true);
  assert.equal(validBoundary([{ x: 0, y: 0 }, { x: 8, y: 8 }, { x: 0, y: 8 }, { x: 8, y: 0 }]), false);
  assert.equal(validBoundary([...square, square[0]]), false);
  assert.equal(validBoundary([{ x: 0, y: 0 }, { x: Infinity, y: 2 }, { x: 4, y: 5 }]), false);
  assert.equal(validBoundary(Array.from({ length: 101 }, (_, i) => ({ x: i, y: i }))), false);
});

test('room containment rejects concave lot crossings even when all room corners lie on the lot', () => {
  const concave = [{ x: 0, y: 0 }, { x: 8, y: 0 }, { x: 8, y: 8 }, { x: 5, y: 8 }, { x: 5, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 8 }, { x: 0, y: 8 }];
  assert.equal(validBoundary(concave), true);
  assert.equal(roomInside(room({ x: 1, y: 1, width: 6, depth: 5 }), concave), false);
  assert.equal(roomInside(room({ x: 0, y: 0, width: 3, depth: 8 }), concave), true);
  assert.equal(roomInside(room({ x: 0, y: 2, width: 8, depth: 6 }), concave), false);
  assert.equal(roomInside(room({ x: -1 }), square), false);
});

test('overlapping room blocks are counted once and stacked floors have separate floor areas', () => {
  const rooms = [room({ width: 4, depth: 4 }), room({ id: 'two', x: 4, width: 4, depth: 4 })];
  close(unionArea(rooms), 24);
  const design = { ...initialDesign, boundary: square, floors: 2, rooms: [room({ width: 4, depth: 4 }), room({ id: 'upper', width: 4, depth: 4, floor: 1 })] };
  const metrics = designMetrics(design);
  close(metrics.floorArea, 32); close(metrics.footprint, 16); close(metrics.fsr, 32 / 120);
  assert.equal(geometryIssues(design).length, 0);
  assert.ok(geometryIssues({ ...design, rooms }).some(s => /overlaps/.test(s)));
});

test('clearance is the geometric distance to finite lot edges and reaches zero at a boundary', () => {
  const r = room();
  close(boundaryClearance([r], square), 2);
  close(edgeClearance([r], square, 0), 3);
  close(edgeClearance([r], square, 1), 4);
  close(edgeClearance([r], square, 2), 4);
  close(edgeClearance([r], square, 3), 2);
  assert.equal(boundaryClearance([room({ x: 0 })], square), 0);
  assert.equal(boundaryClearance([room({ x: -1 })], square), 0);
  assert.equal(boundaryClearance([], square), null);
  assert.equal(edgeClearance([r], square, 4), null);
});

test('import never trusts authoritative provenance or unrelated file fields', () => {
  const source = { ...copy(initialDesign), boundaryOrigin: 'spatial-reference', approved: true, controls: [{ status: 'compliant' }] };
  const parsed = parseDesign(source);
  assert.equal(parsed.boundaryOrigin, 'manual');
  assert.equal(parsed.approved, undefined); assert.equal(parsed.controls, undefined);
  assert.equal(parsed.rooms.length, 3);
});

test('import rejects invalid floors, duplicate room identities and nonfinite geometry', () => {
  for (const patch of [{ floors: 1.5 }, { floors: 0 }, { floors: 4 }, { storeyHeight: NaN }, { roofHeight: -1 }, { boundary: [] }, { rooms: Array.from({ length: 61 }, (_, i) => room({ id: String(i) })) }]) assert.throws(() => parseDesign({ ...copy(initialDesign), ...patch }));
  assert.throws(() => parseDesign({ ...copy(initialDesign), rooms: [room(), room()] }));
  for (const patch of [{ width: 0 }, { name: '' }, { floor: 1 }, { x: Infinity }, { id: '' }]) assert.throws(() => parseDesign({ ...copy(initialDesign), rooms: [room(patch)] }));
});

test('edge assumptions survive a file round trip but remain user-entered', () => {
  const design = { ...copy(initialDesign), setbacks: [{ edge: 0, designation: 'Front', minimum: 5.5 }] };
  assert.deepEqual(parseDesign(design).setbacks, design.setbacks);
  for (const setbacks of [[{ edge: 4, designation: 'Front', minimum: 5 }], [{ edge: 0, designation: 'Front', minimum: -1 }], [{ edge: 0, designation: 'Approved', minimum: 5 }], [design.setbacks[0], design.setbacks[0]]]) assert.throws(() => parseDesign({ ...design, setbacks }));
});

test('project file preserves entered address and assumptions without accepting saved planning results', () => {
  const project = { format: 'jufaja-studio', version: 1, design: copy(initialDesign), address: { houseNumber: '12', roadName: 'Example', roadType: 'Street', suburb: 'Sydney', postCode: '2000' }, assumptions: { height: '8.5', fsr: '0.5', clearance: '3', reference: 'User-supplied brief' }, coordinates: { longitude: '151.2', latitude: '-33.8' }, site: { approved: true } };
  const parsed = parseProject(project);
  assert.deepEqual(parsed.address, project.address); assert.deepEqual(parsed.assumptions, project.assumptions);
  assert.equal(parsed.site, undefined); assert.equal(parsed.design.boundaryOrigin, 'manual');
  assert.throws(() => parseProject({ ...project, assumptions: { ...project.assumptions, fsr: 'unknown text' } }));
  assert.throws(() => parseProject({ ...project, address: { ...project.address, roadName: 'x'.repeat(101) } }));
  assert.throws(() => parseProject({ ...project, version: 99 }));
});

test('official coordinate rings convert into approximate metre geometry and reject unsafe input', () => {
  const ring = [[151.2, -33.8], [151.2002, -33.8], [151.2002, -33.8003], [151.2, -33.8003], [151.2, -33.8]];
  const local = ringToLocal(ring);
  assert.equal(local.length, 4); assert.equal(local[0].x, 0); assert.equal(local[0].y, 0);
  assert.ok(local[1].x > 18 && local[1].x < 19); assert.ok(local[2].y > 33 && local[2].y < 34);
  assert.throws(() => ringToLocal([[1, 1], [2, 1], [2, 2], [1, 1]]));
  assert.throws(() => ringToLocal([[151.2, -33.8], [NaN, -33.8], [151.3, -33.9], [151.2, -33.8]]));
});
