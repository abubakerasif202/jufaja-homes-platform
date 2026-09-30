import React, { Suspense } from 'react';
import PackagesMarketplaceClient from './PackagesMarketplaceClient';
import rawPackages from '@/data/packages.json';
import { PackageListing } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House & Land Packages Sydney | Fixed Turnkey Prices | JUFAJA Homes',
  description: 'Discover turnkey house and land packages across Sydney growth corridors: Austral, Cobbitty, Tahmoor, Leppington, and Wilton. 100% fixed site costs and premium inclusions.',
};

export default function PackagesPage() {
  const packages = rawPackages as PackageListing[];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Home &bull; Packages Marketplace
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            House &amp; Land Packages
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
            Prime residential land paired with award-winning JUFAJA home designs. All packages include guaranteed fixed site costs, full landscaping, and turnkey move-in inclusions.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading packages...</div>}>
          <PackagesMarketplaceClient initialPackages={packages} />
        </Suspense>

      </div>
    </div>
  );
}
