import React, { Suspense } from 'react';
import DesignsCatalogueClient from './DesignsCatalogueClient';
import rawDesigns from '@/data/designs.json';
import { HomeDesign } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Design Catalogue',
  description: 'Browse JUFAJA Constructions home design listings. Listed images, plans, dimensions and specifications are indicative and should be confirmed directly.',
  alternates: { canonical: '/designs' },
};

export default function DesignsPage() {
  const designs = rawDesigns as HomeDesign[];

  return (
    <div className="min-h-screen bg-jufaja-cream py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="eyebrow mb-2">
            Home &bull; Home Designs Catalogue
          </div>
          <h1 className="type-h1 font-serif text-jufaja-forest">
            Home design catalogue
          </h1>
          <p className="type-lead mt-3 max-w-3xl text-jufaja-muted">
            Compare the information shown for {designs.length} listed home designs. Images are illustrative and listed figures require confirmation; ask JUFAJA for current drawings and specifications.
          </p>
        </div>

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
