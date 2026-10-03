import type { FilterState } from './filter-designs';
import type { DwellingType } from '@/types';

export function parseDesignFilters(params: Pick<URLSearchParams, 'get'>): FilterState {
  const category = params.get('dwelling_type');
  const sort = params.get('sort');
  const choice = (key: string, options: number[]): number | 'any' => {
    const value = params.get(key);
    return value !== null && options.includes(Number(value)) ? Number(value) : 'any';
  };
  return {
    dwellingType: ['single', 'double', 'duplex', 'granny', 'rural'].includes(category ?? '') ? category as DwellingType : 'all',
    bedrooms: choice('bedrooms', [3, 4, 5]), bathrooms: choice('bathrooms', [2, 3]), garages: choice('garages', [1, 2]),
    hasVirtualTour: false,
    sortBy: ['name', 'size-desc', 'size-asc', 'beds-desc'].includes(sort ?? '') ? sort as FilterState['sortBy'] : 'name',
  };
}
