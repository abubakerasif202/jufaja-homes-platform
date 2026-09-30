import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  Users, 
  Building, 
  BadgeCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | JUFAJA Homes & Constructions Sydney',
  description: 'Learn about JUFAJA Homes. Over 25 years of Sydney residential building excellence, independent 4-Point Hold inspections, NSW Builder Licence 55277C, HIA Member 392133.',
};

export default function AboutUsPage() {
  const qualityPillars = [
    {
      num: '01',
      title: 'Hold Point 1: Foundation & Steel Rebar',
      desc: 'Independent structural engineers inspect the excavation, piering depth, and steel waffle mesh prior to the concrete pour to certify soil load compliance to AS2870.'
    },
    {
      num: '02',
      title: 'Hold Point 2: Frame & Structural Tie-Downs',
      desc: 'Before insulation or wall linings are installed, we perform a laser-guided frame audit checking load paths, wind bracing, window flashings, and electrical rough-in.'
    },
    {
      num: '03',
      title: 'Hold Point 3: Wet Area Waterproofing Membrane',
      desc: 'Bathrooms, ensuites, and balconies receive certified multi-coat waterproofing membranes with rigorous 24-hour flood testing before a single tile is laid.'
    },
    {
      num: '04',
      title: 'Hold Point 4: Practical Completion 200-Point Audit',
      desc: 'A comprehensive pre-handover audit inspecting joinery tolerances, paint finishes, mechanical ducting, and electrical safety switches before handing over your keys.'
    }
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Fixed-Price Guarantee',
      desc: 'No hidden site surprises. We conduct thorough site surveys and soil testing upfront so your building contract is transparent and fixed.'
    },
    {
      icon: HeartHandshake,
      title: 'Family-Owned Integrity',
      desc: 'You are never treated as just a job number. Our directors and site supervisors are personally available throughout your build journey.'
    },
    {
      icon: Award,
      title: '25-Year Structural Lifetime Warranty',
      desc: 'We construct homes to outlast generations. We back our workmanship with an industry-leading 25-year structural warranty.'
    },
    {
      icon: Users,
      title: 'In-House Drafting & Approvals',
      desc: 'From custom architectural revisions to fast-track 20-day CDC approvals, our internal planning team manages every council interaction.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="JUFAJA Architectural Residence"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span>Building With Confidence. Living With Pride.</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Sydney’s Trusted Quality Home Builder
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              For over two decades, JUFAJA Homes has crafted beautiful, functional, and durable residences across Greater Sydney, the Hills District, South West, and the Illawarra.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Heritage Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy leading-tight">
                Crafting Homes Where Memories Flourish
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  JUFAJA Homes was founded on a simple principle: home building should be an exciting, transparent, and pride-filled journey for every Australian family.
                </p>
                <p>
                  While large commercial builders often treat homeowners as anonymous account numbers, JUFAJA maintains direct director access and personal site supervisor communication. We merge volume-builder purchasing power with boutique architectural care.
                </p>
                <p>
                  With an extensive portfolio of 63 master designs, turnkey House &amp; Land packages, and specialised Knockdown Rebuild solutions, we build with precision, passion, and permanence.
                </p>
              </div>

              {/* Licences Badges */}
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NSW Builder Licence</span>
                  <span className="text-sm font-black text-brand-navy">55277C</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">HIA Member</span>
                  <span className="text-sm font-black text-brand-navy"># 392133</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Warranty Protection</span>
                  <span className="text-sm font-black text-brand-orange">25-Year Structural</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="JUFAJA Family Residence"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Point Hold Quality Assurance Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-2">
              Our Signature 4-Point Hold Quality Assurance
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              We institute four mandatory construction hold points where work ceases until certified by independent structural engineers and building inspectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((point, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-3xl font-black text-brand-orange font-mono">
                    {point.num}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Independent Certification</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Our Commitment To You
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-2">
              The JUFAJA Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, vIdx) => {
              const Icon = val.icon;
              return (
                <div key={vIdx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-orange flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-brand-navy text-base">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-navy text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black">
            Meet Our Building Consultants
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Visit one of our display villages or our Prestons Design Studio to discuss your dream home or knockdown rebuild project.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/display-homes"
              className="px-8 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow"
            >
              Find Nearest Display Village
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Contact Head Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
