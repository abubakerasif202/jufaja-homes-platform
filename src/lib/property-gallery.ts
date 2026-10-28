import featuredOrder from '@/data/property-gallery-order.json';
import type { PropertyLocation } from '@/data/property-locations';

/** The only property fields permitted across the public client boundary. */
export type PublicPropertyLocation = Pick<PropertyLocation,
  'street' | 'suburb' | 'postcode' | 'photos' | 'fallbackImages' | 'imageMode' | 'displayNote' | 'photoCredit' | 'photoNote'
>;

export const propertyAddress = (property: PublicPropertyLocation) =>
  property.street + ', ' + property.suburb + ' NSW ' + property.postcode;

/** Listing-photo credits do not establish republication rights. Withhold photographs pending documented licences. */
export const propertyGalleryImages = (property: PublicPropertyLocation): readonly string[] =>
  property.imageMode === 'real' ? [] : (property.fallbackImages ?? []);

/**
 * Editorial image-presentation order: stronger/high-resolution gallery covers first,
 * architectural references next, and smaller/historical listing imagery last.
 * This order is not a statement about building age, construction or completion.
 * Unknown future addresses retain their original relative order at the end.
 */
const curatedPositions = new Map<string, number>(
  featuredOrder.map((key, index) => [key, index]),
);

export function prioritizePropertyCards<T extends Pick<PropertyLocation, 'street' | 'suburb'>>(properties: readonly T[]): T[] {
  return properties
    .map((property, originalIndex) => ({ property, originalIndex }))
    .sort((a, b) => {
      const rankA = curatedPositions.get(a.property.street + '|' + a.property.suburb) ?? Number.MAX_SAFE_INTEGER;
      const rankB = curatedPositions.get(b.property.street + '|' + b.property.suburb) ?? Number.MAX_SAFE_INTEGER;
      return rankA - rankB || a.originalIndex - b.originalIndex;
    })
    .map(({ property }) => property);
}

/** Keep unlicensed listing photographs and private research outside the public payload. */
export function toPublicPropertyLocation(property: PropertyLocation): PublicPropertyLocation {
  return {
    street: property.street,
    suburb: property.suburb,
    postcode: property.postcode,
    imageMode: property.imageMode,
    ...(property.imageMode === 'representative'
      ? { fallbackImages: property.fallbackImages, displayNote: property.displayNote }
      : { photos: [], photoNote: 'Property photography is not currently available for publication.' }),
  };
}
