import featuredOrder from '@/data/property-gallery-order.json';
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
