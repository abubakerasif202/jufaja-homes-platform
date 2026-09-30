import { HomeDesign, DwellingType } from '@/types';

export interface FilterState {
  dwellingType?: DwellingType | 'all';
  bedrooms?: number | 'any';
  bathrooms?: number | 'any';
  garages?: number | 'any';
  minSquares?: number;
  maxSquares?: number;
  minLotWidth?: number;
  hasVirtualTour?: boolean;
  sortBy?: 'name' | 'size-desc' | 'size-asc' | 'beds-desc';
}

export function filterDesigns(designs: HomeDesign[], filters: FilterState): HomeDesign[] {
  return designs.filter((d) => {
    // 1. Dwelling Type
    if (filters.dwellingType && filters.dwellingType !== 'all' && d.dwellingType !== filters.dwellingType) {
      return false;
    }
    // 2. Bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const minBeds = Number(filters.bedrooms);
      if (d.bedrooms < minBeds) return false;
    }
    // 3. Bathrooms
    if (filters.bathrooms && filters.bathrooms !== 'any') {
      const minBaths = Number(filters.bathrooms);
      if (d.bathrooms < minBaths) return false;
    }
    // 4. Garages
    if (filters.garages && filters.garages !== 'any') {
      const reqGarages = Number(filters.garages);
      if (d.garages !== reqGarages) return false;
    }
    // 5. Min / Max Squares
    if (filters.minSquares && d.houseSizeSquares < filters.minSquares) {
      return false;
    }
    if (filters.maxSquares && d.houseSizeSquares > filters.maxSquares) {
      return false;
    }
    // 6. Min Lot Width
    if (filters.minLotWidth && d.minLotWidth > filters.minLotWidth) {
      return false;
    }
    // 7. Virtual Tour
    if (filters.hasVirtualTour && !d.virtualTourUrl) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'size-desc') return b.houseSizeSquares - a.houseSizeSquares;
    if (filters.sortBy === 'size-asc') return a.houseSizeSquares - b.houseSizeSquares;
    if (filters.sortBy === 'beds-desc') return b.bedrooms - a.bedrooms;
    return a.name.localeCompare(b.name);
  });
}
