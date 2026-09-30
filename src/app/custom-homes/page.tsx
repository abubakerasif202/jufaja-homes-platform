import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight,
  Mountain,
  Maximize2,
  Trees,
  Users,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Home Builders Sydney | Bespoke Architecture | JUFAJA Constructions',
  description: 'Bespoke architectural design and precision construction for complex, sloping, acreage, and luxury residential blocks across Greater Sydney. Turnkey fixed contracts.',
};

export default function CustomHomesPage() {
  const customPillars = [
    {
      icon: Mountain,
      title: 'Sloping & Challenging Blocks',
      description: 'Mastering Sydney’s steep topography with intelligent split-level configurations, stepped foundations, and integrated retaining solutions that maximise panoramic valley and district views.'
    },
    {
      icon: Maximize2,
      title: 'Narrow & Compact Urban Sites',
      description: 'Clever architectural planning for 9m - 12m frontages. Utilizing central light-wells, double-height voids, and expansive glass to create uncompromised volume and airy, sun-drenched interiors.'
    },
    {
      icon: Trees,
      title: 'Acreage & Country Luxury Estates',
      description: 'Generous single and multi-wing architectural layouts designed to embrace expansive rural parcels, featuring wrap-around verandas, resort-style master wings, and seamless alfresco courtyards.'
    },
    {
      icon: Users,
      title: 'Dual Living & Multi-Generational',
      description: 'Harmonious multi-generational residences incorporating self-contained independent suites, dual master bedrooms, acoustic insulation, and separate private entrances without sacrificing unity.'
    }
  ];

  const designStages = [
    {
      num: '01',
      title: 'Architectural Discovery & Site Feasibility',
      desc: 'We meet on your land to review contours, solar orientation, wind paths, and council zoning restrictions, transforming your lifestyle wish-list into a cohesive conceptual brief.'
    },
    {
      num: '02',
      title: 'Concept Floorplans & 3D Visualisation',
      desc: 'Our in-house design draftsmen craft bespoke floorplans and photorealistic 3D external perspectives so you experience the look, scale, and lighting of your new residence before construction.'
    },
    {
      num: '03',
      title: 'Engineering & Fixed-Price Tender',
      desc: 'Complete structural slab design, hydraulic stormwater calculations, and BASIX thermal modeling are finalised to produce a crystal-clear, transparent tender with guaranteed site costs.'
    },
    {
      num: '04',
      title: 'Council Certifications & Building',
      desc: 'JUFAJA manages all DA or fast-track CDC council applications. Once approved, our elite master trades commence construction backed by our 4-Point Hold quality assurance inspections.'
    }
  ];

  const customFinishes = [
    'Hand-crafted feature stonework and textured render finishes',
    'Commercial-grade architectural aluminium double-glazed windows & stackers',
    'Soaring 3.0m ground floor ceilings with recessed shadowline details',
    'Custom designer joinery, integrated butler’s pantries, and stone waterfall islands',
    'European appliance suites (Miele, Bosch, Smeg, or Fisher & Paykel)',
    'Ducted multi-zone climate automation and smart home access control'
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Light & Architectural */}
      <section className="relative bg-jufaja-ivory py-20 md:py-28 overflow-hidden border-b border-jufaja-border">
        {/* Background Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-jufaja-gold/40 text-jufaja-forest text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Compass className="w-3.5 h-3.5 text-jufaja-gold" />
              <span>Bespoke Architectural Design &amp; Construction</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-jufaja-forest tracking-tight leading-[1.08]">
              Designed For Your Land.<br />
              <span className="text-jufaja-gold font-normal italic">Crafted For Your Legacy.</span>
            </h1>

            <p className="text-jufaja-muted text-base sm:text-lg leading-relaxed font-sans">
              When standard floorplans cannot accommodate your unique vision or challenging block conditions, JUFAJA’s bespoke custom architectural service delivers tailored engineering, high-end materiality, and fixed-price security.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-md border border-jufaja-gold/40 flex items-center gap-2"
              >
                <span>Book Architectural Consultation</span>
                <ArrowRight className="w-4 h-4 text-jufaja-gold" />
              </Link>
              <Link
                href="/projects"
                className="px-6 py-4 rounded-lg bg-white hover:bg-jufaja-ivory border border-jufaja-border text-jufaja-forest text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                View Completed Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Pillars Section */}
      <section className="py-16 md:py-24 bg-white border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              Specialist Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest mt-2">
              Building Where Other Builders Hesitate
            </h2>
            <p className="text-jufaja-muted text-sm sm:text-base mt-3 font-sans">
              Many volume builders reject non-flat or irregular blocks. At JUFAJA, our specialized structural engineers and building designers turn site obstacles into architectural focal points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i} 
                  className="p-6 rounded-2xl bg-jufaja-ivory border border-jufaja-border hover:border-jufaja-gold/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-jufaja-forest text-jufaja-gold flex items-center justify-center border border-jufaja-gold/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-jufaja-forest text-xl leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-jufaja-muted leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 4-Stage Architectural Journey */}
      <section className="py-16 md:py-24 bg-jufaja-ivory border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              Concept To Handover
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest mt-2">
              The JUFAJA Custom Design Process
            </h2>
            <p className="text-jufaja-muted text-sm sm:text-base mt-3 font-sans">
              A collaborative, transparent architectural journey that pairs your individual aesthetic with rigorous budgeting and structural discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designStages.map((stage, sIdx) => (
              <div 
                key={sIdx}
                className="bg-white rounded-2xl border border-jufaja-border p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-3xl font-serif font-bold text-jufaja-gold">
                    {stage.num}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-jufaja-forest">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-jufaja-muted leading-relaxed font-sans">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Inclusions & Finishes Section - Light & High End */}
      <section className="py-16 md:py-24 bg-white border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
                Materiality &amp; Detailing
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest leading-tight">
                Luxury Materials Selected For Durability &amp; Architectural Drama
              </h2>
              <p className="text-jufaja-muted text-sm sm:text-base leading-relaxed font-sans">
                Every custom residence we build receives an elevated specification standard. Work directly with our interior styling consultants in our colour studio to tailor every fixture, stone profile, and joinery accent.
              </p>

              <div className="space-y-3 pt-2">
                {customFinishes.map((item, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-jufaja-gold shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-jufaja-charcoal font-medium font-sans">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/inclusions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm border border-jufaja-gold/40"
                >
                  <span>Explore Inclusions Specification</span>
                  <ArrowRight className="w-4 h-4 text-jufaja-gold" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm border border-jufaja-border">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                    alt="Luxury Kitchen Joinery"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-jufaja-border">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
                    alt="Master Ensuite"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-jufaja-border">
                  <Image
                    src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80"
                    alt="Architectural Living"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm border border-jufaja-border">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
                    alt="Alfresco Entertaining"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-jufaja-forest text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-fine opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
            Ready To Design Your Bespoke Home?
          </h2>
          <p className="text-jufaja-ivory/80 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Schedule an obligation-free architectural site feasibility appraisal with our principal builder Javed Iqbal.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-jufaja-gold hover:bg-jufaja-gold-400 text-jufaja-forest text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow"
            >
              Book Site Feasibility Consultation
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors"
            >
              Explore Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
