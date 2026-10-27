import type { AddressResult, PlanningControl, PlanningSite, Parcel, Source } from './types';
import { planningReferences } from './references';

const ROOT = 'https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning';
const ADDRESS = 'https://mapsq.six.nsw.gov.au/services/public/Address_Location';
const endpoint = (service: string, layer: number) => `${ROOT}/Planning_Portal_${service}/MapServer/${layer}`;
type RecordValue = Record<string, unknown>;
interface Feature { attributes: RecordValue; geometry?: { rings: number[][][] } }
interface Layer { id: string; label: string; service: string; layer: number; fields: string[]; numeric?: string; unit?: string }
const layers: Layer[] = [
  { id: 'council', label: 'Local council', service: 'Administration', layer: 5, fields: ['COUNCILNAME', 'LGANAME'] },
  { id: 'lep', label: 'Local Environmental Plan', service: 'Principal_Planning', layer: 8, fields: ['EPI_NAME', 'LEGIS_REF_CLAUSE'] },
  { id: 'zoning', label: 'Land zoning', service: 'Principal_Planning', layer: 19, fields: ['SYM_CODE', 'LAY_CLASS', 'EPI_NAME', 'LEGIS_REF_AREA'] },
  { id: 'height', label: 'Mapped building height', service: 'Principal_Planning', layer: 14, fields: ['MAX_B_H', 'UNITS', 'EPI_NAME', 'LEGIS_REF_AREA', 'LEGIS_REF_CLAUSE'], numeric: 'MAX_B_H', unit: 'm' },
  { id: 'fsr', label: 'Mapped floor space ratio', service: 'Principal_Planning', layer: 11, fields: ['FSR', 'EPI_NAME', 'LEGIS_REF_AREA', 'LEGIS_REF_CLAUSE'], numeric: 'FSR', unit: ':1' },
  { id: 'heritage', label: 'LEP heritage', service: 'Principal_Planning', layer: 16, fields: ['H_NAME', 'H_ID', 'LAY_CLASS', 'SIG', 'EPI_NAME'] },
  { id: 'state-heritage', label: 'State heritage curtilage', service: 'Principal_Planning', layer: 221, fields: ['ITEMNAME', 'LISTING', 'LISTINGNO', 'TYPE'] },
  { id: 'bushfire', label: 'Bushfire prone land', service: 'Hazard', layer: 229, fields: ['d_Category', 'Category', 'd_Guidelin'] },
  { id: 'flood', label: 'Flood planning map', service: 'Hazard', layer: 230, fields: ['LAY_CLASS', 'EPI_NAME', 'COMMENT'] },
  { id: 'dcp', label: 'Council Development Control Plan', service: 'Development_Control', layer: 220, fields: ['PLAN_NAME', 'COUNCIL_NAME', 'COMMENCED_DATE', 'REPEALED_DATE'] },
  { id: 'acid-sulfate', label: 'Acid sulfate soils', service: 'Protection', layer: 234, fields: ['LAY_CLASS', 'EPI_NAME'] },
  { id: 'biodiversity', label: 'Terrestrial biodiversity', service: 'Protection', layer: 243, fields: ['LAY_CLASS', 'EPI_NAME'] },
];
const object = (v: unknown): v is RecordValue => !!v && typeof v === 'object' && !Array.isArray(v);
const str = (v: unknown) => typeof v === 'string' || typeof v === 'number' ? String(v).slice(0, 600) : '';
const source = (title: string, url: string, retrievedAt: string): Source => ({ title, url, retrievedAt });
export function validLocation(longitude: number, latitude: number) {
  return Number.isFinite(longitude) && Number.isFinite(latitude) && longitude >= 140.9 && longitude <= 154 && latitude >= -37.6 && latitude <= -28;
}

async function readJson(url: string): Promise<RecordValue> {
  const response = await fetch(url, { signal: AbortSignal.timeout(12_000), cache: 'no-store', redirect: 'error', headers: { Accept: 'application/json' } });
  if (!response.ok || !response.body) throw new Error('Official service unavailable');
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 2_000_000) { await reader.cancel(); throw new Error('Official response too large'); }
    chunks.push(value);
  }
  const data: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if (!object(data) || data.error) throw new Error('Official service returned an error');
  return data;
}

export async function lookupAddress(params: URLSearchParams): Promise<AddressResult> {
  const query = new URLSearchParams({ projection: 'EPSG:4326' });
  for (const key of ['houseNumber', 'roadName', 'roadType', 'suburb', 'postCode']) {
    const value = params.get(key)?.trim() || '';
    if (value.length > 100 || /[\u0000-\u001f]/.test(value)) throw new Error('Invalid address');
    if (value) query.set(key, value);
  }
  if (!query.get('roadName') || !(query.get('suburb') || query.get('postCode'))) throw new Error('Street name and suburb or postcode are required');
  const data = await readJson(`${ADDRESS}?${query}`);
  const result = data.addressResult;
  if (!object(result) || result.errMsg || !Array.isArray(result.addresses)) throw new Error('Address service unavailable');
  const notes = object(result.searchMethod) && Array.isArray(result.searchMethod.methodDescriptions)
    ? result.searchMethod.methodDescriptions.map(str).filter(Boolean) : [];
  const candidates = result.addresses.slice(0, 20).flatMap((row: unknown) => {
    if (!object(row) || !object(row.addressPoint)) return [];
    const longitude = Number(row.addressPoint.centreX), latitude = Number(row.addressPoint.centreY);
    if (!validLocation(longitude, latitude) || !row.shortAddressString) return [];
    return [{ id: str(row.objectId), label: str(row.shortAddressString), longitude, latitude, council: str(row.council), propertyId: str(row.propid), matchNotes: notes }];
  });
  return { candidates, warnings: ['Confirm the returned address: the official service can substitute nearby addresses or suburbs. Address locations and cadastral boundaries are indicative, not survey coordinates.'], source: source('NSW Spatial Services Address Location', 'https://maps.six.nsw.gov.au/sws/AddressLocation.html', new Date().toISOString()) };
}

async function queryFeatures(url: string, geometry: string, polygon: boolean, returnGeometry = false): Promise<Feature[]> {
  const params = new URLSearchParams({ f: 'json', geometry, geometryType: polygon ? 'esriGeometryPolygon' : 'esriGeometryPoint', inSR: '4326', outSR: '4326', spatialRel: 'esriSpatialRelIntersects', outFields: '*', returnGeometry: String(returnGeometry), resultRecordCount: '50' });
  const data = await readJson(`${url}/query?${params}`);
  if (!Array.isArray(data.features) || data.exceededTransferLimit || data.features.length > 50) throw new Error('Incomplete spatial response');
  if (!data.features.every((feature: unknown) => object(feature) && object(feature.attributes))) throw new Error('Invalid spatial response');
  return data.features as Feature[];
}
export function normaliseControl(layer: Layer, features: Feature[], retrievedAt: string): PlanningControl {
  const values = features.map(({ attributes: a }) => layer.fields.map(key => str(a[key])).filter(Boolean).join(' · ') || 'Mapped feature intersects the site');
  const control: PlanningControl = { id: layer.id, label: layer.label, status: features.length ? 'available' : 'not-mapped', values: [...new Set(values)], source: source(`NSW Planning Portal: ${layer.label}`, endpoint(layer.service, layer.layer), retrievedAt), notes: features.length ? 'Official mapped record, not a determination of development permission. Confirm current instrument, clauses, exceptions and applicability with council.' : 'No intersecting record returned from this layer. This does not establish that the site is unconstrained; coverage and currency must be checked.' };
  if (layer.id === 'dcp') {
    control.notes = 'LGA-based document index only. Records can include historical or repealed plans and chapters unrelated to this proposal. Council must confirm the current DCP, relevant chapters and amendments; a mapped document is not evidence of applicability.';
    control.documentLinks = features.flatMap(({ attributes }) => {
      if (typeof attributes.FILE_NAME !== 'string' || attributes.FILE_NAME.length > 4000) return [];
      try {
        const url = new URL(attributes.FILE_NAME);
        // Link only to official government documents. Preserve the complete path,
        // including escaped spaces; never reconstruct a URL from display text.
        if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.endsWith('.nsw.gov.au')) return [];
        return [{ title: str(attributes.PLAN_NAME) || 'Council DCP document', url: url.href, description: 'Document indexed by the NSW Planning Portal; confirm currency and applicable chapters with council.' }];
      } catch { return []; }
    });
  }
  if (layer.numeric && features.length) {
    const field = layer.numeric;
    const numbers = features.map(f => f.attributes[field]);
    const unambiguous = numbers.every(n => typeof n === 'number' && Number.isFinite(n) && n > 0) && new Set(numbers).size === 1;
    const qualified = features.some(f => Boolean(f.attributes.LEGIS_REF_AREA) || (layer.id === 'height' && !/^(m|metres|meters)$/i.test(str(f.attributes.UNITS))));
    if (unambiguous && !qualified) { control.numericValue = numbers[0] as number; control.unit = layer.unit; }
    else control.notes += ' No automatic numeric comparison: conflicting, qualified, non-metre or missing mapped values need professional interpretation.';
  }
  if (layer.id === 'flood') control.notes += ' This is not a complete flood-risk assessment. Obtain council flood information, levels and the planning certificate.';
  return control;
}
function validRings(value: unknown): value is number[][][] {
  return Array.isArray(value) && value.length > 0 && value.length <= 30 && value.every(r => Array.isArray(r) && r.length >= 4 && r.length <= 3000 && r.every(p => Array.isArray(p) && p.length >= 2 && validLocation(p[0], p[1])) && r[0][0] === r[r.length - 1][0] && r[0][1] === r[r.length - 1][1]);
}

export async function lookupSite(longitude: number, latitude: number): Promise<PlanningSite> {
  if (!validLocation(longitude, latitude)) throw new Error('Choose a location in NSW');
  const retrievedAt = new Date().toISOString();
  const warnings = ['Concept only. Council or certifier assessment and approval where required must precede construction. Obtain a survey, title/easements and a current section 10.7 planning certificate.', 'No complete Housing Code, DCP, BASIX, NatHERS or NCC compliance assessment is performed.'];
  let parcels: Parcel[] = [];
  try {
    const records = await queryFeatures(endpoint('Administration', 3), `${longitude},${latitude}`, false, true);
    if (records.length > 10 || !records.every(f => validRings(f.geometry?.rings))) throw new Error('Unsupported parcel geometry');
    parcels = records.map(f => ({ id: str(f.attributes.OBJECTID), label: [str(f.attributes.LOTNUMBER), str(f.attributes.SECTIONNUMBER), str(f.attributes.PLANLABEL)].filter(Boolean).join(' / '), rings: f.geometry!.rings, source: source('NSW Planning Portal cadastral lot', endpoint('Administration', 3), retrievedAt) }));
  } catch { warnings.push('Official parcel boundaries are unavailable. Retry later or consult the Spatial Viewer.'); }
  const geometry = JSON.stringify({ rings: parcels.flatMap(p => p.rings), spatialReference: { wkid: 4326 } });
  const canQuery = parcels.length > 0 && geometry.length <= 50_000;
  if (!canQuery) warnings.push('No usable lot boundary. Planning layers have not been treated as clear and no point-only substitute has been used.');
  const controls = await Promise.all(layers.map(async layer => {
    try {
      if (!canQuery) throw new Error('No parcel');
      return normaliseControl(layer, await queryFeatures(endpoint(layer.service, layer.layer), geometry, true), retrievedAt);
    } catch {
      return { id: layer.id, label: layer.label, status: 'unavailable' as const, values: [], source: source(`NSW Planning Portal: ${layer.label}`, endpoint(layer.service, layer.layer), retrievedAt), notes: 'The official layer could not be checked completely. No favourable conclusion can be drawn. Retry or obtain council advice.' };
    }
  }));
  const references = [...planningReferences];
  references.push(...(controls.find(c => c.id === 'dcp')?.documentLinks || []));
  if (controls.find(c => c.id === 'council')?.values.some(value => value.includes('COUNCIL OF THE CITY OF SYDNEY'))) references.push(
    { title: 'City of Sydney: local environmental plans', url: 'https://www.cityofsydney.nsw.gov.au/local-environmental-plans', description: 'Council guide to the different instruments within the City of Sydney. Check which instrument applies to the actual site.' },
    { title: 'City of Sydney: Sydney DCP 2012', url: 'https://www.cityofsydney.nsw.gov.au/development-control-plans/sydney-dcp-2012', description: 'Current council publication and amendments. Confirm site, development type, consent authority and relevant chapters before relying on any control.' },
  );
  for (const [id, label, notes, reference] of [
    ['setbacks', 'Setbacks', 'Check frontage, secondary roads, adjoining buildings, site slope, building height and the applicable LEP/DCP or Housing Code. Manual values are assumptions.', 1],
    ['coverage', 'Site coverage and landscaping', 'Definitions and limits depend on the applicable pathway and site. Building footprint is not legal site coverage, landscaping or gross floor area.', 1],
    ['pathway', 'Exempt / complying / DA pathway', 'Eligibility is undetermined. Land exclusions, development type and every applicable standard require assessment.', 3],
    ['basix', 'BASIX', 'Applicability and certificate not assessed. Complete the official assessment and attach the required certificate.', 4],
    ['nathers', 'NatHERS', 'No rating calculated. An accredited assessor must evaluate the actual design, orientation, materials, glazing and services.', 5],
    ['ncc', 'NCC', 'Not assessed. A qualified building professional must check the applicable edition, NSW variations and complete construction documentation.', 6],
  ] as const) controls.push({ id, label, status: 'requires-assessment', values: [], notes, source: source(planningReferences[reference].title, planningReferences[reference].url, retrievedAt) });
  return { location: { longitude, latitude }, retrievedAt, parcels, controls, warnings, references };
}
