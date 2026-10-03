import CasaviewHome from '@/components/home/CasaviewHome';
import CinematicIntro from '@/components/motion/CinematicIntro';

import { catalogueDesigns } from '@/lib/catalogue';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JUFAJA Constructions | Home Designs & Building Enquiries',
  description: 'Explore JUFAJA Constructions home designs, custom home enquiries, knockdown rebuild information and house and land options.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const designs = catalogueDesigns;

  return (
    <>
      <CinematicIntro />
      <CasaviewHome designs={designs} />
    </>
  );
}
