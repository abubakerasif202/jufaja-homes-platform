import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import displayHomes from '@/data/display-homes.json';

export default function DisplayLocationsStrip() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black tracking-widest text-brand-orange uppercase">
            EXPERIENCE THE QUALITY IN PERSON
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">
            Visit Our Sydney Display Homes &amp; Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Walk through our award-winning architectural designs and discuss your block with a senior building specialist.
          </p>
        </div>

        {/* 4 Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayHomes.map((center) => (
            <div
              key={center.id}
              className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-200">
                <Image
                  src={center.image}
                  alt={center.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded">
                  {center.estateOrHub}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-brand-navy">
                    {center.suburb} &bull; {center.name.split('&bull;')[1]?.trim() || center.estateOrHub}
                  </h3>
                  
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{center.address}, {center.suburb} NSW {center.postcode}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span>{center.openingDays}: {center.openingHours}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <a href={`tel:${center.phone.replace(/\D/g, '')}`} className="font-semibold text-brand-navy hover:underline">
                        {center.phone}
                      </a>
                    </p>
                  </div>

                  {/* Designs on display */}
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">
                      On Display:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {center.designsOnDisplay.map((d, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <Link
                    href={`/display-homes#${center.id}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-brand-orange hover:text-brand-orange-hover"
                  >
                    <span>Location Details &amp; Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
