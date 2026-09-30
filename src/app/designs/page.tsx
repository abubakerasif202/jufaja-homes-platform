import React, { Suspense } from 'react';
import DesignsCatalogueClient from './DesignsCatalogueClient';
import rawDesigns from '@/data/designs.json';
import { HomeDesign } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Designs Catalogue | 63 Master Plans | JUFAJA Homes',
  description: 'Browse our complete catalogue of 63 architecturally designed single storey, double storey, and duplex home designs across Sydney. Interactive floorplans and 3D tours.',
};

export default function DesignsPage() {
  const designs = rawDesigns as HomeDesign[];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Home &bull; Home Designs Catalogue
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            Master Home Designs
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
            Explore 63 precision-engineered residential plans crafted for modern Sydney living. Filter by dwelling type, bedroom count, and block size to find your ideal home.
          </p>
        </div>

        {/* Client-side Filter & Grid Wrapped in Suspense */}
        <Suspense fallback={
          <div className="py-20 text-center text-slate-500 font-medium">
            Loading design catalogue...
          </div>
        }>
          <DesignsCatalogueClient initialDesigns={designs} />
        </Suspense>

      </div>
    </div>
  );
}
