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
  ArrowRight,
  Compass,
  FileCheck2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Engineering Leadership | JUFAJA Constructions Sydney',
  description: 'Discover the story of JUFAJA Constructions. Led by civil engineer and principal builder Javed Iqbal, we build architecturally considered residences across Sydney with verified 4-point quality hold points.',
};

export default function AboutUsPage() {
  const qualityPillars = [
    {
      num: '01',
      title: 'Hold Point 1: Foundation & Steel Rebar',
      desc: 'Independent structural engineers inspect excavation, piering depth, and steel waffle mesh prior to the concrete pour to certify soil load compliance to AS2870.'
    },
    {
      num: '02',
      title: 'Hold Point 2: Frame & Structural Tie-Downs',
      desc: 'Before insulation or wall linings are installed, we perform a laser-guided frame audit checking load paths, wind bracing, window flashings, and electrical rough-in to AS1684.'
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
      title: 'Transparent Fixed Pricing',
      desc: 'No hidden site surprises. We conduct thorough site surveys and soil testing upfront so your building contract is transparent, comprehensive, and fixed.'
    },
    {
      icon: HeartHandshake,
      title: 'Direct Builder Accountability',
      desc: 'You are never treated as an anonymous account number. Our founder and civil engineer Javed Iqbal maintains personal oversight over every build.'
    },
    {
      icon: Award,
      title: '25-Year Structural Lifetime Warranty',
      desc: 'We construct homes engineered to endure for generations. We back our structural craftsmanship with a genuine 25-year structural warranty.'
    },
    {
      icon: Users,
      title: 'In-House Architectural Consultation',
      desc: 'From custom floorplan revisions to fast-track CDC approvals, our dedicated technical team coordinates every council requirement seamlessly.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Light & Architectural */}
      <section className="bg-jufaja-ivory py-16 md:py-24 relative overflow-hidden border-b border-jufaja-border">
        {/* Background Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-jufaja-gold/40 text-jufaja-forest text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Compass className="w-3.5 h-3.5 text-jufaja-gold" />
              <span>Engineering Heritage &bull; Precision Craftsmanship</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-jufaja-forest tracking-tight leading-tight">
              Sydney’s Considered Residential Builders
            </h1>
            <p className="text-jufaja-muted text-base sm:text-lg leading-relaxed font-sans">
              Founded on civil engineering discipline and architectural precision, JUFAJA Constructions designs and builds distinctive residences, bespoke duplexes, and turnkey packages across Greater Sydney.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Heritage Section */}
      <section className="py-16 md:py-24 bg-white border-b border-jufaja-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
                Our Foundation &amp; Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest leading-tight">
                Crafting Homes Where Precision Meets Family Living
              </h2>
              <div className="space-y-4 text-jufaja-muted text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  JUFAJA Constructions was established with an uncompromising commitment: to replace the impersonal, rushed processes of volume home building with genuine engineering precision, transparent communication, and enduring architectural beauty.
                </p>
                <p>
                  While large commercial operators frequently hand clients down a chain of call-centre coordinators, JUFAJA operates with direct builder accessibility. Every site is supervised with civil engineering rigour, ensuring load paths, foundation piering, and structural details exceed Australian standards.
                </p>
                <p>
                  From single and double-storey family sanctuaries to high-yield duplex investments and complex knockdown rebuilds, we deliver homes built to stand for generations.
                </p>
              </div>

              {/* Verified Credentials Badges (Scrubbed of Borrowed Casaview Data) */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-jufaja-ivory border border-jufaja-border">
                  <span className="text-[10px] font-semibold text-jufaja-gold uppercase tracking-wider block">Licence &amp; Registration</span>
                  <span className="text-sm font-bold text-jufaja-forest font-serif">Licensed NSW Builder</span>
                  <span className="text-[11px] text-jufaja-muted block mt-0.5">Residential Specialist</span>
                </div>
                <div className="p-4 rounded-xl bg-jufaja-ivory border border-jufaja-border">
                  <span className="text-[10px] font-semibold text-jufaja-gold uppercase tracking-wider block">Compliance Standards</span>
                  <span className="text-sm font-bold text-jufaja-forest font-serif">AS 2870 &amp; AS 1684</span>
                  <span className="text-[11px] text-jufaja-muted block mt-0.5">Engineered Certification</span>
                </div>
                <div className="p-4 rounded-xl bg-jufaja-ivory border border-jufaja-border">
                  <span className="text-[10px] font-semibold text-jufaja-gold uppercase tracking-wider block">Warranty Protection</span>
                  <span className="text-sm font-bold text-jufaja-forest font-serif">25-Year Guarantee</span>
                  <span className="text-[11px] text-jufaja-muted block mt-0.5">Structural Assurance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-jufaja-border">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="JUFAJA Architectural Residence"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section: Javed Iqbal */}
      <section id="leadership" className="py-16 md:py-24 bg-jufaja-ivory border-b border-jufaja-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-jufaja-border shadow-md bg-white p-2">
                <div className="relative h-96 sm:h-[420px] rounded-xl overflow-hidden bg-jufaja-stone">
                  <Image
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                    alt="Javed Iqbal, Civil Engineer & Principal Builder"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-jufaja-forest/90 via-jufaja-forest/50 to-transparent p-5 text-white">
                    <p className="font-serif text-lg font-semibold">Javed Iqbal</p>
                    <p className="text-xs text-jufaja-gold font-sans">Founder &bull; Principal Builder &bull; B.Eng (Civil)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
                Leadership &amp; Direction
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest leading-tight">
                Led by Civil Engineering Discipline
              </h2>
              <div className="space-y-4 text-jufaja-muted text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  At the helm of JUFAJA Constructions is <strong>Javed Iqbal</strong>, a qualified civil engineer whose technical background brings an engineering standard rarely seen in standard residential building.
                </p>
                <p>
                  Where typical project builders outsource critical site evaluations to junior supervisors, Javed actively reviews foundation soil geotech reports, structural slab calculations, and framing loads before construction commences.
                </p>
                <blockquote className="border-l-2 border-jufaja-gold pl-4 py-1 italic font-serif text-lg text-jufaja-forest">
                  &ldquo;A home must be as structurally sound beneath the slab and inside the wall cavity as it is breathtaking when you step through the front door. We never cut corners on what you cannot see.&rdquo;
                </blockquote>
                <p>
                  Under Javed’s direction, JUFAJA maintains a selective build volume to guarantee that every home receives dedicated engineering attention and personal oversight.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-medium text-xs sm:text-sm px-6 py-3.5 rounded-lg uppercase tracking-wider transition-all shadow-sm"
                >
                  <span>View Completed Projects</span>
                  <ArrowRight className="w-4 h-4 text-jufaja-gold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Point Hold Quality Assurance Section */}
      <section id="hold-points" className="py-16 md:py-24 bg-white border-b border-jufaja-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              Engineering Rigour
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest mt-2">
              Our Signature 4-Point Hold Quality Assurance
            </h2>
            <p className="text-jufaja-muted text-sm sm:text-base mt-3 font-sans">
              We institute four mandatory construction hold points where site works halt until certified by qualified structural engineers and independent building inspectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((point, idx) => (
              <div 
                key={idx}
                className="bg-jufaja-ivory rounded-2xl border border-jufaja-border p-6 sm:p-8 shadow-sm hover:border-jufaja-gold/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-3xl font-serif font-bold text-jufaja-gold">
                    {point.num}
                  </div>
                  <h3 className="text-lg font-serif text-jufaja-forest font-semibold leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-jufaja-muted leading-relaxed font-sans">
                    {point.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-jufaja-border/60 flex items-center gap-1.5 text-[11px] font-semibold text-jufaja-forest">
                  <CheckCircle2 className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
                  <span>Independent Certification</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-16 md:py-20 bg-jufaja-ivory border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              Our Commitment To You
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest mt-2">
              The JUFAJA Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, vIdx) => {
              const Icon = val.icon;
              return (
                <div key={vIdx} className="p-6 rounded-2xl bg-white border border-jufaja-border space-y-3 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-jufaja-forest text-jufaja-gold flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-jufaja-forest">
                    {val.title}
                  </h3>
                  <p className="text-xs text-jufaja-muted leading-relaxed font-sans">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-jufaja-forest text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-fine opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
            Discuss Your Vision With Our Principal Builder
          </h2>
          <p className="text-jufaja-ivory/80 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Schedule an obligation-free architectural consultation or site feasibility assessment with Javed Iqbal and our senior engineering team.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-jufaja-gold hover:bg-jufaja-gold-400 text-jufaja-forest text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow"
            >
              Book Private Consultation
            </Link>
            <Link
              href="/designs"
              className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors"
            >
              Browse 63 Home Designs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
