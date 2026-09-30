'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Home, 
  Calendar, 
  ArrowRight,
  Compass
} from 'lucide-react';
import displayHomesData from '@/data/display-homes.json';

export default function DisplayHomesPage() {
  const handleBookVisit = (locationName: string) => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', {
        detail: { context: `Display Village Visit Appointment: ${locationName.replace(/&bull;/g, '-')}` }
      })
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner - Light Architectural */}
      <section className="bg-jufaja-ivory py-16 md:py-24 relative overflow-hidden border-b border-jufaja-border">
        {/* Background Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-jufaja-gold/40 text-jufaja-forest text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Compass className="w-3.5 h-3.5 text-jufaja-gold" />
              <span>Experience JUFAJA Craftsmanship In Person</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-jufaja-forest tracking-tight leading-tight">
              Sydney Display Home Villages &amp; Studios
            </h1>
            <p className="text-jufaja-muted text-base sm:text-lg leading-relaxed font-sans">
              Step inside our exquisitely finished display residences across Sydney's premier display villages in Box Hill, Leppington, Cobbitty, and our Prestons Design Studio. Feel the soaring ceiling heights, inspect the artisan joinery, and imagine your family living here.
            </p>
          </div>
        </div>
      </section>

      {/* Display Locations Grid */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayHomesData.map((center) => (
            <div 
              key={center.id}
              id={center.id}
              className="bg-white rounded-2xl border border-jufaja-border overflow-hidden shadow-sm hover:shadow-md hover:border-jufaja-gold/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-jufaja-stone">
                  <Image
                    src={center.image}
                    alt={center.name.replace(/&bull;/g, '-')}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-md bg-jufaja-forest/90 backdrop-blur-sm text-jufaja-ivory text-xs font-medium uppercase tracking-wider border border-jufaja-gold/30">
                      {center.estateOrHub}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded bg-jufaja-forest text-white text-[11px] font-semibold">
                      {center.openingDays}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h2 
                      className="text-2xl font-serif font-bold text-jufaja-forest"
                      dangerouslySetInnerHTML={{ __html: center.name }}
                    />
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-jufaja-muted mt-2 font-sans">
                      <MapPin className="w-4 h-4 text-jufaja-gold shrink-0" />
                      <span>{center.address}, {center.suburb} NSW {center.postcode}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-jufaja-border/60 text-xs font-sans">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-jufaja-gold uppercase tracking-wider block">Opening Hours</span>
                      <p className="font-semibold text-jufaja-charcoal flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-jufaja-gold" />
                        <span>{center.openingHours}</span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-jufaja-gold uppercase tracking-wider block">Telephone Enquiries</span>
                      <a href={`tel:${center.phone.replace(/\D/g, '')}`} className="font-semibold text-jufaja-forest hover:text-jufaja-gold flex items-center gap-1.5 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-jufaja-gold" />
                        <span>{center.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Designs on display */}
                  <div>
                    <h3 className="text-xs font-semibold text-jufaja-forest uppercase tracking-wider mb-2 font-sans">
                      Featured Designs On Display:
                    </h3>
                    <ul className="space-y-1.5 text-xs text-jufaja-muted font-sans">
                      {center.designsOnDisplay.map((design, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-jufaja-gold"></span>
                          <span>{design}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex flex-wrap gap-3">
                <button
                  onClick={() => handleBookVisit(center.name)}
                  className="flex-1 py-3 px-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-jufaja-gold/40"
                >
                  <Calendar className="w-3.5 h-3.5 text-jufaja-gold" />
                  <span>Book Private Tour</span>
                </button>

                <a
                  href={center.mapEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-lg border border-jufaja-border hover:bg-jufaja-ivory text-jufaja-forest font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Google Map</span>
                  <ExternalLink className="w-3.5 h-3.5 text-jufaja-gold" />
                </a>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
