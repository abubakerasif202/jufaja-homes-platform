'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HomeDesign, DwellingType } from '@/types';
import { filterDesigns, FilterState } from '@/lib/filter-designs';
import FilterBar from '@/components/catalogue/FilterBar';
import DesignCard from '@/components/catalogue/DesignCard';
import { Home, Layers, Video } from 'lucide-react';

interface Props {
  initialDesigns: HomeDesign[];
}

export default function DesignsCatalogueClient({ initialDesigns }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      dwellingType: (searchParams.get('dwelling_type') as DwellingType) || 'all',
      bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : 'any',
      bathrooms: searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : 'any',
      garages: searchParams.get('garages') ? Number(searchParams.get('garages')) : 'any',
      hasVirtualTour: searchParams.get('has_tour') === 'true',
      sortBy: (searchParams.get('sort') as any) || 'name',
    };
  });

  // Sync URL when filters change
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    startTransition(() => {
      const params = new URLSearchParams();
      if (updated.dwellingType && updated.dwellingType !== 'all') params.set('dwelling_type', updated.dwellingType);
      if (updated.bedrooms && updated.bedrooms !== 'any') params.set('bedrooms', String(updated.bedrooms));
      if (updated.bathrooms && updated.bathrooms !== 'any') params.set('bathrooms', String(updated.bathrooms));
      if (updated.garages && updated.garages !== 'any') params.set('garages', String(updated.garages));
      if (updated.hasVirtualTour) params.set('has_tour', 'true');
      if (updated.sortBy && updated.sortBy !== 'name') params.set('sort', updated.sortBy);

      const queryString = params.toString();
      router.replace(`/designs${queryString ? `?${queryString}` : ''}`, { scroll: false });
    });
  };

  const handleReset = () => {
    const resetState: FilterState = {
      dwellingType: 'all',
      bedrooms: 'any',
      bathrooms: 'any',
      garages: 'any',
      hasVirtualTour: false,
      sortBy: 'name',
    };
    setFilters(resetState);
    router.replace('/designs', { scroll: false });
  };

  const filtered = filterDesigns(initialDesigns, filters);

  return (
    <div>
      {/* Interactive Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        totalResults={filtered.length}
      />

      {/* Grid of Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy">No Matching Designs Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try adjusting your bedroom, bathroom, or dwelling type filters to view more plans from our master catalogue.
          </p>
          <button
            onClick={handleReset}
            className="mt-6 px-6 py-2.5 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange-hover transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
