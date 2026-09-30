'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Shield, CheckCircle2 } from 'lucide-react';

export default function HeroCinematic() {
  const triggerEnquiry = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', {
        detail: { context: 'Homepage Hero: Site Appraisal & Feasibility Request' },
      })
    );
  };

  return (
    <section className="relative w-full overflow-hidden border-b border-jufaja-border bg-jufaja-cream pb-16 pt-8 lg:py-24">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />

      {/* Decorative Warm Ivory Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-jufaja-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Storytelling (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8 z-10">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-jufaja-gold/40 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-jufaja-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-jufaja-forest">
                Australian Home Builders
              </span>
            </motion.div>

            {/* Large Luxury Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl xl:text-7xl font-serif font-black text-jufaja-forest tracking-tight leading-[1.08]"
            >
              Building Homes <br />
              for a Brighter <br />
              <span className="text-jufaja-gold-600 font-normal italic">Tomorrow.</span>
            </motion.h1>

            {/* Concise Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl"
            >
              Explore considered home designs and practical information to help you start planning your build.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Link
                href="/designs"
                className="px-7 py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-luxury hover:-translate-y-0.5 border border-jufaja-gold/40 flex items-center gap-2.5 group"
              >
                <span>Explore Home Designs</span>
                <ArrowRight className="w-4 h-4 text-jufaja-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/projects"
                className="px-6 py-4 rounded-lg bg-white hover:bg-jufaja-stone text-jufaja-forest font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 border border-stone-300 shadow-sm"
              >
                Our Work
              </Link>

              <button
                onClick={triggerEnquiry}
                className="px-5 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-jufaja-forest/80 hover:text-jufaja-forest underline decoration-jufaja-gold underline-offset-8 transition-colors cursor-pointer"
              >
                Request Consultation
              </button>
            </motion.div>

            {/* Refined Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 border-t border-stone-200/90 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-stone-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-jufaja-forest shrink-0" />
                <span>Home design catalogue</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-jufaja-gold shrink-0" />
                <span>Custom &amp; Knockdown Rebuild</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-jufaja-forest shrink-0" />
                <span>Custom home enquiries</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Architectural Photography & Blueprint Drafting Animation (5 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            
            {/* Background Drafting Blueprint Lines */}
            <div className="absolute -inset-4 sm:-inset-6 pointer-events-none">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full opacity-35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Elevation & Pitch Drafting Lines */}
                <motion.line
                  x1="20"
                  y1="80"
                  x2="480"
                  y2="80"
                  stroke="var(--jufaja-gold-500)"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <motion.line
                  x1="60"
                  y1="20"
                  x2="60"
                  y2="460"
                  stroke="var(--jufaja-gold-500)"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <motion.polygon
                  points="70,140 250,50 430,140 430,420 70,420"
                  stroke="var(--jufaja-gold-500)"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* Main Architectural Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-luxury border-2 border-white bg-white p-2.5 sm:p-3"
            >
              <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] w-full rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                  alt="Illustrative image of a modern Australian-style residence"
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 42vw, 620px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />

                {/* Subtle warm daylight vignette (Not dark overlay) */}
                <div className="absolute inset-0 bg-gradient-to-t from-jufaja-forest/40 via-transparent to-transparent opacity-60" />

                {/* Corner Architectural Stamp */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-jufaja-gold/40 shadow-sm flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-jufaja-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-jufaja-forest">
                    Residential design inspiration
                  </span>
                </div>

                {/* Bottom Project Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200/80 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-jufaja-gold block">
                      Illustrative residence
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-jufaja-forest">
                      A considered home design
                    </h3>
                  </div>
                  <Link
                    href="/designs"
                    className="text-xs font-bold text-jufaja-gold hover:text-jufaja-forest flex items-center gap-1 transition-colors uppercase tracking-wider"
                  >
                    <span>Explore designs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
