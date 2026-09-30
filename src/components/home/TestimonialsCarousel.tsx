'use client';

import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  roleOrHome: string;
  suburb: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'We built our dream double-storey home with JUFAJA and could not be happier. Their attention to detail during every hold point inspection gave us complete peace of mind. No stress, no hidden site surprises, and delivered right on time.',
    author: 'Michelle Dadich & James Tuckfield',
    roleOrHome: 'Delta 36 Series Build',
    suburb: 'Camden, NSW'
  },
  {
    quote: 'From our first consultation to key handover, dealing with one accountable builder made all the difference. Our custom design was executed to absolute perfection. The finishes in the kitchen and bathrooms are true luxury.',
    author: 'Paul Salviana',
    roleOrHome: 'Bespoke Custom Architectural Home',
    suburb: 'Drummoyne, NSW'
  },
  {
    quote: 'We knocked down our 60-year-old cottage and rebuilt the Kingston 28. JUFAJA handled the demolition, council permits, and construction as one seamless package. We saved thousands compared to other volume builders.',
    author: 'Nam & Tham Le',
    roleOrHome: 'Knockdown Rebuild Client',
    suburb: 'Prestons, NSW'
  }
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  const item = testimonials[current];

  return (
    <section className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Quote Icon */}
        <div className="w-14 h-14 rounded-full bg-brand-navy text-brand-orange flex items-center justify-center mx-auto mb-6 shadow">
          <Quote className="w-7 h-7" />
        </div>

        {/* Star Rating */}
        <div className="flex justify-center items-center gap-1.5 mb-6 text-brand-orange">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
          <span className="ml-2 text-xs font-bold text-slate-700">5.0 / 5 Verified Reviews</span>
        </div>

        {/* Quote Text */}
        <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-brand-navy leading-relaxed italic mb-8 min-h-[110px] flex items-center justify-center">
          &ldquo;{item.quote}&rdquo;
        </blockquote>

        {/* Author Details */}
        <div className="space-y-1">
          <div className="text-base sm:text-lg font-black text-brand-navy">
            {item.author}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-brand-orange flex items-center justify-center gap-2">
            <span>{item.roleOrHome}</span>
            <span>&bull;</span>
            <span className="text-slate-500">{item.suburb}</span>
          </div>
        </div>

        {/* Carousel Arrows */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous Testimonial"
            className="p-2 rounded-full border border-slate-300 bg-white hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === current ? 'w-6 bg-brand-orange' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next Testimonial"
            className="p-2 rounded-full border border-slate-300 bg-white hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
