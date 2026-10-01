export interface HeroSlide {
  id: string;
  /** Unsplash photo id already used elsewhere on the site; all imagery is illustrative, not JUFAJA project photography. */
  photo: string;
  alt: string;
  /** Headline broken into lines; the final line is set in the gold italic accent. */
  lines: string[];
  copy: string;
  cta: { label: string; href: string };
  /** object-position for narrow (portrait) and wide viewports so the architecture stays in frame. */
  focusMobile: string;
  focusDesktop: string;
}

const unsplash = (photo: string) => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=2400&q=80`;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'garden-residence',
    photo: unsplash('photo-1600585154340-be6161a56a0c'),
    alt: 'Illustrative image of a contemporary two-storey home with timber and dark cladding, set in a garden under a large tree at dusk',
    lines: ['Building Homes', 'for a Brighter', 'Tomorrow.'],
    copy: 'Explore considered homes designed for modern Australian living.',
    cta: { label: 'Explore Home Designs', href: '/designs' },
    focusMobile: '70% 50%',
    focusDesktop: '50% 45%',
  },
  {
    id: 'pool-residence',
    photo: unsplash('photo-1600596542815-ffad4c1539a9'),
    alt: 'Illustrative image of a white contemporary home with glass balustrades beside a swimming pool',
    lines: ['Homes Designed', 'Around You.'],
    copy: 'Share your site and priorities, and shape a home around them.',
    cta: { label: 'Custom Homes', href: '/custom-homes' },
    focusMobile: '68% 50%',
    focusDesktop: '50% 40%',
  },
  {
    id: 'street-facade',
    photo: unsplash('photo-1600566753376-12c8ab7fb75b'),
    alt: 'Illustrative image of a timber and black-clad home facade at blue hour with a glowing timber stair behind glass',
    lines: ['Rebuild Where', 'You Already', 'Belong.'],
    copy: 'Explore the information available for replacing an existing home.',
    cta: { label: 'Knockdown Rebuild', href: '/knockdown-rebuild' },
    focusMobile: '55% 50%',
    focusDesktop: '50% 45%',
  },
  {
    id: 'facade-detail',
    photo: unsplash('photo-1600585154526-990dced4db0d'),
    alt: 'Illustrative close view of a dark panelled home facade with a warm timber entry',
    lines: ['Explore the', 'JUFAJA', 'Collection.'],
    copy: 'A small collection of residential design studies for reference.',
    cta: { label: 'View Design Inspiration', href: '/projects' },
    focusMobile: '30% 55%',
    focusDesktop: '50% 50%',
  },
];
