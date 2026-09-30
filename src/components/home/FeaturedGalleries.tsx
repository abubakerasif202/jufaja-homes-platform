'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HomeDesign, PackageListing } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';
import DesignCard from '@/components/catalogue/DesignCard';
import PackageCard from '@/components/packages/PackageCard';
import Reveal from '@/components/motion/Reveal';

interface Props {
  featuredDesigns: HomeDesign[];
  featuredPackages: PackageListing[];
}

export default function FeaturedGalleries({ featuredDesigns, featuredPackages }: Props) {
  const [activeTab, setActiveTab] = useState<'designs' | 'packages'>('designs');

  return (
    <section className="py-20 lg:py-28 bg-[#ffffff] border-b border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jufaja-stone border border-jufaja-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-jufaja-forest mb-2">
              <Sparkles className="w-3 h-3 text-jufaja-gold" />
              <span>Curated Catalogue Releases</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-jufaja-forest tracking-tight">
              Featured Living Solutions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl font-normal leading-relaxed">
              Explore our most requested single and double-storey master floorplans, or review turnkey house and land packages in Sydney growth corridors.
            </p>
          </Reveal>

          {/* Tab Buttons */}
          <Reveal delay={0.15}>
            <div className="inline-flex p-1.5 bg-jufaja-stone rounded-xl border border-stone-200/80 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('designs')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'designs'
                    ? 'bg-jufaja-forest text-white shadow-sm border border-jufaja-gold/40'
                    : 'text-stone-600 hover:text-jufaja-forest'
                }`}
              >
                Home Designs (63 Plans)
              </button>
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-jufaja-forest text-white shadow-sm border border-jufaja-gold/40'
                    : 'text-stone-600 hover:text-jufaja-forest'
                }`}
              >
                House &amp; Land Packages
              </button>
            </div>
          </Reveal>
        </div>

        {/* Tab 1: Home Designs Grid */}
        {activeTab === 'designs' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDesigns.slice(0, 6).map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/designs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md border border-jufaja-gold/40 hover:-translate-y-0.5"
              >
                <span>View All 63 Architectural Plans</span>
                <ArrowRight className="w-4 h-4 text-jufaja-gold" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Packages Grid */}
        {activeTab === 'packages' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.slice(0, 6).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md border border-jufaja-gold/40 hover:-translate-y-0.5"
              >
                <span>Browse All House &amp; Land Packages</span>
                <ArrowRight className="w-4 h-4 text-jufaja-gold" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
