'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, ShieldCheck, Ruler, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

export default function BrandDifference() {
  const differentiators = [
    {
      number: '01',
      title: 'One Accountable Contact',
      description: 'You communicate directly with our hands-on leadership and dedicated project director — ensuring clarity, speed of decision-making, and personal accountability.',
      category: 'Personal Service'
    },
    {
      number: '02',
      title: 'Quality at Every Hold Point',
      description: 'Rigorous engineering milestone inspections at foundation excavation, steel framing, waterproofing membranes, and pre-lining lock-up before works proceed.',
      category: 'Quality Construction'
    },
    {
      number: '03',
      title: 'Precision Over Speed',
      description: 'We prioritize meticulous pre-construction coordination, constructability reviews, and transparent documentation over rushed timelines that create surprises later.',
      category: 'Considered Craftsmanship'
    },
    {
      number: '04',
      title: 'Locally Managed Construction',
      description: 'Deep familiarity with Greater Sydney site topography, local council DCPs, Complying Development (CDC) pathways, and accredited private certifiers.',
      category: 'Local Experience'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#faf8f5] border-y border-stone-200/80 relative overflow-hidden">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-jufaja-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-jufaja-forest mb-3">
              <Sparkles className="w-3 h-3 text-jufaja-gold" />
              <span>Considered Construction Principles</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-jufaja-forest tracking-tight">
              The JUFAJA Difference
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-4 leading-relaxed max-w-2xl mx-auto font-normal">
              In an industry often driven by anonymous volume, JUFAJA was established on four guiding standards that protect your investment and build quality.
            </p>
          </Reveal>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {differentiators.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.12}>
              <div className="bg-white rounded-2xl p-7 border border-stone-200/90 hover:border-jufaja-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif font-bold text-2xl text-jufaja-gold">
                      {item.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 bg-jufaja-stone px-2.5 py-1 rounded">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-jufaja-forest mb-3 group-hover:text-jufaja-gold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-jufaja-forest">
                  <span className="tracking-wide">Core Standard</span>
                  <div className="w-6 h-[1.5px] bg-jufaja-gold group-hover:w-10 transition-all" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rebuild & Custom Consultation Banner */}
        <Reveal delay={0.4}>
          <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-white border border-jufaja-gold/30 shadow-luxury flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-jufaja-gold">
                Site Feasibility &amp; Assessment
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-jufaja-forest">
                Considering a Knockdown Rebuild or Custom Architectural Build?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                We review your land contours, orientation, zoning controls, and CDC eligibility to outline realistic project possibilities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/knockdown-rebuild"
                className="px-6 py-3.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow border border-jufaja-gold/40 flex items-center gap-2"
              >
                <span>Check Block Feasibility</span>
                <ArrowRight className="w-4 h-4 text-jufaja-gold" />
              </Link>
              <Link
                href="/custom-homes"
                className="px-5 py-3.5 rounded-lg border border-stone-300 hover:bg-jufaja-stone text-jufaja-forest text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Custom Builds
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
