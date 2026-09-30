import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, ArrowRight, Compass } from 'lucide-react';
import displayHomes from '@/data/display-homes.json';

export default function DisplayLocationsStrip() {
  return (
    <section className="py-24 bg-jufaja-ivory relative overflow-hidden border-t border-jufaja-border">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jufaja-gold/10 border border-jufaja-gold/30 text-jufaja-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Consultation &amp; Experience Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest tracking-tight">
            Visit Our Design Studio &amp; Locations
          </h2>
          <p className="text-sm sm:text-base text-jufaja-muted mt-3 font-sans">
            Experience JUFAJA architectural craftsmanship in person. Review tactile material palettes, examine structural specifications, and discuss your block with our building specialists.
          </p>
        </div>

        {/* 4 Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayHomes.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-xl overflow-hidden border border-jufaja-border shadow-sm hover:shadow-md hover:border-jufaja-gold/40 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-jufaja-stone">
                <Image
                  src={center.image}
                  alt={center.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-jufaja-forest/90 backdrop-blur-sm text-jufaja-ivory text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded border border-jufaja-gold/30">
                  {center.estateOrHub}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif text-jufaja-forest font-semibold">
                    {center.suburb} &bull; {center.name.split('&bull;')[1]?.trim() || center.estateOrHub}
                  </h3>
                  
                  <div className="mt-3.5 space-y-2 text-xs text-jufaja-muted font-sans">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-jufaja-gold shrink-0 mt-0.5" />
                      <span>{center.address}, {center.suburb} NSW {center.postcode}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
                      <span>{center.openingDays}: {center.openingHours}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
                      <a href={`tel:${center.phone.replace(/\D/g, '')}`} className="font-semibold text-jufaja-forest hover:text-jufaja-gold transition-colors">
                        {center.phone}
                      </a>
                    </p>
                  </div>

                  {/* Designs on display */}
                  <div className="mt-4 pt-3 border-t border-jufaja-border/60">
                    <span className="text-[10px] font-semibold text-jufaja-gold uppercase tracking-wider block mb-1.5">
                      On Display / Consultations:
                    </span>
                    <ul className="text-xs text-jufaja-charcoal space-y-1">
                      {center.designsOnDisplay.map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-jufaja-forest/60"></span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-jufaja-border/40">
                  <Link
                    href={`/display-homes#${center.id}`}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-jufaja-forest hover:text-jufaja-gold transition-colors"
                  >
                    <span>Location Details &amp; Directions</span>
                    <ArrowRight className="w-3.5 h-3.5 text-jufaja-gold" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
