export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  study: string;
}

export const JUFAJA_PROJECTS: ProjectShowcase[] = [
  {
    id: 'arden-grove',
    title: 'Courtyard Residence',
    category: 'Design concept',
    study: 'Courtyard planning',
    description: 'A residential design study exploring a private courtyard, natural light and the relationship between indoor and outdoor living.',
    image: '/images/architecture/daylight-family-home.webp',
  },
  {
    id: 'meridian-duplex',
    title: 'Paired Homes',
    category: 'Design concept',
    study: 'Dual occupancy',
    description: 'A concept study in two-home planning, with separate entries and a balanced shared street presence.',
    image: '/images/architecture/daylight-paired-homes.webp',
  },
  {
    id: 'ashbury-extension',
    title: 'Garden Pavilion',
    category: 'Design concept',
    study: 'Indoor–outdoor living',
    description: 'A concept study exploring a light-filled living area connected to a sheltered garden and outdoor entertaining space.',
    image: '/images/architecture/daylight-stone-residence.webp',
  },
  {
    id: 'verdant-kdrb',
    title: 'Contemporary Family Home',
    category: 'Design concept',
    study: 'Contemporary facade',
    description: 'A facade and massing study for a contemporary family home, using a restrained palette and clear connections to the garden.',
    image: '/images/architecture/daylight-cantilever-home.webp',
  }
];
