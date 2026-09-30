'use client';

import React from 'react';
import { FilterState } from '@/lib/filter-designs';
import { DwellingType } from '@/types';
import { RotateCcw, Video, SlidersHorizontal } from 'lucide-react';

interface Props {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

const categories: { label: string; value: DwellingType | 'all'; count: number }[] = [
  { label: 'All Designs', value: 'all', count: 63 },
  { label: 'Single Storey', value: 'single', count: 23 },
  { label: 'Double Storey', value: 'double', count: 20 },
  { label: 'Duplexes & Dual Living', value: 'duplex', count: 9 },
  { label: 'Integrated Granny Flats', value: 'granny', count: 6 },
  { label: 'Rural & Acreage', value: 'rural', count: 5 },
];

export default function FilterBar({ filters, onFilterChange, onReset, totalResults }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
      
      {/* Top Header: Title, Count, Reset */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-brand-navy">
              Filter Master Catalogue
            </h2>
            <p className="text-xs text-slate-500">
              Showing <span className="font-bold text-brand-orange">{totalResults}</span> of 63 designs matching your criteria
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-orange transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Category Pills Row */}
      <div className="py-4 border-b border-slate-100 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = (filters.dwellingType || 'all') === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onFilterChange({ dwellingType: cat.value })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdown Filter Strip */}
      <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
        {/* Bedrooms */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Bedrooms
          </label>
          <select
            value={filters.bedrooms || 'any'}
            onChange={(e) => onFilterChange({ bedrooms: e.target.value === 'any' ? 'any' : Number(e.target.value) })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange text-slate-800"
          >
            <option value="any">Any Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Bathrooms
          </label>
          <select
            value={filters.bathrooms || 'any'}
            onChange={(e) => onFilterChange({ bathrooms: e.target.value === 'any' ? 'any' : Number(e.target.value) })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange text-slate-800"
          >
            <option value="any">Any Bathrooms</option>
            <option value="2">2+ Bathrooms</option>
            <option value="3">3+ Bathrooms</option>
          </select>
        </div>

        {/* Garages */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Garages
          </label>
          <select
            value={filters.garages || 'any'}
            onChange={(e) => onFilterChange({ garages: e.target.value === 'any' ? 'any' : Number(e.target.value) })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange text-slate-800"
          >
            <option value="any">Any Garages</option>
            <option value="1">1 Car Garage</option>
            <option value="2">2 Car Garage</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Sort Order
          </label>
          <select
            value={filters.sortBy || 'name'}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange text-slate-800"
          >
            <option value="name">Name (A-Z)</option>
            <option value="size-desc">Size: Largest First</option>
            <option value="size-asc">Size: Smallest First</option>
            <option value="beds-desc">Bedrooms: Most First</option>
          </select>
        </div>

        {/* 3D Virtual Tour Filter */}
        <div className="flex flex-col justify-end">
          <button
            onClick={() => onFilterChange({ hasVirtualTour: !filters.hasVirtualTour })}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              filters.hasVirtualTour
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>3D Tours Only</span>
          </button>
        </div>

      </div>

    </div>
  );
}
