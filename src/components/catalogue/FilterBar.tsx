'use client';

import type { FilterState } from '@/lib/filter-designs';
import type { DwellingType } from '@/types';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';

interface Props {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
  totalDesigns: number;
  categoryCounts: Record<DwellingType | 'all', number>;
}

const categoryLabels: { label: string; value: DwellingType | 'all' }[] = [
  { label: 'All listings', value: 'all' },
  { label: 'Single storey', value: 'single' },
  { label: 'Double storey', value: 'double' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Granny flat', value: 'granny' },
  { label: 'Rural and acreage', value: 'rural' },
];

const selectClass = 'min-h-11 w-full rounded-sm border border-jufaja-border bg-white px-3 text-sm text-jufaja-forest-900 focus:border-jufaja-gold-600';
const labelClass = 'mb-1.5 block text-xs font-medium text-jufaja-muted';

export default function FilterBar({ filters, onFilterChange, onReset, totalResults, totalDesigns, categoryCounts }: Props) {
  return (
    <section aria-labelledby="design-filter-heading" className="mb-8 border border-jufaja-border bg-white p-4 shadow-jufaja-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jufaja-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-jufaja-forest-900 text-white"><SlidersHorizontal aria-hidden="true" className="h-4 w-4" /></div>
          <div>
            <h2 id="design-filter-heading" className="text-base font-semibold text-jufaja-forest">Filter designs</h2>
            <p aria-live="polite" className="text-xs text-jufaja-muted">Showing {totalResults} of {totalDesigns} listings</p>
          </div>
        </div>
        <button type="button" onClick={onReset} className="inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-sm font-medium text-jufaja-forest transition-colors hover:bg-jufaja-cream">
          <RotateCcw aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" /> Reset filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-jufaja-border py-4" aria-label="Filter by dwelling type">
        {categoryLabels.map(({ label, value }) => {
          const active = (filters.dwellingType || 'all') === value;
          return <button key={value} type="button" aria-pressed={active} onClick={() => onFilterChange({ dwellingType: value })} className={`inline-flex min-h-10 items-center gap-2 rounded-sm border px-3 text-xs font-medium transition-colors ${active ? 'border-jufaja-forest-900 bg-jufaja-forest-900 text-white' : 'border-jufaja-border bg-white text-jufaja-muted hover:border-jufaja-gold-500'}`}>
            {label} <span className={active ? 'text-jufaja-gold-400' : 'text-jufaja-muted'}>{categoryCounts[value]}</span>
          </button>;
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <div><label htmlFor="design-bedrooms" className={labelClass}>Bedrooms</label><select id="design-bedrooms" value={filters.bedrooms ?? 'any'} onChange={(event) => onFilterChange({ bedrooms: event.target.value === 'any' ? 'any' : Number(event.target.value) })} className={selectClass}><option value="any">Any</option><option value="3">3 or more</option><option value="4">4 or more</option><option value="5">5 or more</option></select></div>
        <div><label htmlFor="design-bathrooms" className={labelClass}>Bathrooms</label><select id="design-bathrooms" value={filters.bathrooms ?? 'any'} onChange={(event) => onFilterChange({ bathrooms: event.target.value === 'any' ? 'any' : Number(event.target.value) })} className={selectClass}><option value="any">Any</option><option value="2">2 or more</option><option value="3">3 or more</option></select></div>
        <div><label htmlFor="design-garages" className={labelClass}>Garage spaces</label><select id="design-garages" value={filters.garages ?? 'any'} onChange={(event) => onFilterChange({ garages: event.target.value === 'any' ? 'any' : Number(event.target.value) })} className={selectClass}><option value="any">Any</option><option value="1">1 space</option><option value="2">2 spaces</option></select></div>
        <div><label htmlFor="design-sort" className={labelClass}>Sort by</label><select id="design-sort" value={filters.sortBy ?? 'name'} onChange={(event) => onFilterChange({ sortBy: event.target.value as FilterState['sortBy'] })} className={selectClass}><option value="name">Name (A–Z)</option><option value="size-desc">Floor area (largest)</option><option value="size-asc">Floor area (smallest)</option><option value="beds-desc">Bedrooms (most)</option></select></div>
      </div>
    </section>
  );
}
