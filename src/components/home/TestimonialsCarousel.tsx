'use client';

import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ProjectFeedback {
  quote: string;
  client: string;
  project: string;
  location: string;
  highlight: string;
}

const clientReflections: ProjectFeedback[] = [
  {
    quote: 'From our initial engineering consultation with Javed through to lock-up and final handover, having a civil engineer personally oversee our site hold points gave us immense confidence. The build quality in our living pavilion and brickwork is exceptional.',
    client: 'David & Elena M.',
    project: 'The Arden Grove Residence',
    location: 'Box Hill, NSW',
    highlight: 'Precision Engineering & Hold Points'
  },
  {
    quote: 'Executing an architectural duplex requires rigorous council coordination and acoustic separation between dwellings. JUFAJA delivered ahead of schedule with zero hidden cost variations. Our finished investment exceeds every expectation.',
    client: 'Anthony & Sarah K.',
    project: 'The Meridian Duplex Commission',
    location: 'Leppington, NSW',
    highlight: 'Acoustic Precision & Turnkey Delivery'
  },
  {
    quote: 'Knocking down our long-held family home was an emotional decision. JUFAJA took care of demolition permits, site preparation, and constructed a modern masterpiece with seamless indoor-outdoor alfresco living. Truly considered builders.',
    client: 'Michael & Thao N.',
    project: 'The Verdant Knockdown Rebuild',
    location: 'Camden, NSW',
    highlight: 'End-to-End Knockdown Rebuild'
  }
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev - 1 + clientReflections.length) % clientReflections.length);
  const next = () => setCurrent((prev) => (prev + 1) % clientReflections.length);

  const item = clientReflections[current];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-jufaja-border">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-40 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Tag */}
        <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold block mb-3">
          Handover Reflections
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-jufaja-forest tracking-tight mb-10">
          Client Experiences &amp; Handover Standards
        </h2>

        {/* Quote Container */}
        <div className="bg-jufaja-ivory rounded-2xl p-8 sm:p-12 border border-jufaja-border/80 shadow-sm relative">
          {/* Quote Glyph */}
          <div className="w-12 h-12 rounded-full bg-jufaja-forest text-jufaja-gold flex items-center justify-center mx-auto mb-6 shadow-sm border border-jufaja-gold/30">
            <Quote className="w-5 h-5" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-jufaja-forest leading-relaxed italic mb-8 min-h-[110px] flex items-center justify-center">
            &ldquo;{item.quote}&rdquo;
          </blockquote>

          {/* Client Details */}
          <div className="space-y-1.5 pt-4 border-t border-jufaja-border/60">
            <div className="text-base sm:text-lg font-serif font-semibold text-jufaja-forest">
              {item.client}
            </div>
            <div className="text-xs sm:text-sm font-sans text-jufaja-gold flex items-center justify-center flex-wrap gap-2">
              <span className="font-medium text-jufaja-charcoal">{item.project}</span>
              <span className="text-jufaja-muted/50">&bull;</span>
              <span className="text-jufaja-muted">{item.location}</span>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-jufaja-forest bg-white px-3 py-1 rounded-full border border-jufaja-gold/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-jufaja-gold" />
                <span>{item.highlight}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous Reflection"
            className="p-2.5 rounded-full border border-jufaja-border bg-white hover:bg-jufaja-ivory hover:border-jufaja-gold text-jufaja-forest transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-2">
            {clientReflections.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === current ? 'w-8 bg-jufaja-forest' : 'w-2 bg-jufaja-border hover:bg-jufaja-gold'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next Reflection"
            className="p-2.5 rounded-full border border-jufaja-border bg-white hover:bg-jufaja-ivory hover:border-jufaja-gold text-jufaja-forest transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
