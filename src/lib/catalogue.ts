import rawDesigns from '@/data/designs.json';
import designImages from '@/data/design-images.json';
import type { FacadeOption, HomeDesign, DwellingType } from '@/types';

interface DesignImageAssignment {
  slug: string;
  dwellingType: DwellingType;
  status: 'available' | 'pending';
  image?: { path: string };
}

const imageBySlug = new Map(
  (designImages as DesignImageAssignment[])
    .filter((assignment) => assignment.status === 'available' && assignment.image)
    .map((assignment) => [assignment.slug, assignment]),
);

function getDesignFacades(slug: string, dwellingType: DwellingType): FacadeOption[] {
  const assignment = imageBySlug.get(slug);
  if (!assignment?.image) return [];
  if (assignment.dwellingType !== dwellingType) {
    throw new Error(`Design image dwelling type does not match catalogue data for ${slug}`);
  }
  return [{ name: 'Representative exterior rendering', image: assignment.image.path }];
}

/** Publish only reference fields. Legacy prices, third-party drawings and unsupported features stay out of client props. */
export const catalogueDesigns: HomeDesign[] = (rawDesigns as HomeDesign[]).map(design => ({
  id: design.id, slug: design.slug, name: design.name, series: design.series,
  dwellingType: design.dwellingType, bedrooms: design.bedrooms, bathrooms: design.bathrooms,
  garages: design.garages, houseSizeSquares: design.houseSizeSquares,
  houseSizeSqm: design.houseSizeSqm, minLotWidth: design.minLotWidth,
  ...(design.minLotLength ? { minLotLength: design.minLotLength } : {}),
  description: '', features: [], facades: getDesignFacades(design.slug, design.dwellingType),
  floorplans: [], virtualTourUrl: null, featured: design.featured,
}));
