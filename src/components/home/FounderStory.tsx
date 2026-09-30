'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Award, ShieldCheck, Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

export default function FounderStory() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Portrait & Architectural Framing (5 cols) */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="right">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Background Architectural Accent Block */}
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-jufaja-stone/80 border border-jufaja-gold/25 -z-10" />

                {/* Main Portrait Frame */}
                <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden shadow-luxury border-2 border-white bg-stone-100">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85"
                    alt="Javed Iqbal, Founder & Principal Builder of JUFAJA Constructions"
                    fill
                    className="object-cover object-top"
                  />
                  
                  {/* Subtle Light Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-jufaja-forest/80 via-jufaja-forest/20 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-jufaja-gold block">
                      Founder &amp; Principal Builder
                    </span>
                    <h3 className="font-serif font-bold text-xl text-jufaja-forest mt-0.5">
                      Javed Iqbal
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                      JUFAJA Constructions Pty Ltd &bull; Sydney, NSW
                    </p>
                  </div>
                </div>

                {/* Decorative Drafting Corner Mark */}
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-jufaja-gold pointer-events-none" />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Company Story & Direct Leadership Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jufaja-stone border border-jufaja-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-jufaja-forest mb-2">
                <Sparkles className="w-3 h-3 text-jufaja-gold" />
                <span>Personal Builder Accountability</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-black text-jufaja-forest tracking-tight leading-tight">
                Craftsmanship Led From <br />
                <span className="text-jufaja-gold italic font-normal">On-Site to Office.</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-stone-600 font-normal leading-relaxed pt-2">
                <p>
                  JUFAJA Constructions was founded on a simple principle: residential construction should be an inspiring, transparent, and respectful partnership between homeowner and builder.
                </p>
                <p>
                  Led personally by founder Javed Iqbal, our team combines civil engineering precision with hands-on site management. While commercial volume builders often pass clients between rotating customer service coordinators, JUFAJA provides direct access to the builder who oversees your build.
                </p>
                <p>
                  Whether designing a bespoke multi-level residence, managing a complex knockdown rebuild, or delivering a pre-designed master plan, we ensure every decision is protected by rigorous engineering hold points and honest communication.
                </p>
              </div>

              {/* Verified Commitment Pillars */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-jufaja-ivory border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-stone-800 font-semibold">Direct founder involvement throughout</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-jufaja-ivory border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-stone-800 font-semibold">Pre-construction constructability audits</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-jufaja-ivory border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-stone-800 font-semibold">Transparent, itemised fixed-scope tenders</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-jufaja-ivory border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-stone-800 font-semibold">Sydney council and certifier navigation</span>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/about-us"
                  className="px-6 py-3.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow border border-jufaja-gold/40 flex items-center gap-2"
                >
                  <span>Learn More About JUFAJA</span>
                  <ArrowRight className="w-4 h-4 text-jufaja-gold" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-lg border border-stone-300 hover:bg-jufaja-stone text-jufaja-forest text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Meet On Site
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
