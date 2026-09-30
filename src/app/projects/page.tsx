import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { JUFAJA_PROJECTS } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Our Work & Selected Residential Projects | JUFAJA Constructions',
  description: 'Explore selected custom homes, architectural duplexes, and knockdown rebuild projects delivered across Sydney and NSW by JUFAJA Constructions.',
};

export default function ProjectsPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/* Hero Header */}
      <section className="bg-jufaja-forest text-white py-16 sm:py-24 relative overflow-hidden border-b border-jufaja-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-jufaja-gold/40 text-jufaja-gold text-[10px] font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sydney Architectural Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white">
            Selected Works &amp; Built Projects
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            A portfolio of custom residences, multi-dwelling dual-occupancies, and knockdown rebuilds crafted with engineering rigor and thoughtful materiality across Sydney.
          </p>
        </div>
      </section>

      {/* Projects Showcase List */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-24">
          {JUFAJA_PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Frame */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative h-[340px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-luxury border-2 border-white bg-stone-100 group">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-jufaja-forest/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {proj.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-xs font-semibold text-stone-800 shadow flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-jufaja-gold" />
                    <span>{proj.location}</span>
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className={`lg:col-span-5 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-jufaja-gold block">
                    Commission Showcase
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-jufaja-forest">
                    {proj.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {proj.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400 block">
                    Architectural Specifications &amp; Features:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-stone-200/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
                        <span className="font-medium text-[11px]">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/contact?project=${encodeURIComponent(proj.title)}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow border border-jufaja-gold/40"
                  >
                    <span>Enquire On This Project Type</span>
                    <ArrowRight className="w-4 h-4 text-jufaja-gold" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="bg-jufaja-stone py-16 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-jufaja-forest">
            Ready to Plan Your Next Architectural Residence?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Speak directly with founder Javed Iqbal and our senior building consultants to assess your land feasibility, council pathways, and initial budget.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow border border-jufaja-gold/40"
            >
              Book Complimentary Site Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
