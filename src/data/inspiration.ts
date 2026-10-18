/**
 * Design Inspiration galleries.
 * Interior and outdoor imagery is third-party photography used under the Unsplash License (free to use, no
 * attribution required; credited here for transparency). It is inspiration only and is never presented as
 * completed JUFAJA work. Facade categories reuse the catalogue's representative renderings and concept images.
 */

export interface InspirationPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  credit: { photographer: string; sourceUrl: string };
}

const photo = (id: string, title: string, alt: string, photographer: string, unsplashId: string): InspirationPhoto => ({
  id,
  src: `/images/inspiration/${id}.webp`,
  title,
  alt,
  credit: { photographer, sourceUrl: `https://unsplash.com/photos/${unsplashId}` },
});

export const INSPIRATION_PHOTOS: InspirationPhoto[] = [
  photo('bath-freestanding', 'Freestanding bath', 'Inspiration photograph of a stone freestanding bath beneath a wall-mounted tap in soft sunlight', 'Ela De Pure', 'JGfXR2a8RNg'),
  photo('bath-marble-shower', 'Marble-look shower', 'Inspiration photograph of a glass-enclosed walk-in shower with marble-look wall tiles and a niche', 'Smart Renovations', 'Ies-rhvusTs'),
  photo('bath-green-vanity', 'Green double vanity', 'Inspiration photograph of a forest-green double vanity with brass tapware and arched mirrors', 'Clay Banks', 'ZGUtbYmOGZE'),
  photo('bath-walk-in', 'Walk-in shower and vanity', 'Inspiration photograph of a bright bathroom with a glass shower screen and a long stone-look vanity', 'Lotus Design N Print', 'g51F6-WYzyU'),
  photo('bath-grey-tile', 'Large-format tile bathroom', 'Inspiration photograph of a bathroom with large grey tiles, a freestanding bath and a black rain shower', 'Seiso Mokoena', '41o2UJWlx6U'),
  photo('kitchen-timber-island', 'Timber-clad island', 'Inspiration photograph of a kitchen with a timber-clad island, stone benchtop and tall timber pantry', 'Clay Banks', 'XU_ODlSO9ac'),
  photo('kitchen-island-stools', 'Island with timber stools', 'Inspiration photograph of a kitchen with a long timber island, timber stools and full-height cabinetry', 'Caroline Badran', 'BaKdrhCvn0E'),
  photo('kitchen-marble-island', 'Stone island kitchen', 'Inspiration photograph of a kitchen with a dark stone island, round pendants and timber cabinetry', 'Brian Zajac', 'lE7pmNZZ3Fw'),
  photo('kitchen-garden-window', 'Garden-window kitchen', 'Inspiration photograph of a kitchen with a large picture window framing garden greenery', 'Cat Han', 'VgyN_CWXQVM'),
  photo('living-grey-sofa', 'Calm modular living room', 'Inspiration photograph of a calm living room with a modular grey sofa and sliding glass doors to the garden', 'Prydumano Design', 'vIbxvHj9m9g'),
  photo('living-glass-marble', 'Glass and marble living', 'Inspiration photograph of a living room with a marble feature wall, a corner glass wall and a soft sofa', 'Caroline Badran', '12WFO8yWrsw'),
  photo('living-open-plan', 'Open-plan living and dining', 'Inspiration photograph of an open-plan living and dining space with a grey sofa and a staircase beyond', 'Lotus Design N Print', 'wRzBarqn3hs'),
  photo('living-dining-kitchen', 'Living, dining and kitchen', 'Inspiration photograph of a timber kitchen and dining area with herringbone floors and soft pendant lights', 'Prydumano Design', 't0uOEEuAy1M'),
  photo('outdoor-pool-villa', 'Pool and alfresco terrace', 'Inspiration photograph of a modern white two-storey home with a pool, lawn and covered outdoor lounge', 'John Fornander', 'Id7u0EkTjBE'),
  photo('outdoor-terrace', 'Garden terrace', 'Inspiration photograph of a sunlit garden terrace with a built-in bench, a table and a large umbrella', 'Kristaps Ungurs', 'UQXMWJHusQs'),
  photo('outdoor-garden-stairs', 'Layered garden', 'Inspiration photograph of a lush layered garden with a floating timber stair and two lounge chairs', 'Chu CHU', 'V7aW6rWSPp4'),
];

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  tag: string;
  href: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  blurb: string;
  href: string;
  linkLabel: string;
  items: GalleryItem[];
}

const byId = new Map(INSPIRATION_PHOTOS.map((item) => [item.id, item]));

const enquiryHref = (subject: string) => `/contact?project=${encodeURIComponent(subject)}`;

function photoItems(ids: string[], subject: string): GalleryItem[] {
  return ids.map((id) => {
    const found = byId.get(id);
    if (!found) throw new Error(`Unknown inspiration photo: ${id}`);
    return { id, src: found.src, alt: found.alt, title: found.title, tag: 'Inspiration photograph', href: enquiryHref(`${subject}: ${found.title}`) };
  });
}

interface ConceptImage { id: string; src: string; title: string; alt: string }

const KNOCKDOWN_CONCEPTS: ConceptImage[] = [
  { id: 'kdr-family-home', src: '/images/architecture/daylight-family-home.webp', title: 'Stone and timber family home', alt: 'Illustrative concept of a contemporary stone and timber family home' },
  { id: 'kdr-sculptural', src: '/images/architecture/daylight-sculptural-home.webp', title: 'Sculptural stone residence', alt: 'Illustrative concept of a sculptural stone home with a projecting white upper floor' },
  { id: 'kdr-cantilever', src: '/images/architecture/daylight-cantilever-home.webp', title: 'Cantilevered contemporary home', alt: 'Illustrative concept of a cantilevered white home with glass balustrades' },
  { id: 'kdr-single-storey', src: '/images/architecture/daylight-single-storey-home.webp', title: 'Single-level family home', alt: 'Illustrative concept of a single-level Australian family home' },
  { id: 'kdr-stone-residence', src: '/images/architecture/daylight-stone-residence.webp', title: 'Stone residence with garden', alt: 'Illustrative concept of a stone residence with a landscaped garden' },
];

function conceptItems(images: ConceptImage[], href: string): GalleryItem[] {
  return images.map((image) => ({ ...image, tag: 'Illustrative concept', href }));
}

interface FacadeSource { slug: string; name: string; dwellingType: string; featured: boolean; facades: { image: string }[] }

/** Catalogue designs that have an approved representative exterior, featured first, for a given dwelling type. */
function facadeItems(designs: FacadeSource[], dwellingType: string, limit: number): GalleryItem[] {
  return designs
    .filter((design) => design.dwellingType === dwellingType && design.facades.length > 0)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit)
    .map((design) => ({
      id: design.slug,
      src: design.facades[0].image,
      alt: `${design.name}, illustrative representative exterior`,
      title: design.name,
      tag: 'Illustrative facade',
      href: `/designs/${design.slug}`,
    }));
}

export function buildGalleryCategories(designs: FacadeSource[]): GalleryCategory[] {
  return [
    { id: 'luxury-bathrooms', title: 'Luxury bathrooms', blurb: 'Stone, glass, timber and soft light, collected as ideas for your own brief.', href: enquiryHref('Luxury bathrooms'), linkLabel: 'Discuss a bathroom', items: photoItems(['bath-freestanding', 'bath-marble-shower', 'bath-green-vanity', 'bath-walk-in', 'bath-grey-tile'], 'Luxury bathrooms') },
    { id: 'modern-kitchens', title: 'Modern kitchens', blurb: 'Islands, natural timbers and stone benchtops for the heart of the home.', href: enquiryHref('Modern kitchens'), linkLabel: 'Discuss a kitchen', items: photoItems(['kitchen-timber-island', 'kitchen-island-stools', 'kitchen-marble-island', 'kitchen-garden-window'], 'Modern kitchens') },
    { id: 'contemporary-living', title: 'Contemporary living rooms', blurb: 'Calm, light-filled living and dining spaces that open to the garden.', href: enquiryHref('Contemporary living rooms'), linkLabel: 'Discuss living spaces', items: photoItems(['living-grey-sofa', 'living-glass-marble', 'living-open-plan', 'living-dining-kitchen'], 'Contemporary living rooms') },
    { id: 'new-home-facades', title: 'New home facades', blurb: 'Representative exteriors from the single storey home design collection.', href: '/designs?dwelling_type=single', linkLabel: 'View single storey designs', items: facadeItems(designs, 'single', 6) },
    { id: 'knockdown-rebuild-inspiration', title: 'Knockdown & rebuild inspiration', blurb: 'Concept studies for homes that replace an existing house on a familiar street.', href: '/knockdown-rebuild', linkLabel: 'Explore knockdown rebuild', items: conceptItems(KNOCKDOWN_CONCEPTS, '/knockdown-rebuild') },
    { id: 'double-storey-homes', title: 'Double storey homes', blurb: 'Representative exteriors from the double storey home design collection.', href: '/designs?dwelling_type=double', linkLabel: 'View double storey designs', items: facadeItems(designs, 'double', 6) },
    { id: 'duplex-dual-living', title: 'Duplex & dual living', blurb: 'Representative exteriors for duplex and dual living designs.', href: '/designs?dwelling_type=duplex', linkLabel: 'View duplex designs', items: facadeItems(designs, 'duplex', 6) },
    { id: 'outdoor-living', title: 'Outdoor living & landscaping', blurb: 'Terraces, pools and layered planting that extend the home outdoors.', href: enquiryHref('Outdoor living and landscaping'), linkLabel: 'Discuss outdoor living', items: photoItems(['outdoor-pool-villa', 'outdoor-terrace', 'outdoor-garden-stairs'], 'Outdoor living and landscaping') },
  ];
}
