export interface HeroSlide {
  id: string;
  /** Short category label shown above the headline. */
  eyebrow: string;
  photo: string;
  alt: string;
  /** Headline broken into lines; the final line is set in the gold italic accent. */
  lines: string[];
  copy: string;
  cta: { label: string; href: string };
  /** object-position for narrow (portrait) and wide viewports so the subject stays in frame. */
  focusMobile: string;
  focusDesktop: string;
  /** Side the copy sits on from lg up, chosen so it never covers the slide's focal feature. */
  align?: 'left' | 'right';
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'new-home-designs',
    eyebrow: 'New home designs',
    photo: '/images/architecture/daylight-family-home.webp',
    alt: 'Illustrative daylight view of a contemporary stone and timber family home with a clear driveway',
    lines: ['Building Homes', 'for a Brighter', 'Tomorrow.'],
    copy: 'Explore considered homes designed for modern Australian living.',
    cta: { label: 'Explore Home Designs', href: '/designs' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
    align: 'left',
  },
  {
    id: 'luxury-bathrooms',
    eyebrow: 'Luxury bathroom inspiration',
    photo: '/images/inspiration/bath-green-vanity.webp',
    alt: 'Inspiration photograph of a bathroom with a forest-green double vanity, brass tapware, arched mirrors and a freestanding bath',
    lines: ['Beautiful Spaces.', 'Thoughtfully', 'Designed.'],
    copy: 'Stone, glass and soft natural light, gathered as ideas for your own brief.',
    cta: { label: 'Explore Design Inspiration', href: '/inspiration#luxury-bathrooms' },
    focusMobile: '35% 60%',
    focusDesktop: '50% 55%',
    align: 'left',
  },
  {
    id: 'knockdown-rebuild',
    eyebrow: 'Knockdown & rebuild',
    photo: '/images/architecture/daylight-sculptural-home.webp',
    alt: 'Illustrative daylight view of a sculptural stone home with a projecting white upper floor',
    lines: ['A New Beginning', 'at Your Existing', 'Address.'],
    copy: 'Explore the information available for replacing an existing home.',
    cta: { label: 'Explore Knockdown Rebuild', href: '/knockdown-rebuild' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
    align: 'right',
  },
  {
    id: 'duplex-dual-living',
    eyebrow: 'Duplex & dual living',
    photo: '/images/architecture/daylight-paired-homes.webp',
    alt: 'Illustrative daylight view of paired homes with clean stone facades and a central glazed entry',
    lines: ['More Possibilities.', 'Smarter', 'Living.'],
    copy: 'Contemporary duplex and dual living designs for sites that can support them.',
    cta: { label: 'Explore Duplex Designs', href: '/designs?dwelling_type=duplex' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
    align: 'left',
  },
  {
    id: 'custom-homes',
    eyebrow: 'Custom luxury homes',
    photo: '/images/architecture/daylight-cantilever-home.webp',
    alt: 'Illustrative daylight view of a cantilevered white home with glass balustrades and timber soffits',
    lines: ['A Home That’s', 'Uniquely', 'Yours.'],
    copy: 'Natural materials, glass, stone and timber, shaped around your site and priorities.',
    cta: { label: 'Explore Custom Homes', href: '/custom-homes' },
    focusMobile: '50% 45%',
    focusDesktop: '50% 45%',
    align: 'right',
  },
  {
    id: 'kitchens-interiors',
    eyebrow: 'Kitchens & interiors',
    photo: '/images/inspiration/kitchen-timber-island.webp',
    alt: 'Inspiration photograph of a modern kitchen with a timber-clad island, stone benchtop and tall timber pantry',
    lines: ['Inspiration', 'for Every', 'Space.'],
    copy: 'Kitchens, living spaces and finishes to bring to a conversation about your plans.',
    cta: { label: 'View Inspiration', href: '/inspiration#modern-kitchens' },
    focusMobile: '35% 50%',
    focusDesktop: '50% 55%',
    align: 'left',
  },
];
