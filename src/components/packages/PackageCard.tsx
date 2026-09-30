'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PackageListing } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Bed, Bath, Car, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';

interface Props {
  pkg: PackageListing;
}

export default function PackageCard({ pkg }: Props) {
  const triggerEnquiry = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', { detail: { context: `${pkg.title} - ${pkg.suburb} (${formatCurrency(pkg.price)})` } })
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-jufaja-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group">
      
      {/* Image Banner with Badges */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-100">
        <Image
          src={pkg.facadeImage}
          alt={pkg.title}
          fill
          className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jufaja-forest/80 via-transparent to-transparent opacity-70" />

        {/* Status Pill */}
        <div className="absolute top-3.5 left-3.5 bg-jufaja-forest text-white text-[10px] font-bold px-3 py-1 rounded-full shadow border border-jufaja-gold/40">
          <span className="text-jufaja-gold mr-1">&bull;</span>
          {pkg.status}
        </div>

        {/* Suburb Pill */}
        <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm text-jufaja-forest text-xs font-bold px-3 py-1 rounded-lg shadow-sm border border-stone-200 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-jufaja-gold" />
          <span>{pkg.suburb}</span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3.5 left-4 right-4 text-white">
          <span className="text-[10px] font-bold text-jufaja-gold block uppercase tracking-wider">
            Turnkey Package Price
          </span>
          <span className="text-2xl font-serif font-black drop-shadow-sm">
            {formatCurrency(pkg.price)}
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-jufaja-forest group-hover:text-jufaja-gold transition-colors">
            {pkg.title}
          </h3>
          <p className="text-xs text-stone-500 mt-1 font-medium">
            Paired with {pkg.designName} &bull; Lot: {pkg.lotSizeSqm} m²
          </p>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3.5 border-y border-stone-100 text-stone-700 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{pkg.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{pkg.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{pkg.garages} Car</span>
            </div>
          </div>

          {/* Turnkey Inclusions Strip */}
          <div className="flex items-center gap-1.5 text-xs text-jufaja-forest font-semibold mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
            <span>Complete Turnkey Inclusions Specified</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2.5">
          <Link
            href={`/packages/${pkg.slug}`}
            className="flex-1 py-2.5 px-3 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold text-center tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-1.5 border border-jufaja-gold/40"
          >
            <span>Package Details</span>
            <ArrowRight className="w-3 h-3 text-jufaja-gold" />
          </Link>
          <button
            onClick={triggerEnquiry}
            className="py-2.5 px-3.5 rounded-lg border border-stone-300 hover:border-jufaja-gold hover:text-jufaja-gold text-stone-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Reserve
          </button>
        </div>
      </div>

    </div>
  );
}
