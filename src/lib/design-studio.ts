export type Point = { x: number; y: number };
export type Room = Point & { id: string; name: string; width: number; depth: number; floor: number };
export type EdgeAssumption = { edge: number; designation: 'Front' | 'Side' | 'Rear'; minimum: number };
export type StudioDesign = {
  version: 1; title: string; projectType: 'New home' | 'Renovation' | 'Extension';
  boundary: Point[]; boundaryOrigin: 'manual' | 'spatial-reference';
  rooms: Room[]; storeyHeight: number; roofHeight: number; floors: number;
  setbacks?: EdgeAssumption[];
};
export const initialDesign: StudioDesign = {
  version: 1, title: 'My home concept', projectType: 'New home',
  boundary: [{ x: 0, y: 0 }, { x: 18, y: 0 }, { x: 18, y: 30 }, { x: 0, y: 30 }],
  boundaryOrigin: 'manual', floors: 1, storeyHeight: 2.7, roofHeight: 1.5,
  rooms: [
    { id: 'living', name: 'Living / kitchen', x: 4, y: 6, width: 7, depth: 6, floor: 0 },
    { id: 'bedroom', name: 'Bedroom', x: 4, y: 12, width: 4, depth: 4, floor: 0 },
    { id: 'bathroom', name: 'Bathroom', x: 8, y: 12, width: 3, depth: 4, floor: 0 },
  ],
};
export function polygonArea(points: Point[]) {
  return Math.abs(points.reduce((sum, p, i) => { const q = points[(i + 1) % points.length]; return sum + p.x * q.y - q.x * p.y; }, 0)) / 2;
}
const cross = (a: Point, b: Point, c: Point) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
export function pointOnSegment(p: Point, a: Point, b: Point) {
  return Math.abs(cross(a, b, p)) < 1e-7 && p.x >= Math.min(a.x, b.x) - 1e-7 && p.x <= Math.max(a.x, b.x) + 1e-7 && p.y >= Math.min(a.y, b.y) - 1e-7 && p.y <= Math.max(a.y, b.y) + 1e-7;
}
function intersect(a: Point, b: Point, c: Point, d: Point) {
  return cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0;
}
export function validBoundary(points: Point[]) {
  if (points.length < 3 || points.length > 100 || points.some(p => !Number.isFinite(p.x) || !Number.isFinite(p.y) || Math.abs(p.x) > 2000 || Math.abs(p.y) > 2000)) return false;
  if (polygonArea(points) < 1) return false;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    if (Math.hypot(a.x - b.x, a.y - b.y) < 0.01) return false;
    for (let j = i + 1; j < points.length; j++) {
      if (j === i + 1 || (i === 0 && j === points.length - 1)) continue;
      const c = points[j], d = points[(j + 1) % points.length];
      if (intersect(a, b, c, d) || pointOnSegment(a, c, d) || pointOnSegment(b, c, d) || pointOnSegment(c, a, b) || pointOnSegment(d, a, b)) return false;
    }
  }
  return true;
}
export function inPolygon(p: Point, points: Point[]) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if (pointOnSegment(p, a, b)) return true;
    if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}
export const roomCorners = (r: Room): Point[] => [{ x: r.x, y: r.y }, { x: r.x + r.width, y: r.y }, { x: r.x + r.width, y: r.y + r.depth }, { x: r.x, y: r.y + r.depth }];
export function roomInside(r: Room, boundary: Point[]) {
  const corners = roomCorners(r);
  if (!corners.every(p => inPolygon(p, boundary))) return false;
  return corners.every((a, i) => {
    const b = corners[(i + 1) % 4];
    if (boundary.some((c, j) => intersect(a, b, c, boundary[(j + 1) % boundary.length]))) return false;
    // A room edge can leave a concave lot through a vertex without a strict crossing.
    const points = [a, b, ...boundary.filter(p => pointOnSegment(p, a, b))]
      .sort((p, q) => Math.hypot(p.x - a.x, p.y - a.y) - Math.hypot(q.x - a.x, q.y - a.y));
    return points.slice(1).every((p, j) => inPolygon({ x: (p.x + points[j].x) / 2, y: (p.y + points[j].y) / 2 }, boundary));
  });
}
function pointDistance(p: Point, a: Point, b: Point) {
  const length = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  const t = length ? Math.max(0, Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / length)) : 0;
  return Math.hypot(p.x - a.x - t * (b.x - a.x), p.y - a.y - t * (b.y - a.y));
}
export function boundaryClearance(rooms: Room[], boundary: Point[]) {
  if (!rooms.length || !validBoundary(boundary)) return null;
  if (rooms.some(room => !roomInside(room, boundary))) return 0;
  let minimum = Infinity;
  for (const room of rooms) {
    const corners = roomCorners(room);
    for (let i = 0; i < corners.length; i++) for (let j = 0; j < boundary.length; j++) {
      const a = corners[i], b = corners[(i + 1) % corners.length], c = boundary[j], d = boundary[(j + 1) % boundary.length];
      minimum = Math.min(minimum, pointDistance(a, c, d), pointDistance(b, c, d), pointDistance(c, a, b), pointDistance(d, a, b));
    }
  }
  return minimum;
}
export function edgeClearance(rooms: Room[], boundary: Point[], edge: number) {
  if (!rooms.length || !validBoundary(boundary) || !Number.isInteger(edge) || edge < 0 || edge >= boundary.length) return null;
  if (rooms.some(room => !roomInside(room, boundary))) return 0;
  const a = boundary[edge], b = boundary[(edge + 1) % boundary.length];
  let minimum = Infinity;
  for (const room of rooms) {
    const corners = roomCorners(room);
    for (let i = 0; i < corners.length; i++) {
      const c = corners[i], d = corners[(i + 1) % corners.length];
      minimum = Math.min(minimum, pointDistance(a, c, d), pointDistance(b, c, d), pointDistance(c, a, b), pointDistance(d, a, b));
    }
  }
  return minimum;
}
export function unionArea(rooms: Room[]) {
  const xs = [...new Set(rooms.flatMap(r => [r.x, r.x + r.width]))].sort((a, b) => a - b);
  let area = 0;
  for (let i = 1; i < xs.length; i++) {
    const mid = (xs[i - 1] + xs[i]) / 2;
    const intervals = rooms.filter(r => r.x < mid && r.x + r.width > mid).map(r => [r.y, r.y + r.depth]).sort((a, b) => a[0] - b[0]);
    let end = -Infinity, length = 0;
    for (const [a, b] of intervals) { length += Math.max(0, b - Math.max(a, end)); end = Math.max(end, b); }
    area += (xs[i] - xs[i - 1]) * length;
  }
  return area;
}
export function designMetrics(design: StudioDesign) {
  const siteArea = polygonArea(design.boundary);
  const footprint = unionArea(design.rooms);
  const floorArea = Array.from({ length: design.floors }, (_, floor) => unionArea(design.rooms.filter(r => r.floor === floor))).reduce((a, b) => a + b, 0);
  return { siteArea, footprint, floorArea, coverage: 100 * footprint / siteArea, fsr: floorArea / siteArea, height: design.floors * design.storeyHeight + design.roofHeight };
}
export function geometryIssues(design: StudioDesign) {
  const issues: string[] = [];
  if (!validBoundary(design.boundary)) return ['The site boundary must be a simple, non-crossing polygon of at least 1 m².'];
  for (const room of design.rooms) {
    if (!room.name.trim()) issues.push('Every room needs a name before saving the concept.');
    if (!roomInside(room, design.boundary)) issues.push(`${room.name} extends outside the site boundary.`);
    for (const other of design.rooms) {
      if (room.id >= other.id || room.floor !== other.floor) continue;
      if (room.x < other.x + other.width && room.x + room.width > other.x && room.y < other.y + other.depth && room.y + room.depth > other.y) issues.push(`${room.name} overlaps ${other.name} on floor ${room.floor + 1}.`);
    }
  }
  if (!design.rooms.length) issues.push('Add at least one room to develop the concept.');
  for (let floor = 0; floor < design.floors; floor++) if (!design.rooms.some(r => r.floor === floor)) issues.push(`Floor ${floor + 1} has no rooms.`);
  return issues;
}
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === 'object' && !Array.isArray(value); }
const numberIn = (value: unknown, min: number, max: number): value is number => typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
export function parseDesign(value: unknown): StudioDesign {
  if (!record(value) || value.version !== 1 || typeof value.title !== 'string' || value.title.length > 120 || !['New home', 'Renovation', 'Extension'].includes(String(value.projectType)) || !numberIn(value.floors, 1, 3) || !Number.isInteger(value.floors) || !numberIn(value.storeyHeight, 2, 5) || !numberIn(value.roofHeight, 0, 5) || !Array.isArray(value.boundary) || !Array.isArray(value.rooms) || value.rooms.length > 60) throw new Error('This file is not a supported JUFAJA concept. Check the version and design values.');
  const boundary = value.boundary.map(p => { if (!record(p) || !numberIn(p.x, -2000, 2000) || !numberIn(p.y, -2000, 2000)) throw new Error('Invalid boundary coordinates.'); return { x: p.x, y: p.y }; });
  if (!validBoundary(boundary)) throw new Error('The imported boundary is invalid or crosses itself.');
  const ids = new Set<string>();
  const rooms = value.rooms.map(r => {
    if (!record(r) || typeof r.id !== 'string' || !r.id || r.id.length > 80 || ids.has(r.id) || typeof r.name !== 'string' || !r.name.trim() || r.name.length > 80 || !numberIn(r.x, -2000, 2000) || !numberIn(r.y, -2000, 2000) || !numberIn(r.width, 0.5, 100) || !numberIn(r.depth, 0.5, 100) || !numberIn(r.floor, 0, Number(value.floors) - 1) || !Number.isInteger(r.floor)) throw new Error('Invalid or duplicate room data.');
    ids.add(r.id); return { id: r.id, name: r.name, x: r.x, y: r.y, width: r.width, depth: r.depth, floor: r.floor };
  });
  if (value.setbacks !== undefined && (!Array.isArray(value.setbacks) || value.setbacks.length > boundary.length)) throw new Error('Invalid setback assumptions.');
  const edges = new Set<number>();
  const setbacks: EdgeAssumption[] = (value.setbacks ?? []).map((item: unknown) => {
    if (!record(item) || !numberIn(item.edge, 0, boundary.length - 1) || !Number.isInteger(item.edge) || edges.has(item.edge) || !['Front', 'Side', 'Rear'].includes(String(item.designation)) || !numberIn(item.minimum, 0, 100)) throw new Error('Invalid setback assumptions.');
    edges.add(item.edge); return { edge: item.edge, designation: item.designation as EdgeAssumption['designation'], minimum: item.minimum };
  });
  // Files are user-editable. Imported geometry never inherits authoritative provenance.
  return { version: 1, title: value.title, projectType: value.projectType as StudioDesign['projectType'], floors: value.floors, storeyHeight: value.storeyHeight, roofHeight: value.roofHeight, boundary, boundaryOrigin: 'manual', rooms, setbacks };
}
export type StudioProject = { format: 'jufaja-studio'; version: 1; design: StudioDesign; address: Record<'houseNumber' | 'roadName' | 'roadType' | 'suburb' | 'postCode', string>; assumptions: Record<'height' | 'fsr' | 'clearance' | 'reference', string>; coordinates: { longitude: string; latitude: string } };
export function parseProject(value: unknown): StudioProject {
  if (!record(value) || value.format !== 'jufaja-studio' || value.version !== 1 || !record(value.address) || !record(value.assumptions) || !record(value.coordinates)) throw new Error('This file is not a supported JUFAJA studio project.');
  const address = {} as StudioProject['address'];
  for (const key of ['houseNumber', 'roadName', 'roadType', 'suburb', 'postCode'] as const) {
    const field = value.address[key]; if (typeof field !== 'string' || field.length > 100) throw new Error('Invalid saved address.'); address[key] = field;
  }
  const assumptions = {} as StudioProject['assumptions'];
  for (const key of ['height', 'fsr', 'clearance', 'reference'] as const) {
    const field = value.assumptions[key]; if (typeof field !== 'string' || field.length > 400 || (key !== 'reference' && field !== '' && (!Number.isFinite(Number(field)) || Number(field) < 0 || Number(field) > 100))) throw new Error('Invalid saved assumptions.'); assumptions[key] = field;
  }
  const coordinates = { longitude: '', latitude: '' };
  for (const key of ['longitude', 'latitude'] as const) {
    const field = value.coordinates[key]; if (typeof field !== 'string' || field.length > 30 || (field !== '' && !Number.isFinite(Number(field)))) throw new Error('Invalid saved coordinates.'); coordinates[key] = field;
  }
  return { format: 'jufaja-studio', version: 1, design: parseDesign(value.design), address, assumptions, coordinates };
}
export function ringToLocal(ring: number[][]): Point[] {
  if (ring.length < 4 || ring.length > 3000 || ring.some(p => p.length < 2 || !p.every(Number.isFinite) || p[0] < 140.9 || p[0] > 154 || p[1] < -37.6 || p[1] > -28)) throw new Error('The parcel geometry is unavailable.');
  const lon = Math.min(...ring.map(p => p[0])), lat = Math.max(...ring.map(p => p[1]));
  const points = ring.map(([x, y]) => ({ x: (x - lon) * 111320 * Math.cos(lat * Math.PI / 180), y: (lat - y) * 111320 }));
  if (Math.hypot(points[0].x - points.at(-1)!.x, points[0].y - points.at(-1)!.y) < 0.01) points.pop();
  if (!validBoundary(points)) throw new Error('This parcel is too complex for the concept editor. Use a surveyed boundary.');
  return points;
}
