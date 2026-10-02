export interface HeroSlide {
  id: string;
  /** Optimized local daylight concept image; all imagery is illustrative, not JUFAJA project photography. */
  photo: string;
  alt: string;
  /** Headline broken into lines; the final line is set in the gold italic accent. */
  lines: string[];
  copy: string;
  cta: { label: string; href: string };
  /** object-position for narrow (portrait) and wide viewports so the architecture stays in frame. */
  focusMobile: string;
  focusDesktop: string;
  /** Side the copy sits on from lg up, chosen so it never covers the slide's focal feature. */
  align?: 'left' | 'right';
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'garden-residence',
    photo: '/images/architecture/daylight-family-home.webp',
    alt: 'Illustrative daylight view of a contemporary stone and timber family home with a clear driveway',
    lines: ['Building Homes', 'for a Brighter', 'Tomorrow.'],
    copy: 'Explore considered homes designed for modern Australian living.',
    cta: { label: 'Explore Home Designs', href: '/designs' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
  },
  {
    id: 'pool-residence',
    photo: '/images/architecture/daylight-cantilever-home.webp',
    alt: 'Illustrative daylight view of a cantilevered white home with glass balustrades and timber soffits',
    lines: ['Homes Designed', 'Around You.'],
    copy: 'Share your site and priorities, and shape a home around them.',
    cta: { label: 'Custom Homes', href: '/custom-homes' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
  },
  {
    id: 'street-facade',
    photo: '/images/architecture/daylight-sculptural-home.webp',
    alt: 'Illustrative daylight view of a sculptural stone home with a projecting white upper floor',
    lines: ['Rebuild Where', 'You Already', 'Belong.'],
    copy: 'Explore the information available for replacing an existing home.',
    cta: { label: 'Knockdown Rebuild', href: '/knockdown-rebuild' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
    align: 'right',
  },
  {
    id: 'facade-detail',
    photo: '/images/architecture/daylight-paired-homes.webp',
    alt: 'Illustrative daylight view of paired homes with clean stone facades and a central glazed entry',
    lines: ['Explore the', 'JUFAJA', 'Collection.'],
    copy: 'A small collection of residential design studies for reference.',
    cta: { label: 'View Design Inspiration', href: '/projects' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
  },
];
