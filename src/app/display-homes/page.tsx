'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Sparkles, 
  Home, 
  Calendar, 
  ArrowRight,
  Navigation
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
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-brand-navy text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="JUFAJA Display Village"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              <span>Experience JUFAJA Quality In Person</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Sydney Display Home Villages
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={center.image}
                    alt={center.name.replace(/&bull;/g, '-')}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-md bg-brand-navy/90 backdrop-blur-sm text-white text-xs font-extrabold uppercase tracking-wider">
                      {center.estateOrHub}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded bg-emerald-600 text-white text-[11px] font-bold">
                      {center.openingDays}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h2 
                      className="text-2xl font-black text-brand-navy"
                      dangerouslySetInnerHTML={{ __html: center.name }}
                    />
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-2">
                      <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>{center.address}, {center.suburb} NSW {center.postcode}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-orange" />
                        Hours
                      </span>
                      <p className="font-extrabold text-slate-800">{center.openingHours}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-brand-orange" />
                        Enquiries
                      </span>
                      <a href={`tel:${center.phone.replace(/[^0-9]/g, '')}`} className="font-extrabold text-brand-navy hover:text-brand-orange">
                        {center.phone}
                      </a>
                    </div>
                  </div>

                  {/* Designs on display */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                      Homes On Display At This Village:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {center.designsOnDisplay.map((d, dIdx) => (
                        <span 
                          key={dIdx}
                          className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-brand-navy text-xs font-bold"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex flex-wrap gap-3">
                <button
                  onClick={() => handleBookVisit(center.name)}
                  className="flex-1 py-3 px-4 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Tour</span>
                </button>
                <a
                  href={center.mapEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-brand-navy" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Cannot Visit In Person CTA */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Virtual Experience
          </span>
          <h3 className="text-2xl font-black text-brand-navy">
            Can't Visit In Person Today? Take A 3D Matterport Tour
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Walk through our furnished homes from your computer or phone. Experience full 360-degree dollhouse views, measure room dimensions, and explore finishes online.
          </p>
          <div className="pt-2">
            <Link
              href="/designs?tour=true"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-navy hover:bg-slate-800 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow"
            >
              <span>Explore 3D Virtual Walkthroughs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
