import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Compass, 
  Sparkles, 
  Layers, 
  Ruler, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Mountain,
  Maximize2,
  Trees,
  Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Home Builders Sydney | Bespoke Architecture | JUFAJA Homes',
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
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
            alt="JUFAJA Bespoke Architecture"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Architectural Design & Build</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Designed For Your Land.<br />
              <span className="text-brand-orange">Crafted For Your Legacy.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              When standard floorplans cannot accommodate your unique vision or challenging block conditions, JUFAJA’s custom architectural service delivers bespoke luxury, tailored engineering, and fixed-price security.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
              >
                <span>Book Architectural Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/designs"
                className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors"
              >
                View Master Design Range
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Pillars Section */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Specialist Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-2">
              Building Where Other Builders Hesitate
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Many volume builders reject non-flat or irregular blocks. At JUFAJA, our specialized structural engineers and building designers turn site obstacles into architectural focal points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i} 
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-navy/30 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-orange flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-brand-navy text-lg leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Concept To Keys
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-2">
              The JUFAJA Custom Design Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              A collaborative, stress-free architectural journey that pairs your individual aesthetic with rigorous budgeting and structural discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designStages.map((stage, sIdx) => (
              <div 
                key={sIdx}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-3xl font-black text-brand-orange/40 font-mono">
                    {stage.num}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Inclusions & Finishes Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                Exquisite Finishes
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Luxury Materials Selected For Durability & Drama
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Every custom home we build receives an elevated specification standard. Work directly with our interior styling consultants in our colour studio to tailor every fixture, stone profile, and joinery accent.
              </p>

              <div className="space-y-3 pt-2">
                {customFinishes.map((item, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/inclusions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow"
                >
                  <span>Explore Inclusions Specification</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                    alt="Luxury Kitchen"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
                    alt="Master Ensuite"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80"
                    alt="Alfresco Lounge"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
                    alt="Architectural Living Area"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Booking CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Start Your Custom Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy">
            Bring Your Site Plan To An Architectural Session
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Sit down with our Senior Building Designer. We’ll review your contour survey, section 10.7 planning certificates, and design aspirations to outline what’s achievable.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-md"
            >
              Book An In-Office Or Site Design Meeting
            </Link>
            <a
              href="tel:0287838800"
              className="px-8 py-3.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Direct Line: (02) 8783 8800
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
