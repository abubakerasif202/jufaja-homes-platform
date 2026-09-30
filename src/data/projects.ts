export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  highlights: string[];
}

export const JUFAJA_PROJECTS: ProjectShowcase[] = [
  {
    id: 'arden-grove',
    title: 'The Arden Grove Residence',
    category: 'Custom Home Build',
    location: 'Box Hill, NSW',
    description: 'A bespoke family residence oriented for northern light, with a sheltered central courtyard, warm natural masonry, and generous open-plan living.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Solar passive orientation', 'Natural sandstone masonry', 'Sheltered central courtyard', 'Butler’s pantry suite']
  },
  {
    id: 'meridian-duplex',
    title: 'The Meridian Duplex',
    category: 'Duplex & Dual Living',
    location: 'Leppington, NSW',
    description: 'A side-by-side architectural duplex designed for dual-family living, combining high spatial yield, acoustic privacy, and strong street presence.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    highlights: ['RW57 acoustic party wall', 'Dual utility metering', 'Independent double garages', 'Torrens Title subdivision']
  },
  {
    id: 'ashbury-extension',
    title: 'The Ashbury Residence',
    category: 'Custom Architecture',
    location: 'Prestons, NSW',
    description: 'A contemporary light-filled family residence combining soaring ceiling heights, warm ivory surfaces, and seamless floor-to-ceiling glass connections to alfresco entertaining.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Structural steel portal frames', 'Double-height ceiling voids', 'Seamless floor-to-ceiling glass', 'Bespoke architectural joinery']
  },
  {
    id: 'verdant-kdrb',
    title: 'The Verdant Knockdown Rebuild',
    category: 'Knockdown Rebuild',
    location: 'Camden, NSW',
    description: 'Replacing an outdated older dwelling with an energy-efficient modern sanctuary, retaining the established location, street trees, and community ties.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Fast-track 20-day CDC pathway', 'Demolition & site clearing management', '7-Star NatHERS thermal envelope', '$0 Land stamp duty saved']
  }
];
