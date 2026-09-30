'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Download, 
  ChevronRight, 
  ArrowRight,
  Flame,
  Maximize,
  Droplet
} from 'lucide-react';
import inclusionsData from '@/data/inclusions.json';

export default function InclusionsPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const brandPartners = [
    { name: 'Caesarstone', category: 'Quartz Stone Benchtops' },
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
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80"
            alt="JUFAJA Inclusions Studio"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Turnkey Transparency & Premium Craftsmanship</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Prestige Standard &amp; Luxe Inclusions
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At JUFAJA Homes, what other builders charge as costly upgrades comes standard. From Caesarstone benchtops and 2600mm high ceilings to Actron reverse-cycle ducted air, discover the luxury built into every home.
            </p>
            <div className="pt-2">
              <button
                onClick={handleDownloadBrochure}
                className="px-6 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete Inclusions Book (PDF)</span>
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
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === idx
                  ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-orange ring-offset-2'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Current Active Category Inclusions Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                Specification Range
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                {inclusionsData[activeCategory].category}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Standard Prestige
              </span>
              <span className="flex items-center gap-1.5 text-brand-orange">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span> Luxe Signature
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {inclusionsData[activeCategory].items.map((item, itemIdx) => (
              <div key={itemIdx} className="p-6 md:p-8 hover:bg-slate-50/60 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4">
                    <h3 className="text-base font-extrabold text-brand-navy">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Included across all single and double storey models.
                    </p>
                  </div>

                  {/* Standard Inclusion Column */}
                  <div className="lg:col-span-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-black uppercase">
                        Standard In Every Home
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-relaxed">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.standard}</span>
                    </div>
                  </div>

                  {/* Luxe Upgrade Column */}
                  <div className="lg:col-span-4 p-4 rounded-xl bg-orange-50/50 border border-orange-200/70">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-brand-orange text-white text-[10px] font-black uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Optional Luxe Upgrade</span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-brand-navy font-semibold leading-relaxed">
                      <Sparkles className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>{item.luxuryUpgrade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Partners Showcase */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Industry Partners
            </span>
            <h3 className="text-2xl font-black text-brand-navy mt-1">
              Australia's Most Trusted Brands In Every JUFAJA Build
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              We never cut corners with cheap, unbranded components. Every appliance, tap, hinge, and roof tile comes from established manufacturers with long warranties.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brandPartners.map((brand, bIdx) => (
              <div 
                key={bIdx}
                className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-center flex flex-col justify-center items-center hover:bg-slate-100 transition-colors"
              >
                <div className="text-base sm:text-lg font-black text-brand-navy tracking-tight">
                  {brand.name}
                </div>
                <div className="text-[11px] font-medium text-slate-500 mt-1">
                  {brand.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Studio Experience Callout */}
        <div className="mt-12 bg-gradient-to-r from-brand-navy to-slate-900 rounded-2xl p-8 sm:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider">
                Prestons Head Office
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                Visit The JUFAJA Select Colour Studio
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Touch and compare brick samples, Caesarstone slabs, designer tapware, porcelain tiles, and smart automation switches under professional showroom lighting with our interior designers.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={handleDownloadBrochure}
                className="px-6 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-extrabold uppercase tracking-wider shadow transition-all cursor-pointer flex items-center gap-2"
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
