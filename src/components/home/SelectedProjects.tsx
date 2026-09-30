'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, Maximize2 } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

import { JUFAJA_PROJECTS, type ProjectShowcase } from '@/data/projects';
export type { ProjectShowcase };

export default function SelectedProjects() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="our-work" className="py-20 lg:py-28 bg-[#f4f1ea] border-b border-stone-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-jufaja-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-jufaja-forest mb-3">
              <Sparkles className="w-3 h-3 text-jufaja-gold" />
              <span>Built Projects &amp; Inspiration</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-jufaja-forest tracking-tight">
              Selected Architectural Works
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl font-normal leading-relaxed">
              Explore recent residential commissions across Sydney, from bespoke architectural custom residences to dual-occupancy developments and knockdown rebuilds.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jufaja-forest hover:text-jufaja-gold transition-colors hover-gold-sweep"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JUFAJA_PROJECTS.map((proj, idx) => (
            <Reveal key={proj.id} delay={idx * 0.15}>
              <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-luxury transition-all duration-500 group flex flex-col justify-between h-full">
                
                {/* Visual */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-200">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-jufaja-forest/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {proj.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-stone-800 px-3 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3 h-3 text-jufaja-gold" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif font-bold text-2xl text-jufaja-forest group-hover:text-jufaja-gold transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {proj.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2">
                      Key Highlights
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium">
                          <span className="w-1 h-1 rounded-full bg-jufaja-gold shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="px-6 sm:px-8 py-4 bg-jufaja-ivory border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-500">Residential Portfolio</span>
                  <Link
                    href={`/contact?project=${encodeURIComponent(proj.title)}`}
                    className="font-bold text-jufaja-forest hover:text-jufaja-gold flex items-center gap-1 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    <span>Enquire On Similar Build</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
