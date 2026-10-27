'use client';

import { useState } from 'react';
import { roomCorners, type Point, type StudioDesign } from '@/lib/design-studio';

const colours = ['#c5a059', '#86a995', '#b98f84', '#a3b5bc', '#c4b89d'];
export default function DesignPreview({ design, selected, onSelect }: { design: StudioDesign; selected: string; onSelect: (id: string) => void }) {
  const [mode, setMode] = useState<'plan' | '3d'>('3d');
  const [angle, setAngle] = useState(35);
  const [zoom, setZoom] = useState(1);
  const [floor, setFloor] = useState(-1);
  const [walls, setWalls] = useState(true);
  const minX = Math.min(...design.boundary.map(p => p.x), ...design.rooms.map(r => r.x));
  const maxX = Math.max(...design.boundary.map(p => p.x), ...design.rooms.map(r => r.x + r.width));
  const minY = Math.min(...design.boundary.map(p => p.y), ...design.rooms.map(r => r.y));
  const maxY = Math.max(...design.boundary.map(p => p.y), ...design.rooms.map(r => r.y + r.depth));
  const extent = Math.max(maxX - minX, maxY - minY, 10);
  const scale = 440 / extent * zoom;
  const radians = angle * Math.PI / 180;
  const project = (p: Point, z = 0) => {
    const x = p.x - (maxX + minX) / 2, y = p.y - (maxY + minY) / 2;
    return mode === 'plan' ? `${350 + x * scale},${260 + y * scale}` : `${350 + (x * Math.cos(radians) - y * Math.sin(radians)) * scale},${300 + (x * Math.sin(radians) + y * Math.cos(radians)) * scale * 0.48 - z * scale}`;
  };
  const effectiveFloor = floor >= design.floors ? -1 : floor;
  const visible = design.rooms.filter(r => effectiveFloor < 0 || r.floor === effectiveFloor).sort((a, b) => a.floor - b.floor || (a.x * Math.sin(radians) + a.y * Math.cos(radians)) - (b.x * Math.sin(radians) + b.y * Math.cos(radians)));
  return <section className="studio-preview" aria-label="Interactive design preview">
    <div className="studio-preview-toolbar">
      <div className="studio-switch"><button type="button" aria-pressed={mode === '3d'} onClick={() => setMode('3d')}>3D model</button><button type="button" aria-pressed={mode === 'plan'} onClick={() => setMode('plan')}>Floor plan</button></div>
      <label>Show floor<select aria-label="Show floor" value={effectiveFloor} onChange={e => setFloor(Number(e.target.value))}><option value={-1}>All floors</option>{Array.from({ length: design.floors }, (_, i) => <option key={i} value={i}>Floor {i + 1}</option>)}</select></label>
    </div>
    <svg viewBox="0 0 700 520" role="img" aria-label={`${mode === '3d' ? 'Rotatable three dimensional' : 'Top down'} concept showing ${design.rooms.length} rooms. Choose a room in the editor to change dimensions.`}>
      <defs><pattern id="studio-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e0e5de" strokeWidth="0.7" /></pattern></defs>
      <rect width="700" height="520" fill="#f1f3ed" /><rect width="700" height="520" fill="url(#studio-grid)" />
      <polygon points={design.boundary.map(p => project(p)).join(' ')} fill="#e1e7d9" stroke="#52715d" strokeWidth="2" strokeDasharray="7 5" />
      {visible.map(r => {
        const corners = roomCorners(r), z = mode === '3d' ? r.floor * design.storeyHeight : 0;
        const colour = colours[design.rooms.findIndex(room => room.id === r.id) % colours.length];
        const top = z + (walls ? design.storeyHeight : 0.15);
        return <g key={r.id} onClick={() => onSelect(r.id)} style={{ cursor: 'pointer' }}>
          <title>{`${r.name}, floor ${r.floor + 1}, ${r.width} by ${r.depth} metres`}</title>
          <polygon points={corners.map(p => project(p, z)).join(' ')} fill={colour} stroke={r.id === selected ? '#6b1d2f' : '#163024'} strokeWidth={r.id === selected ? 3 : 1.5} />
          {mode === '3d' && corners.map((p, i) => <polygon key={i} points={[project(p, z), project(corners[(i + 1) % 4], z), project(corners[(i + 1) % 4], top), project(p, top)].join(' ')} fill={i % 2 ? '#eee6d5' : '#faf8f5'} fillOpacity="0.8" stroke="#49604e" strokeWidth="1" />)}
          {mode === '3d' && <polygon points={corners.map(p => project(p, top)).join(' ')} fill={colour} fillOpacity={walls ? 0.2 : 0.8} stroke={r.id === selected ? '#6b1d2f' : '#49604e'} strokeWidth={r.id === selected ? 2.5 : 1} />}
          <text x={project({ x: r.x + r.width / 2, y: r.y + r.depth / 2 }, mode === '3d' ? top : 0).split(',')[0]} y={project({ x: r.x + r.width / 2, y: r.y + r.depth / 2 }, mode === '3d' ? top : 0).split(',')[1]} textAnchor="middle" fill="#163024" fontSize="12" paintOrder="stroke" stroke="#faf8f5" strokeWidth="3">{r.name.slice(0, 24)}</text>
        </g>;
      })}
      <text x="22" y="490" fontSize="12" fill="#52604f">{design.boundaryOrigin === 'manual' ? 'User-entered site boundary' : 'Spatial reference boundary • approximate'} · metres</text>
      <text x="22" y="510" fontSize="11" fill="#52604f">Concept only · walls shown without openings or structural detailing</text>
    </svg>
    <div className="studio-camera">
      <label>Rotate <input aria-label="Rotate 3D model" type="range" min="0" max="360" value={angle} disabled={mode !== '3d'} onChange={e => setAngle(Number(e.target.value))} /></label>
      <label>Zoom <input aria-label="Preview zoom" type="range" min="0.5" max="2" step="0.05" value={zoom} onChange={e => setZoom(Number(e.target.value))} /></label>
      <label className="studio-check"><input type="checkbox" checked={walls} onChange={e => setWalls(e.target.checked)} /> Full-height walls</label>
    </div>
    <p className="studio-note">Room blocks use editable dimensions. Roof allowance affects the height check but is not rendered. Stairs, doors, structure, services and terrain need a designer.</p>
  </section>;
}
