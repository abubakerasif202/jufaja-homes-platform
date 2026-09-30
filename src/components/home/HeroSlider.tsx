'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Award, Compass, Eye } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  secondaryLink?: string;
  secondaryText?: string;
}

const slides: Slide[] = [
  {
    title: 'Building with Excellence & Confidence',
    subtitle: 'Over 30 years of premier residential craftsmanship across Sydney.',
    tagline: 'PREMIER SYDNEY BUILDER',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    buttonText: 'Explore 63 Home Designs',
    buttonLink: '/designs',
    secondaryText: 'View 3D Virtual Tours',
    secondaryLink: '/designs?has_tour=true',
  },
  {
    title: 'The Delta Series &bull; Executive Living',
    subtitle: 'Expansive 36 sq double-storey master design featuring dual living zones & luxury finishes.',
    tagline: 'FLAGSHIP DESIGN RELEASE',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    buttonText: 'View Delta Series Plan',
    buttonLink: '/designs/delta-series',
    secondaryText: 'Knockdown Rebuild Service',
    secondaryLink: '/knockdown-rebuild',
  },
  {
    title: 'Turnkey House & Land Packages',
    subtitle: '100% fixed site costs in Austral, Cobbitty, Tahmoor, Leppington & Wilton growth corridors.',
    tagline: 'FIXED-PRICE HOUSE & LAND',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    buttonText: 'Browse Available Packages',
    buttonLink: '/packages',
    secondaryText: 'Download Package Guide',
    secondaryLink: '/contact',
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] overflow-hidden bg-brand-navy">
      {/* Slides Background */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center transform scale-105 transition-transform duration-10000"
            />
            {/* Gradient Overlays for contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-black/30" />
          </div>

          {/* Slide Content Overlay */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl text-white space-y-5">
                
                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 bg-brand-orange/90 backdrop-blur-sm px-3.5 py-1.5 rounded-md text-white text-xs font-black tracking-widest uppercase shadow">
                  <Award className="w-3.5 h-3.5" />
                  <span>{slide.tagline}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-brand-orange hover:bg-brand-orange-hover text-white font-extrabold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {slide.buttonText}
                  </Link>

                  {slide.secondaryLink && (
                    <Link
                      href={slide.secondaryLink}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm tracking-wide transition-all border border-white/30"
                    >
                      <Eye className="w-4 h-4 text-brand-orange" />
                      {slide.secondaryText}
                    </Link>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="pt-4 flex items-center gap-6 text-xs text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    100% Fixed Site Costs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                    4-Point Hold Inspections
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all focus:outline-none"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all focus:outline-none"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === current ? 'w-8 bg-brand-orange' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
