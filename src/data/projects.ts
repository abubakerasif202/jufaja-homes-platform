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
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'meridian-duplex',
    title: 'Paired Homes',
    category: 'Design concept',
    study: 'Dual occupancy',
    description: 'A concept study in two-home planning, with separate entries and a balanced shared street presence.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'ashbury-extension',
    title: 'Garden Pavilion',
    category: 'Design concept',
    study: 'Indoor–outdoor living',
    description: 'A concept study exploring a light-filled living area connected to a sheltered garden and outdoor entertaining space.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'verdant-kdrb',
    title: 'Contemporary Family Home',
    category: 'Design concept',
    study: 'Contemporary facade',
    description: 'A facade and massing study for a contemporary family home, using a restrained palette and clear connections to the garden.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  }
];
