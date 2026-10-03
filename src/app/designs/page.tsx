import PageHero from '@/components/ui/PageHero';
import React, { Suspense } from 'react';
import DesignsCatalogueClient from './DesignsCatalogueClient';
import { catalogueDesigns } from '@/lib/catalogue';
import { pageMetadata } from '@/lib/site-metadata';

export const metadata = pageMetadata('Home Design Catalogue', 'Browse JUFAJA Constructions home design listings. Listed images, plans, dimensions and specifications are indicative and should be confirmed directly.', '/designs');

export default function DesignsPage() {
  const designs = catalogueDesigns;

  return (
    <div className="min-h-screen bg-jufaja-cream">
      <PageHero image="/images/architecture/daylight-family-home.webp" tone="green">
        <p className="eyebrow">The design collection</p>
        <h1 className="type-h1 mt-4 text-jufaja-forest">Find your way home.</h1>
        <p className="type-lead mt-6 text-jufaja-muted">Compare the information shown for {designs.length} listed home designs. Images are illustrative and listed figures require confirmation; ask JUFAJA for current drawings and specifications.</p>
      </PageHero>
      <div className="catalogue-body py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Client-side Filter & Grid Wrapped in Suspense */}
        <Suspense fallback={
          <div className="py-20 text-center text-jufaja-muted font-medium">
            Loading design catalogue...
          </div>
        }>
          <DesignsCatalogueClient initialDesigns={designs} />
        </Suspense>

      </div>
    </div>
  );
}
