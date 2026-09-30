import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import SelectorDashboard from '@/components/home/SelectorDashboard';
import FeaturedGalleries from '@/components/home/FeaturedGalleries';
import DisplayLocationsStrip from '@/components/home/DisplayLocationsStrip';
import BrandDifference from '@/components/home/BrandDifference';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';

import rawDesigns from '@/data/designs.json';
import rawPackages from '@/data/packages.json';
import { HomeDesign, PackageListing } from '@/types';

export default function HomePage() {
  const designs = rawDesigns as HomeDesign[];
  const packages = rawPackages as PackageListing[];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Slideshow Banner */}
      <HeroSlider />

      {/* 2. Interactive "I'm looking for" Selector Dashboard */}
      <SelectorDashboard />

      {/* 3. Featured Designs & Packages Showcases */}
      <FeaturedGalleries 
        featuredDesigns={designs}
        featuredPackages={packages}
      />

      {/* 4. Display Homes Strip */}
      <DisplayLocationsStrip />

      {/* 5. The JUFAJA Difference */}
      <BrandDifference />

      {/* 6. Client Reviews */}
      <TestimonialsCarousel />
    </div>
  );
}
