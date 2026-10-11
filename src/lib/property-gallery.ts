import type { PropertyLocation } from '@/data/property-locations';

/** The only property fields permitted across the public client boundary. */
export type PublicPropertyLocation = Pick<PropertyLocation,
  'street' | 'suburb' | 'postcode' | 'photos' | 'fallbackImages' | 'imageMode' | 'displayNote' | 'photoCredit' | 'photoNote'
>;

export const propertyAddress = (property: PublicPropertyLocation) =>
  property.street + ', ' + property.suburb + ' NSW ' + property.postcode;

/** Reference imagery never supplements a real-photo gallery. */
export const propertyGalleryImages = (property: PublicPropertyLocation): readonly string[] =>
  property.imageMode === 'real' ? (property.photos ?? []) : (property.fallbackImages ?? []);
