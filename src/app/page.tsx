import CasaviewHome from '@/components/home/CasaviewHome';
import CinematicIntro from '@/components/motion/CinematicIntro';

import { catalogueDesigns } from '@/lib/catalogue';
import { pageMetadata } from '@/lib/site-metadata';

export const metadata = {
  ...pageMetadata('Home Designs & Building Enquiries', 'Explore JUFAJA Constructions home designs, custom home enquiries, knockdown rebuild information and house and land options.', '/'),
  title: { absolute: 'JUFAJA Constructions | Home Designs & Building Enquiries' },
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
