import React from 'react';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import SelectorDashboard from '@/components/home/SelectorDashboard';
import FeaturedGalleries from '@/components/home/FeaturedGalleries';
import BrandDifference from '@/components/home/BrandDifference';
import SelectedProjects from '@/components/home/SelectedProjects';
import FounderStory from '@/components/home/FounderStory';
import DisplayLocationsStrip from '@/components/home/DisplayLocationsStrip';
import ContactPrompt from '@/components/home/ContactPrompt';
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* 0. Cinematic Website Opening Sequence (Plays once per session) */}
      <CinematicIntro />

      {/* 1. Cinematic full-width property slideshow */}
      <HeroSlideshow />

      {/* 2. Interactive "Find Your Perfect Home" Selector Dashboard */}
      <SelectorDashboard />

      {/* 3. Featured Designs & Turnkey Packages Showcase */}
      <FeaturedGalleries featuredDesigns={designs} />

      {/* 4. The JUFAJA Difference (Verified Standards & Hold Points) */}
      <BrandDifference />

      {/* 5. Selected Projects / Our Work Portfolio Showcase */}
      <SelectedProjects />

      {/* 6. Founder introduction */}
      <FounderStory />

      {/* 7. Display Homes & Consultation Hubs */}
      <DisplayLocationsStrip />

      {/* 8. Consultation prompt */}
      <ContactPrompt />
    </div>
  );
}
