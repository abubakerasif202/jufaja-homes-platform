'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Check, 
  Sparkles, 
  Award, 
  Download, 
  ArrowRight,
  Compass
} from 'lucide-react';
import inclusionsData from '@/data/inclusions.json';

export default function InclusionsPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const brandPartners = [
    { name: 'Caesarstone', category: 'Quartz Engineered Stone' },
    { name: 'Westinghouse', category: 'European Kitchen Appliances' },
    { name: 'Smeg', category: 'Luxury Italian Cooking' },
    { name: 'ActronAir', category: 'Ducted Climate Systems' },
    { name: 'Polytec', category: 'Designer Cabinetry & Joinery' },
    { name: 'Taubmans', category: 'Premium Endure Paints' },
    { name: 'Bluescope Truecore', category: 'Structural Steel Framing' },
    { name: 'Monier', category: 'Australian Concrete & Terracotta Tiles' }
  ];

  const handleDownloadBrochure = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', {
        detail: { context: 'Inclusions Brochure Request (Standard Prestige & Luxe Editions)' }
      })
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner - Light & Architectural */}
      <section className="bg-jufaja-ivory py-16 md:py-24 relative overflow-hidden border-b border-jufaja-border">
        {/* Background Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-jufaja-gold/40 text-jufaja-forest text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Compass className="w-3.5 h-3.5 text-jufaja-gold" />
              <span>Turnkey Transparency &amp; Premium Specifications</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-jufaja-forest tracking-tight leading-tight">
              Prestige Standard &amp; Luxe Inclusions
            </h1>
            <p className="text-jufaja-muted text-base sm:text-lg leading-relaxed font-sans">
              At JUFAJA Homes, what other builders charge as costly upgrades comes standard. From Caesarstone benchtops and 2600mm high ceilings to Actron reverse-cycle ducted air, discover the luxury built into every home.
            </p>
            <div className="pt-2">
              <button
                onClick={handleDownloadBrochure}
                className="px-7 py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-2.5 cursor-pointer border border-jufaja-gold/40"
              >
                <Download className="w-4 h-4 text-jufaja-gold" />
                <span>Request Complete Inclusions Book (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Comparison Section */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-none mb-10">
          {inclusionsData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === idx
                  ? 'bg-jufaja-forest text-white border-jufaja-forest shadow-md ring-2 ring-jufaja-gold ring-offset-2'
                  : 'bg-jufaja-ivory text-jufaja-forest border-jufaja-border hover:bg-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Current Active Category Inclusions Card */}
        <div className="bg-white rounded-2xl border border-jufaja-border shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 bg-jufaja-forest text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-jufaja-gold/20">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
                Specification Range
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                {inclusionsData[activeCategory].category}
              </h2>
            </div>
            <div className="flex items-center gap-5 text-xs font-medium font-sans">
              <span className="flex items-center gap-2 text-jufaja-ivory/80">
                <span className="w-2.5 h-2.5 rounded-full bg-jufaja-ivory"></span> Standard Prestige
              </span>
              <span className="flex items-center gap-2 text-jufaja-gold">
                <span className="w-2.5 h-2.5 rounded-full bg-jufaja-gold"></span> Luxe Signature
              </span>
            </div>
          </div>

          <div className="divide-y divide-jufaja-border/60">
            {inclusionsData[activeCategory].items.map((item, itemIdx) => (
              <div key={itemIdx} className="p-6 md:p-8 hover:bg-jufaja-ivory/30 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-jufaja-forest">
                      {item.name}
                    </h3>
                    <p className="text-xs text-jufaja-muted mt-0.5 font-sans">
                      Included across all single and double storey models.
                    </p>
                  </div>

                  {/* Standard Inclusion Column */}
                  <div className="lg:col-span-4 p-4 rounded-xl bg-jufaja-ivory border border-jufaja-border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-white text-jufaja-forest text-[10px] font-bold uppercase tracking-wider border border-jufaja-border">
                        Standard In Every Home
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-jufaja-charcoal font-medium font-sans leading-relaxed">
                      <Check className="w-4 h-4 text-jufaja-forest shrink-0 mt-0.5" />
                      <span>{item.standard}</span>
                    </div>
                  </div>

                  {/* Luxe Upgrade Column */}
                  <div className="lg:col-span-4 p-4 rounded-xl bg-jufaja-cream border border-jufaja-gold/40">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-jufaja-gold text-jufaja-forest text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Optional Luxe Upgrade</span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-jufaja-forest font-semibold font-sans leading-relaxed">
                      <Sparkles className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                      <span>{item.luxuryUpgrade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Partners Showcase */}
        <div className="mt-16 bg-jufaja-ivory rounded-2xl border border-jufaja-border p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              Industry Partners
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-jufaja-forest mt-1">
              Australia's Most Trusted Brands In Every JUFAJA Build
            </h3>
            <p className="text-xs sm:text-sm text-jufaja-muted mt-2 font-sans">
              We never cut corners with unbranded materials. Every appliance, tap, hinge, and roof tile comes from established manufacturers with nationwide warranties.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brandPartners.map((brand, bIdx) => (
              <div 
                key={bIdx}
                className="p-5 rounded-xl bg-white border border-jufaja-border text-center flex flex-col justify-center items-center hover:border-jufaja-gold/40 transition-colors shadow-xs"
              >
                <div className="text-base font-serif font-bold text-jufaja-forest tracking-tight">
                  {brand.name}
                </div>
                <div className="text-[11px] font-medium text-jufaja-muted mt-1 font-sans">
                  {brand.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Studio Experience Callout */}
        <div className="mt-12 bg-jufaja-forest rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden border border-jufaja-gold/20 shadow-md">
          <div className="absolute inset-0 bg-blueprint-fine opacity-5 pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-jufaja-gold text-jufaja-forest text-[10px] font-bold uppercase tracking-wider">
                Prestons Head Office &amp; Studio
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-white">
                Visit The JUFAJA Select Colour Studio
              </h3>
              <p className="text-jufaja-ivory/80 text-xs sm:text-sm font-sans leading-relaxed">
                Touch and compare brick samples, Caesarstone slabs, designer tapware, porcelain tiles, and smart automation switches under professional showroom lighting with our interior styling specialists.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={handleDownloadBrochure}
                className="px-6 py-4 rounded-lg bg-jufaja-gold hover:bg-jufaja-gold-400 text-jufaja-forest text-xs font-semibold uppercase tracking-wider shadow transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Book Selection Studio Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
