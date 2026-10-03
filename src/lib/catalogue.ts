import rawDesigns from '@/data/designs.json';
import type { FacadeOption, HomeDesign, DwellingType } from '@/types';

const single: FacadeOption = { name: 'Single-storey architecture inspiration', image: '/images/architecture/daylight-single-storey-home.webp' };
const double: FacadeOption = { name: 'Double-storey architecture inspiration', image: '/images/architecture/daylight-cantilever-home.webp' };
const paired: FacadeOption = { name: 'Paired-home architecture inspiration', image: '/images/architecture/daylight-paired-homes.webp' };
const imagery: Record<DwellingType, FacadeOption[]> = {
  single: [single], double: [double], duplex: [paired],
  granny: [{ ...single, name: 'Residential architecture inspiration' }],
  rural: [{ ...single, name: 'Single-storey architecture inspiration' }],
};

/** Publish only reference fields. Legacy prices, third-party drawings and unsupported features stay out of client props. */
export const catalogueDesigns: HomeDesign[] = (rawDesigns as HomeDesign[]).map(design => ({
  id: design.id, slug: design.slug, name: design.name, series: design.series,
  dwellingType: design.dwellingType, bedrooms: design.bedrooms, bathrooms: design.bathrooms,
  garages: design.garages, houseSizeSquares: design.houseSizeSquares,
  houseSizeSqm: design.houseSizeSqm, minLotWidth: design.minLotWidth,
  ...(design.minLotLength ? { minLotLength: design.minLotLength } : {}),
  description: '', features: [], facades: imagery[design.dwellingType],
  floorplans: [], virtualTourUrl: null, featured: design.featured,
}));
