'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { HomeDesign, DwellingType } from '@/types';
import { filterDesigns, type FilterState } from '@/lib/filter-designs';
import { parseDesignFilters } from '@/lib/design-filter-params';
import FilterBar from '@/components/catalogue/FilterBar';
import DesignCard from '@/components/catalogue/DesignCard';
import { Home } from 'lucide-react';

interface Props {
  initialDesigns: HomeDesign[];
}

export default function DesignsCatalogueClient({ initialDesigns }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const categoryCounts = initialDesigns.reduce<Record<DwellingType | 'all', number>>((counts, design) => {
    counts.all += 1;
    counts[design.dwellingType] += 1;
    return counts;
  }, { all: 0, single: 0, double: 0, duplex: 0, granny: 0, rural: 0 });

  const filters = parseDesignFilters(searchParams);

  // Sync URL when filters change
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };

    startTransition(() => {
      const params = new URLSearchParams();
      if (updated.dwellingType && updated.dwellingType !== 'all') params.set('dwelling_type', updated.dwellingType);
      if (updated.bedrooms && updated.bedrooms !== 'any') params.set('bedrooms', String(updated.bedrooms));
      if (updated.bathrooms && updated.bathrooms !== 'any') params.set('bathrooms', String(updated.bathrooms));
      if (updated.garages && updated.garages !== 'any') params.set('garages', String(updated.garages));
      if (updated.sortBy && updated.sortBy !== 'name') params.set('sort', updated.sortBy);

      const queryString = params.toString();
      router.replace(`/designs${queryString ? `?${queryString}` : ''}`, { scroll: false });
    });
  };

  const handleReset = () => {
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
        totalDesigns={initialDesigns.length}
        categoryCounts={categoryCounts}
      />

      {/* Grid of Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-jufaja-border bg-white px-5 py-12 text-center sm:p-16">
          <div className="w-16 h-16 rounded-full bg-jufaja-stone text-jufaja-gold-600 flex items-center justify-center mx-auto mb-4">
            <Home aria-hidden="true" className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl text-jufaja-forest">No Matching Designs Found</h2>
          <p className="text-sm text-jufaja-muted mt-1 max-w-md mx-auto">
            Try adjusting your bedroom, bathroom, or dwelling type filters to explore more design references.
          </p>
          <button
            onClick={handleReset}
            className="btn btn-primary mt-6"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
