'use client';

import React, { useState } from 'react';
import { PackageListing } from '@/types';
import PackageCard from '@/components/packages/PackageCard';
import SuburbFilter from '@/components/packages/SuburbFilter';
import { KeyRound } from 'lucide-react';

interface Props {
  initialPackages: PackageListing[];
}

export default function PackagesMarketplaceClient({ initialPackages }: Props) {
  const [selectedSuburb, setSelectedSuburb] = useState<string>('all');
  const [packageType, setPackageType] = useState<'all' | 'house_and_land' | 'ready_built'>('all');

  const uniqueSuburbs = Array.from(new Set(initialPackages.map((p) => p.suburb)));

  const filtered = initialPackages.filter((pkg) => {
    if (selectedSuburb !== 'all' && pkg.suburb.toLowerCase() !== selectedSuburb.toLowerCase()) {
      return false;
    }
    if (packageType !== 'all' && pkg.packageType !== packageType) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {/* Category Toggles & Suburb Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="inline-flex p-1 bg-slate-200/80 rounded-lg">
          <button
            onClick={() => setPackageType('all')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              packageType === 'all' ? 'bg-brand-navy text-white shadow-sm' : 'text-slate-700 hover:text-brand-navy'
            }`}
          >
            All Listings ({initialPackages.length})
          </button>
          <button
            onClick={() => setPackageType('house_and_land')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              packageType === 'house_and_land' ? 'bg-brand-navy text-white shadow-sm' : 'text-slate-700 hover:text-brand-navy'
            }`}
          >
            House &amp; Land Packages
          </button>
          <button
            onClick={() => setPackageType('ready_built')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              packageType === 'ready_built' ? 'bg-brand-navy text-white shadow-sm' : 'text-slate-700 hover:text-brand-navy'
            }`}
          >
            Ready Built Homes
          </button>
        </div>

        <span className="text-xs font-bold text-slate-500">
          Showing <span className="text-brand-orange">{filtered.length}</span> active packages
        </span>
      </div>

      {/* Suburb Pills */}
      <SuburbFilter
        suburbs={uniqueSuburbs}
        selectedSuburb={selectedSuburb}
        onSelectSuburb={setSelectedSuburb}
      />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy">No Packages Currently in This Suburb</h3>
          <p className="text-sm text-slate-500 mt-1">
            New land releases are added weekly. Contact our team to join the VIP early access list for upcoming stages.
          </p>
          <button
            onClick={() => { setSelectedSuburb('all'); setPackageType('all'); }}
            className="mt-6 px-6 py-2.5 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange-hover"
          >
            View All Packages
          </button>
        </div>
      )}
    </div>
  );
}
