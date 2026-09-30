'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeDesign, PackageListing } from '@/types';
import { Bed, Bath, Car, ArrowRight, Video, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatSquares } from '@/lib/utils';

interface Props {
  featuredDesigns: HomeDesign[];
  featuredPackages: PackageListing[];
}

export default function FeaturedGalleries({ featuredDesigns, featuredPackages }: Props) {
  const [activeTab, setActiveTab] = useState<'designs' | 'packages'>('designs');

  const triggerEnquiry = (name: string) => {
    window.dispatchEvent(new CustomEvent('open-enquiry-drawer', { detail: { context: name } }));
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-black tracking-widest text-brand-orange uppercase">
              CURATED SELECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">
              Explore Featured Living
            </h2>
          </div>

          {/* Tab Buttons */}
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setActiveTab('designs')}
              className={`px-5 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === 'designs'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-700 hover:text-brand-navy'
              }`}
            >
              Featured Home Designs
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-5 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === 'packages'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-700 hover:text-brand-navy'
              }`}
            >
              House &amp; Land Packages
            </button>
          </div>
        </div>

        {/* Tab 1: Home Designs Grid */}
        {activeTab === 'designs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDesigns.slice(0, 6).map((design) => (
              <div
                key={design.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={design.facades[0]?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                    alt={design.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Square Size Badge */}
                  <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-black px-3 py-1 rounded-full shadow">
                    {formatSquares(design.houseSizeSquares)}
                  </div>

                  {/* 3D Tour Badge */}
                  {design.virtualTourUrl && (
                    <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
                      <Video className="w-3.5 h-3.5" />
                      <span>3D TOUR</span>
                    </div>
                  )}

                  {/* Dwelling Type */}
                  <div className="absolute bottom-3 left-4 text-white text-xs font-bold uppercase tracking-wider">
                    {design.dwellingType.replace('single', 'Single Storey').replace('double', 'Double Storey').replace('duplex', 'Duplex')}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                      {design.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {design.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-slate-100 text-slate-700 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-brand-orange" />
                        <span>{design.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-brand-orange" />
                        <span>{design.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-brand-orange" />
                        <span>{design.garages} Car</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href={`/designs/${design.slug}`}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-brand-navy hover:bg-brand-surface text-white text-xs font-bold text-center tracking-wide uppercase transition-colors"
                    >
                      View Floorplan
                    </Link>
                    <button
                      onClick={() => triggerEnquiry(design.name)}
                      className="py-2.5 px-4 rounded-lg border border-slate-300 hover:border-brand-orange hover:text-brand-orange text-slate-700 text-xs font-bold uppercase transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Packages Grid */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.slice(0, 6).map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.facadeImage}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {pkg.status}
                  </div>

                  {/* Suburb Badge */}
                  <div className="absolute top-4 right-4 bg-brand-navy/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                    {pkg.suburb}
                  </div>

                  {/* Price Banner */}
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-xs text-slate-200 font-semibold block">Fixed Turnkey Package</span>
                    <span className="text-2xl font-black">{formatCurrency(pkg.price)}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {pkg.designName} &bull; Lot: {pkg.lotSizeSqm} m²
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-100 text-slate-700 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-brand-orange" />
                        <span>{pkg.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-brand-orange" />
                        <span>{pkg.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-brand-orange" />
                        <span>{pkg.garages} Car</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>100% Fixed Site Costs Included</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-brand-navy hover:bg-brand-surface text-white text-xs font-bold text-center tracking-wide uppercase transition-colors"
                    >
                      Package Details
                    </Link>
                    <button
                      onClick={() => triggerEnquiry(pkg.title)}
                      className="py-2.5 px-4 rounded-lg border border-slate-300 hover:border-brand-orange hover:text-brand-orange text-slate-700 text-xs font-bold uppercase transition-colors"
                    >
                      Reserve Lot
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* View All Bottom Link */}
        <div className="mt-12 text-center">
          <Link
            href={activeTab === 'designs' ? '/designs' : '/packages'}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-brand-navy hover:bg-brand-orange text-white text-sm font-extrabold uppercase tracking-wider transition-all shadow hover:shadow-md"
          >
            <span>{activeTab === 'designs' ? 'View All 63 Home Designs' : 'View All Packages'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
