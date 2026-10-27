'use client';

import { useState } from 'react';
import type { PlanningSite } from '@/lib/planning/types';

export default function SiteMap({ site, disabled, onLocate }: { site: PlanningSite; disabled: boolean; onLocate: (longitude: number, latitude: number) => void }) {
  const points = site.parcels.flatMap(p => p.rings.flat()).concat([[site.location.longitude, site.location.latitude]]);
  const longitudes = points.map(p => p[0]), latitudes = points.map(p => p[1]);
  const west = Math.min(...longitudes), east = Math.max(...longitudes), south = Math.min(...latitudes), north = Math.max(...latitudes);
  const initialSpan = Math.max(east - west, (north - south) * 4 / 3, 0.002) * 1.35;
  const [view, setView] = useState({ x: (west + east) / 2, y: (south + north) / 2, zoom: 1 });
  const [failedUrl, setFailedUrl] = useState('');
  const width = initialSpan / view.zoom, height = width * 0.75;
  const bbox = [view.x - width / 2, view.y - height / 2, view.x + width / 2, view.y + height / 2];
  const mapUrl = `https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Base_Map/MapServer/export?${new URLSearchParams({ bbox: bbox.join(','), bboxSR: '4326', imageSR: '4326', size: '800,600', format: 'png32', f: 'image' })}`;
  const project = ([x, y]: number[]) => `${(x - bbox[0]) / width * 800},${(bbox[3] - y) / height * 600}`;
  const marker = project([site.location.longitude, site.location.latitude]).split(',');
  return <section className="studio-map" aria-label="NSW site location map">
    <svg viewBox="0 0 800 600" role="img" aria-label="Official NSW basemap with indicative returned lot boundaries in gold and lookup location in burgundy. Pan and zoom using the controls below.">
      <rect width="800" height="600" fill="#f1f3ed" />
      <image href={mapUrl} width="800" height="600" onError={() => setFailedUrl(mapUrl)} />
      {site.parcels.flatMap(p => p.rings.map((ring, i) => <polygon key={`${p.id}-${i}`} points={ring.map(project).join(' ')} fill="#c5a059" fillOpacity="0.12" stroke="#80622b" strokeWidth="3"><title>{`${p.label}: indicative cadastral boundary`}</title></polygon>))}
      <circle cx={marker[0]} cy={marker[1]} r="8" fill="#6b1d2f" stroke="white" strokeWidth="3" />
      <path d="M385 300h30M400 285v30" stroke="white" strokeWidth="5" /><path d="M385 300h30M400 285v30" stroke="#163024" strokeWidth="2" />
    </svg>
    {failedUrl === mapUrl && <p role="status" className="studio-note">The official basemap image is unavailable. Parcel outlines and the lookup point remain visible. Use the official Spatial Viewer to confirm map context.</p>}
    <div className="studio-map-controls"><button type="button" aria-label="Pan map north" onClick={() => setView(v => ({ ...v, y: v.y + height / 4 }))}>North ↑</button><button type="button" aria-label="Pan map west" onClick={() => setView(v => ({ ...v, x: v.x - width / 4 }))}>West ←</button><button type="button" aria-label="Pan map east" onClick={() => setView(v => ({ ...v, x: v.x + width / 4 }))}>East →</button><button type="button" aria-label="Pan map south" onClick={() => setView(v => ({ ...v, y: v.y - height / 4 }))}>South ↓</button><button type="button" aria-label="Zoom map in" disabled={view.zoom >= 8} onClick={() => setView(v => ({ ...v, zoom: Math.min(8, v.zoom * 2) }))}>Zoom +</button><button type="button" aria-label="Zoom map out" disabled={view.zoom <= 0.25} onClick={() => setView(v => ({ ...v, zoom: Math.max(0.25, v.zoom / 2) }))}>Zoom −</button><button type="button" disabled={disabled} onClick={() => onLocate(view.x, view.y)}>Look up map centre</button></div>
    <p className="studio-note">Pan to a site, then look up the centre crosshair. Gold outlines are indicative cadastral lots, not surveyed boundaries. Location {site.location.longitude.toFixed(6)}, {site.location.latitude.toFixed(6)}. Basemap © NSW Spatial Services; parcel data NSW Planning Portal.</p>
  </section>;
}
