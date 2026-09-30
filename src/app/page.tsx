import React from 'react';
import HeroCinematic from '@/components/home/HeroCinematic';
import SelectorDashboard from '@/components/home/SelectorDashboard';
import FeaturedGalleries from '@/components/home/FeaturedGalleries';
import BrandDifference from '@/components/home/BrandDifference';
import SelectedProjects from '@/components/home/SelectedProjects';
import FounderStory from '@/components/home/FounderStory';
import DisplayLocationsStrip from '@/components/home/DisplayLocationsStrip';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import CinematicIntro from '@/components/motion/CinematicIntro';

import rawDesigns from '@/data/designs.json';
import rawPackages from '@/data/packages.json';
import { HomeDesign, PackageListing } from '@/types';

export default function HomePage() {
  const designs = rawDesigns as HomeDesign[];
  const packages = rawPackages as PackageListing[];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 0. Cinematic Website Opening Sequence (Plays once per session) */}
      <CinematicIntro />

      {/* 1. Light Cinematic Architectural Hero */}
      <HeroCinematic />

      {/* 2. Interactive "Find Your Perfect Home" Selector Dashboard */}
      <SelectorDashboard />

      {/* 3. Featured Designs & Turnkey Packages Showcase */}
      <FeaturedGalleries 
        featuredDesigns={designs}
        featuredPackages={packages}
      />

      {/* 4. The JUFAJA Difference (Verified Standards & Hold Points) */}
      <BrandDifference />

      {/* 5. Selected Projects / Our Work Portfolio Showcase */}
      <SelectedProjects />

      {/* 6. Founder & Leadership Story (Javed Iqbal, Civil Engineer) */}
      <FounderStory />

      {/* 7. Display Homes & Consultation Hubs */}
      <DisplayLocationsStrip />

      {/* 8. Client Reflections & Handover Standards */}
      <TestimonialsCarousel />
    </div>
  );
}
