'use client';

import { useEffect, useRef, useState } from 'react';
import EnquiryForm from '@/components/contact/EnquiryForm';
import DesignPreview from './DesignPreview';
import SiteMap from './SiteMap';
import { boundaryClearance, designMetrics, edgeClearance, geometryIssues, initialDesign, parseDesign, parseProject, ringToLocal, validBoundary, type EdgeAssumption, type Room, type StudioDesign, type StudioProject } from '@/lib/design-studio';
import type { AddressCandidate, PlanningSite } from '@/lib/planning/types';
import { planningReferences } from '@/lib/planning/references';

const number = (n: number, digits = 1) => n.toLocaleString('en-AU', { maximumFractionDigits: digits });
function download(name: string, text: string, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function Numeric({ label, value, min, max, step = 0.1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (value: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  return <label>{label}<input type="number" value={draft ?? value} min={min} max={max} step={step} onFocus={() => setDraft(String(value))} onBlur={() => setDraft(null)} onChange={e => { setDraft(e.target.value); const n = e.target.valueAsNumber; if (Number.isFinite(n) && n >= min && n <= max) onChange(n); }} /></label>;
}

export default function DesignStudio() {
  const [design, setDesign] = useState<StudioDesign>(initialDesign);
  const [selected, setSelected] = useState(initialDesign.rooms[0].id);
  const [address, setAddress] = useState({ houseNumber: '', roadName: '', roadType: 'Street', suburb: '', postCode: '' });
  const [candidates, setCandidates] = useState<AddressCandidate[]>([]);
  const [chosen, setChosen] = useState<AddressCandidate | null>(null);
  const [site, setSite] = useState<PlanningSite | null>(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [boundaryText, setBoundaryText] = useState('0,0\n18,0\n18,30\n0,30');
  const [handoff, setHandoff] = useState('');
  const [manualHeight, setManualHeight] = useState('');
  const [manualFsr, setManualFsr] = useState('');
  const [manualClearance, setManualClearance] = useState('');
  const [manualReference, setManualReference] = useState('');
  const [coordinates, setCoordinates] = useState({ longitude: '', latitude: '' });
  const [referenceParcelId, setReferenceParcelId] = useState<string | null>(null);
  const [edgeToAdd, setEdgeToAdd] = useState(0);
  const controller = useRef<AbortController | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => () => controller.current?.abort(), []);
  const metrics = designMetrics(design);
  const issues = geometryIssues(design);
  const clearance = boundaryClearance(design.rooms, design.boundary);
  const active = design.rooms.find(r => r.id === selected);
  function updateRoom(patch: Partial<Room>) { setDesign(d => ({ ...d, rooms: d.rooms.map(r => r.id === selected ? { ...r, ...patch } : r) })); }
  function applyBoundary(boundary: StudioDesign['boundary'], boundaryOrigin: StudioDesign['boundaryOrigin']) {
    setDesign(d => ({ ...d, boundary, boundaryOrigin, setbacks: [] }));
    setEdgeToAdd(0);
    if (boundaryOrigin === 'manual') setReferenceParcelId(null);
    setBoundaryText(boundary.map(p => `${number(p.x, 3).replaceAll(',', '')},${number(p.y, 3).replaceAll(',', '')}`).join('\n'));
  }
  async function lookup(params: string, kind: 'address' | 'site') {
    controller.current?.abort(); const current = new AbortController(); controller.current = current;
    const timeout = window.setTimeout(() => current.abort(), 45000);
    setBusy(kind); setError(''); setNotice(''); setReferenceParcelId(null);
    try {
      const response = await fetch(`/api/planning/${kind}?${params}`, { signal: current.signal });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Planning information is temporarily unavailable.');
      if (controller.current !== current) return;
      if (kind === 'address') {
        if (!Array.isArray(data.candidates) || !Array.isArray(data.warnings)) throw new Error('The address response could not be read. Try again later.');
        setCandidates(data.candidates); setNotice(data.candidates.length ? data.warnings.join(' ') : 'No matching address was returned. Check the street type and suburb, or use map coordinates below.');
      } else {
        if (!Array.isArray(data.parcels) || !Array.isArray(data.controls) || !Array.isArray(data.warnings) || !Array.isArray(data.references)) throw new Error('The planning response could not be read. Try again later.');
        setSite(data);
      }
    } catch (reason) { if (controller.current === current) setError(current.signal.aborted ? 'The official service did not respond in time. Try again, or continue with a manually entered site.' : reason instanceof Error ? reason.message : 'Lookup failed. Please try again.'); }
    finally { window.clearTimeout(timeout); if (controller.current === current) { setBusy(''); controller.current = null; } }
  }
  function summary() {
    return [
      `JUFAJA CONCEPT — NOT APPROVED\n${design.title}\n${design.projectType}`,
      `Site: ${chosen?.label ?? 'Manual site; address not verified'}\nBoundary: ${design.boundaryOrigin}; approximate, not a survey.`,
      `Geometry / mapped site association: ${matchesMappedLot ? `Current geometry uses the single returned parcel ${referenceParcelId}. Numeric reference comparisons remain concept estimates.` : 'NOT MATCHED. The current geometry is not linked to a single parcel from this lookup. Mapped numeric comparisons are unavailable; the geometry and mapped controls may concern different sites.'}`,
      `Site area ${number(metrics.siteArea)} m²; room-block floor area ${number(metrics.floorArea)} m²; footprint ${number(metrics.footprint)} m²; model height ${number(metrics.height)} m; smallest model boundary clearance ${clearance === null ? 'unknown' : number(clearance) + ' m'}. These are concept estimates, not statutory GFA, coverage, setbacks or surveyed building height.`,
      design.rooms.map(r => `Floor ${r.floor + 1}: ${r.name}, ${r.width} × ${r.depth} m at ${r.x}, ${r.y} m`).join('\n'),
      `Geometry review: ${issues.length ? issues.join(' ') : 'No overlap/outside-boundary conflicts detected; not a compliance finding.'}`,
      `Manual assumptions: height ${manualHeight || 'unknown'} m; FSR ${manualFsr || 'unknown'}; boundary clearance ${manualClearance || 'unknown'} m. Reference: ${manualReference || 'none'}.`,
      ...(design.setbacks ?? []).map(s => { const distance = edgeClearance(design.rooms, design.boundary, s.edge); return `Edge ${s.edge + 1} (${s.designation}, user-designated): model clearance ${distance === null ? 'unknown' : number(distance) + ' m'}; user-entered minimum assumption ${s.minimum} m. Not a statutory setback finding.`; }),
      ...comparisons.map(c => `${c.name}: proposed ${number(c.proposed, 3)} ${c.unit}; ${c.limit === undefined ? 'limit not established' : `${c.proposed > c.limit ? 'exceeds' : 'at or below'} reference ${c.limit} ${c.unit}`}. ${c.source}; not a compliance finding.`),
      ...(site ? [`Planning location ${site.location.longitude}, ${site.location.latitude}; retrieved ${site.retrievedAt}`, ...site.controls.map(c => `${c.label}: ${c.status}; ${c.values.join(', ') || 'No value available'}. ${c.notes}\nSource: ${c.source.title}; retrieved ${c.source.retrievedAt}; ${c.source.url}`), ...site.warnings, ...site.references.map(r => `${r.title}: ${r.url}\n${r.description}`)] : ['Planning data has not been retrieved.', ...planningReferences.map(r => `${r.title}: ${r.url}`)]),
      'Spatial attribution: NSW Crown Copyright – Department of Planning and Environment. Confirm current source terms and currency.',
      'Council/certifier signoff required. LEP/DCP applicability, exempt/complying eligibility, setbacks, overlays, survey, BASIX, NatHERS and NCC need professional assessment. This is not an approval, certificate or construction drawing.',
    ].join('\n\n');
  }
  const matchesMappedLot = design.boundaryOrigin === 'spatial-reference' && site?.parcels.length === 1 && site.parcels[0].id === referenceParcelId;
  const heightControl = matchesMappedLot ? site?.controls.find(c => c.id === 'height' && c.status === 'available') : undefined;
  const fsrControl = matchesMappedLot ? site?.controls.find(c => c.id === 'fsr' && c.status === 'available') : undefined;
  const comparisons = [
    { name: 'Height', proposed: metrics.height, limit: heightControl?.numericValue, unit: 'm', source: 'Mapped height control' },
    { name: 'Floor-space ratio', proposed: metrics.fsr, limit: fsrControl?.numericValue, unit: ':1', source: 'Mapped FSR control' },
    ...(manualHeight !== '' ? [{ name: 'Manual height assumption', proposed: metrics.height, limit: Number(manualHeight), unit: 'm', source: 'User-entered, unverified' }] : []),
    ...(manualFsr !== '' ? [{ name: 'Manual FSR assumption', proposed: metrics.fsr, limit: Number(manualFsr), unit: ':1', source: 'User-entered, unverified' }] : []),
  ];
  return <div className="design-studio">
    <div className="studio-disclaimer"><strong>Concept design, not an approval.</strong> The initial rooms and site are editable example geometry. Official map data is a planning reference, not a survey or a determination. Council or certifier signoff is required.</div>
    <div className="studio-topline"><div><span className="eyebrow">Your working brief</span><label className="studio-title-label">Concept name<input value={design.title} maxLength={120} onChange={e => setDesign(d => ({ ...d, title: e.target.value }))} /></label></div><div className="studio-actions"><button onClick={() => { try { const project: StudioProject = { format: 'jufaja-studio', version: 1, design, address, assumptions: { height: manualHeight, fsr: manualFsr, clearance: manualClearance, reference: manualReference }, coordinates }; parseProject(project); download('jufaja-home-concept.json', JSON.stringify(project, null, 2)); setNotice('Design, entered address and assumptions downloaded. Keep the JSON file to reopen this concept. Official controls must be retrieved again after opening.'); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Check design values before saving.'); } }}>Save design</button><button onClick={() => fileRef.current?.click()}>Open design</button><input hidden ref={fileRef} type="file" accept=".json,application/json" onChange={async e => {
      const file = e.target.files?.[0]; e.target.value = ''; if (!file) return;
      try { if (file.size > 200000) throw new Error('Design files must be smaller than 200 KB.'); const value: unknown = JSON.parse(await file.text()); const project = value && typeof value === 'object' && 'format' in value ? parseProject(value) : null; const imported = project?.design ?? parseDesign(value); controller.current?.abort(); controller.current = null; setBusy(''); setDesign(imported); setSelected(imported.rooms[0]?.id ?? ''); setSite(null); setChosen(null); setCandidates([]); setReferenceParcelId(null); setHandoff(''); setManualHeight(project?.assumptions.height ?? ''); setManualFsr(project?.assumptions.fsr ?? ''); setManualClearance(project?.assumptions.clearance ?? ''); setManualReference(project?.assumptions.reference ?? ''); if (project) { setAddress(project.address); setCoordinates(project.coordinates); } setBoundaryText(imported.boundary.map(p => `${p.x},${p.y}`).join('\n')); setError(''); setNotice('Design opened. Its geometry and saved address are user-entered; look up the address again to retrieve current planning data.'); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to read this design.'); }
    }} /></div></div>
    {error && <p role="alert" className="studio-alert">{error}</p>}{notice && <p role="status" className="studio-notice">{notice}</p>}
    <div className="studio-layout"><div className="studio-controls">
      <details open className="studio-panel"><summary><span>01</span> Find your site</summary><div className="studio-panel-content">
        <p className="studio-note">Search the NSW address service, then select the matching address. Nothing is submitted to JUFAJA until you send an enquiry.</p>
        <form onSubmit={e => { e.preventDefault(); setCandidates([]); setSite(null); setChosen(null); void lookup(new URLSearchParams(address).toString(), 'address'); }}>
          <div className="studio-fields">{Object.entries({ houseNumber: 'Street number', roadName: 'Street name', roadType: 'Street type', suburb: 'Suburb', postCode: 'Postcode' }).map(([key, label]) => <label key={key}>{label}<input required={key !== 'postCode'} value={address[key as keyof typeof address]} maxLength={80} onChange={e => setAddress(a => ({ ...a, [key]: e.target.value }))} /></label>)}</div>
          <button className="studio-primary" disabled={!!busy}>{busy === 'address' ? 'Finding addresses…' : 'Find address'}</button>
        </form>
        <details className="studio-coordinate-entry"><summary>Locate by map coordinates</summary><p className="studio-note">Enter longitude and latitude from an official map. A coordinate is user-entered and does not verify an address or parcel ownership.</p><form onSubmit={e => { e.preventDefault(); const longitude = Number(coordinates.longitude), latitude = Number(coordinates.latitude); if (!coordinates.longitude || !coordinates.latitude || longitude < 140.9 || longitude > 154 || latitude < -37.6 || latitude > -28 || !Number.isFinite(longitude + latitude)) { setError('Enter valid longitude and latitude within NSW.'); return; } setChosen({ id: 'manual-location', label: `User-entered map point ${longitude}, ${latitude}`, longitude, latitude, council: '', propertyId: '', matchNotes: [] }); setSite(null); setCandidates([]); void lookup(new URLSearchParams({ longitude: String(longitude), latitude: String(latitude) }).toString(), 'site'); }}><div className="studio-fields"><label>Longitude<input type="number" step="any" min="140.9" max="154" required value={coordinates.longitude} onChange={e => setCoordinates(c => ({ ...c, longitude: e.target.value }))} /></label><label>Latitude<input type="number" step="any" min="-37.6" max="-28" required value={coordinates.latitude} onChange={e => setCoordinates(c => ({ ...c, latitude: e.target.value }))} /></label></div><button disabled={!!busy}>Load map location</button></form></details>
        {!!candidates.length && <div className="studio-candidates" aria-label="Matching addresses">{candidates.map(candidate => <button key={candidate.id} disabled={!!busy} onClick={() => { setChosen(candidate); setSite(null); void lookup(new URLSearchParams({ longitude: String(candidate.longitude), latitude: String(candidate.latitude) }).toString(), 'site'); }}>{candidate.label}<small>{candidate.council} {candidate.matchNotes.join(' ')}</small></button>)}</div>}
        {busy === 'site' && <p role="status">Retrieving parcel and mapped controls…</p>}
        {chosen && <p className="studio-note"><strong>Selected:</strong> {chosen.label}</p>}
        {chosen && <p><a href="https://www.planningportal.nsw.gov.au/spatialviewer/" target="_blank" rel="noopener noreferrer">Open official NSW Spatial Viewer</a><span className="studio-note"> · Find the selected address or map coordinates there to review the surrounding map and layers.</span></p>}
        {site && <><p className="studio-note">Choose the correct lot. Spatial boundaries are approximate and may not include your whole property.</p>{site.parcels.map(parcel => <button key={parcel.id} onClick={() => { try { if (parcel.rings.length !== 1) throw new Error('This lot contains multiple rings or holes. Use a surveyed boundary; it cannot be simplified safely.'); applyBoundary(ringToLocal(parcel.rings[0]), 'spatial-reference'); setReferenceParcelId(parcel.id); setError(''); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to use this boundary.'); } }}>Use {parcel.label} boundary</button>)}{site.parcels.length === 0 && <p>No parcel geometry returned. Enter a surveyed boundary below.</p>}</>}
      </div></details>
      <details className="studio-panel"><summary><span>02</span> Site boundary & dimensions</summary><div className="studio-panel-content">
        <p className="studio-note">Local coordinates in metres. X runs east/right and Y south/down for an imported parcel. Each line is one vertex: x,y. A closed, non-crossing boundary is required. Editing changes its provenance to user-entered.</p>
        <label>Boundary vertices<textarea rows={6} value={boundaryText} onChange={e => setBoundaryText(e.target.value)} /></label>
        <button onClick={() => { const points = boundaryText.trim().split('\n').map(line => { const parts = line.split(',').map(v => v.trim()); return parts.length === 2 && parts.every(Boolean) ? { x: Number(parts[0]), y: Number(parts[1]) } : { x: NaN, y: NaN }; }); if (!validBoundary(points)) { setError('Enter 3–100 valid x,y vertices without crossing edges; area must be at least 1 m².'); return; } applyBoundary(points, 'manual'); setError(''); }}>Apply boundary</button>
        <p className="studio-note">Current area: {number(metrics.siteArea)} m². {design.boundaryOrigin === 'manual' ? 'User-entered geometry.' : 'Approximate spatial reference geometry.'} No terrain, easements or surveyed levels included.</p>
        <label>Boundary edge to discuss<select value={Math.min(edgeToAdd, design.boundary.length - 1)} onChange={e => setEdgeToAdd(Number(e.target.value))}>{design.boundary.map((p, i) => <option key={i} value={i}>Edge {i + 1}: {number(p.x)}, {number(p.y)} → {number(design.boundary[(i + 1) % design.boundary.length].x)}, {number(design.boundary[(i + 1) % design.boundary.length].y)}</option>)}</select></label><button onClick={() => { const edge = Math.min(edgeToAdd, design.boundary.length - 1); setDesign(d => ({ ...d, setbacks: (d.setbacks ?? []).some(s => s.edge === edge) ? d.setbacks : [...(d.setbacks ?? []), { edge, designation: 'Side', minimum: 0 }] })); }}>Add edge assumption</button>
        {(design.setbacks ?? []).map(assumption => <div key={assumption.edge} className="studio-edge-assumption"><strong>Edge {assumption.edge + 1} · user-entered assumption</strong><div className="studio-fields"><label>Boundary designation<select value={assumption.designation} onChange={e => setDesign(d => ({ ...d, setbacks: (d.setbacks ?? []).map(s => s.edge === assumption.edge ? { ...s, designation: e.target.value as EdgeAssumption['designation'] } : s) }))}><option>Front</option><option>Side</option><option>Rear</option></select></label><Numeric label="Minimum clearance assumption (m)" min={0} max={100} value={assumption.minimum} onChange={minimum => setDesign(d => ({ ...d, setbacks: (d.setbacks ?? []).map(s => s.edge === assumption.edge ? { ...s, minimum } : s) }))} /></div><p className="studio-note">Model clearance: {edgeClearance(design.rooms, design.boundary, assumption.edge) === null ? 'unknown' : `${number(edgeClearance(design.rooms, design.boundary, assumption.edge)!)} m`}. {edgeClearance(design.rooms, design.boundary, assumption.edge) !== null && edgeClearance(design.rooms, design.boundary, assumption.edge)! < assumption.minimum ? 'Below your assumption.' : 'No statutory setback finding.'}</p><button onClick={() => setDesign(d => ({ ...d, setbacks: (d.setbacks ?? []).filter(s => s.edge !== assumption.edge) }))}>Remove edge {assumption.edge + 1} assumption</button></div>)}
      </div></details>
      <details open className="studio-panel"><summary><span>03</span> Shape your home</summary><div className="studio-panel-content">
        <div className="studio-fields"><label>Project type<select value={design.projectType} onChange={e => setDesign(d => ({ ...d, projectType: e.target.value as StudioDesign['projectType'] }))}><option>New home</option><option>Renovation</option><option>Extension</option></select></label><Numeric label="Storeys" value={design.floors} min={1} max={3} step={1} onChange={floors => { if (Number.isInteger(floors)) setDesign(d => ({ ...d, floors, rooms: d.rooms.map(r => ({ ...r, floor: Math.min(r.floor, floors - 1) })) })); }} /><Numeric label="Storey height (m)" value={design.storeyHeight} min={2} max={5} onChange={storeyHeight => setDesign(d => ({ ...d, storeyHeight }))} /><Numeric label="Roof allowance (m)" value={design.roofHeight} min={0} max={5} onChange={roofHeight => setDesign(d => ({ ...d, roofHeight }))} /></div>
        <p className="studio-note">For renovations/extensions, model all retained and proposed floor area. Existing structures are not inferred from an address.</p>
        <label>Selected room<select value={selected} onChange={e => setSelected(e.target.value)}>{design.rooms.map(r => <option key={r.id} value={r.id}>{r.name} · floor {r.floor + 1}</option>)}{!design.rooms.length && <option value="">No rooms</option>}</select></label>
        {active && <><label>Room name<input value={active.name} maxLength={80} onChange={e => updateRoom({ name: e.target.value })} /></label><div className="studio-fields"><Numeric label="Width (m)" value={active.width} min={0.5} max={100} onChange={width => updateRoom({ width })} /><Numeric label="Depth (m)" value={active.depth} min={0.5} max={100} onChange={depth => updateRoom({ depth })} /><Numeric label="X position (m)" value={active.x} min={-2000} max={2000} onChange={x => updateRoom({ x })} /><Numeric label="Y position (m)" value={active.y} min={-2000} max={2000} onChange={y => updateRoom({ y })} /><label>Room floor<select value={active.floor} onChange={e => updateRoom({ floor: Number(e.target.value) })}>{Array.from({ length: design.floors }, (_, i) => <option key={i} value={i}>Floor {i + 1}</option>)}</select></label></div><button onClick={() => { const rooms = design.rooms.filter(r => r.id !== selected); setDesign(d => ({ ...d, rooms })); setSelected(rooms[0]?.id ?? ''); }}>Remove selected room</button></>}
        <button disabled={design.rooms.length >= 60} onClick={() => { const room: Room = { id: crypto.randomUUID(), name: `Room ${design.rooms.length + 1}`, x: 2, y: 2, width: 4, depth: 4, floor: 0 }; setDesign(d => ({ ...d, rooms: [...d.rooms, room] })); setSelected(room.id); }}>+ Add room</button>
      </div></details>
    </div><div className="studio-canvas-column">{site && <SiteMap key={`${site.location.longitude},${site.location.latitude}`} site={site} disabled={!!busy} onLocate={(longitude, latitude) => { setChosen({ id: 'manual-location', label: `User-entered map point ${longitude.toFixed(6)}, ${latitude.toFixed(6)}`, longitude, latitude, council: '', propertyId: '', matchNotes: [] }); setSite(null); void lookup(new URLSearchParams({ longitude: String(longitude), latitude: String(latitude) }).toString(), 'site'); }} />}<DesignPreview design={design} selected={selected} onSelect={setSelected} />
      <div className="studio-metrics"><div><strong>{number(metrics.siteArea)}</strong><span>Site m²</span></div><div><strong>{number(metrics.floorArea)}</strong><span>Room area m²</span></div><div><strong>{number(metrics.height)}</strong><span>Model height m</span></div><div><strong>{number(metrics.coverage)}%</strong><span>Footprint / site</span></div></div>
      <div className="studio-note studio-metric-note">Approximate room-block areas, without wall thickness, balconies, voids or statutory exclusions. FSR estimate {number(metrics.fsr, 3)}:1. Building height is measured here from a flat datum, not surveyed ground levels.</div>
      <section className="studio-panel studio-review"><h2>Geometry review</h2>{issues.length ? <ul>{issues.map((issue, i) => <li key={`${i}-${issue}`}>{issue}</li>)}</ul> : <p>No room overlaps or boundary crossings detected. This does not establish compliance or structural feasibility.</p>}</section>
    </div></div>
    <section className="studio-report" id="planning-report"><pre className="studio-print-summary">{summary()}</pre><div className="studio-section-heading"><div><p className="eyebrow">04 / Review the evidence</p><h2>Planning controls & open questions</h2></div><span className="studio-badge">Professional assessment required</span></div>
      <p>Controls below come from official spatial services when available. Map intersections do not determine which development pathway applies. A missing map feature is not a clearance.</p>
      {site && !matchesMappedLot && <p className="studio-notice">Mapped numeric comparisons are unavailable until you use the single returned parcel boundary for this lookup. A manually edited boundary or ambiguous multi-lot location cannot be matched reliably to mapped limits.</p>}
      <div className="studio-comparisons">{comparisons.map(check => <article key={check.name}><h3>{check.name}</h3><p>Concept: {number(check.proposed, 3)} {check.unit}</p><strong>{check.limit === undefined ? 'Limit not established' : `${check.proposed > check.limit ? 'Exceeds reference value' : 'At or below reference value'}: ${number(check.limit, 3)} ${check.unit}`}</strong><p>{check.source}. This numeric comparison is not a compliance result.</p></article>)}</div>
      {manualClearance !== '' && <p className="studio-notice"><strong>Manual minimum boundary-clearance assumption:</strong> {clearance === null ? 'Add rooms to measure a clearance.' : `${number(clearance)} m in this model; ${clearance < Number(manualClearance) ? 'below' : 'at or above'} your ${manualClearance} m assumption.`} This compares all model boundary edges. It does not determine statutory front, side or rear setbacks, projections, fire separation or survey distances.</p>}
      <details className="studio-panel"><summary>Manual assumptions for your designer</summary><div className="studio-panel-content"><p className="studio-note">Enter only values you want to discuss. These remain unverified and never replace mapped controls. Setbacks vary by boundary, wall height, road frontage and pathway; no generic Sydney setback is assumed.</p><div className="studio-fields">{[{ label: 'Height assumption (m)', value: manualHeight, set: setManualHeight }, { label: 'FSR assumption', value: manualFsr, set: setManualFsr }, { label: 'Boundary clearance to discuss (m)', value: manualClearance, set: setManualClearance }].map(item => <label key={item.label}>{item.label}<input type="number" min="0" max="100" step="0.1" value={item.value} onChange={e => { if (e.target.value === '' || (e.target.valueAsNumber >= 0 && e.target.valueAsNumber <= 100)) item.set(e.target.value); }} /></label>)}</div><label>Document / clause / boundary notes<input maxLength={400} value={manualReference} onChange={e => setManualReference(e.target.value)} /></label></div></details>
      {!site && <p className="studio-notice">No official controls loaded. Find and select an address to retrieve mapped site information.</p>}
      {!site && <div className="studio-references">{planningReferences.map(reference => <p key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.title}</a> — {reference.description}</p>)}</div>}
      {site && <><p className="studio-note">Retrieved {site.retrievedAt}. The current design boundary {design.boundaryOrigin === 'manual' ? 'is manually entered and may differ from the selected lot' : 'is an approximate imported parcel'}.</p><div className="studio-control-grid">{site.controls.map(control => <article key={control.id}><div className="studio-control-heading"><h3>{control.label}</h3><span>{control.status.replaceAll('-', ' ')}</span></div><p>{control.values.join(' · ') || 'No verified value available'}</p><p className="studio-note">{control.notes}</p><a href={control.source.url} target="_blank" rel="noopener noreferrer">{control.source.title}</a><small>Retrieved {control.source.retrievedAt}</small></article>)}</div>{site.warnings.map((warning, i) => <p className="studio-notice" key={i}>{warning}</p>)}<div className="studio-references">{site.references.map(reference => <p key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.title}</a> — {reference.description}</p>)}</div></>}
      <div className="studio-assessment"><h3>Before a design can be approved</h3><p>Confirm the current LEP and DCP, zone permissibility, title restrictions, survey, front/side/rear setbacks, landscaped area, site coverage and every overlay. A qualified practitioner must determine exempt or complying development eligibility, or the development application pathway. BASIX and NatHERS require their applicable assessment tools; NCC structural, fire safety, access, health and energy requirements need project-specific documentation. This editor does not issue certificates or approval.</p></div>
      <p className="studio-note">Spatial attribution: NSW Crown Copyright – Department of Planning and Environment. Data is subject to source terms and currency. Save the report to keep source links and retrieval times with your concept.</p>
      <div className="studio-actions"><button onClick={() => download('jufaja-planning-concept-report.txt', summary(), 'text/plain;charset=utf-8')}>Download report</button><button onClick={() => window.print()}>Print / save PDF</button><button className="studio-primary" onClick={() => { setHandoff(summary().slice(0, 3400) + '\n\nI would like a design consultation. Full concept/report available on request.'); }}>Discuss this concept</button></div>
    </section>
    {handoff && <section className="studio-handoff"><p className="eyebrow">05 / Talk to JUFAJA</p><h2>Send your concept brief</h2><p>This form contains a snapshot of the design when you selected “Discuss this concept”. Download the full design and report for your records. No quote or approval is generated automatically.</p><EnquiryForm key={handoff} context={{ enquiryType: 'Custom home', target: 'Interactive home concept' }} initialMessage={handoff} /></section>}
  </div>;
}
