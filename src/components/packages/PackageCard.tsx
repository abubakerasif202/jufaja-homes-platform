'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PackageListing } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Bed, Bath, Car, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Image Banner with Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <Image
          src={pkg.facadeImage}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70" />

        {/* Status Pill */}
        <div className="absolute top-3.5 left-3.5 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow">
          {pkg.status}
        </div>

        {/* Suburb Pill */}
        <div className="absolute top-3.5 right-3.5 bg-brand-navy/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded shadow">
          {pkg.suburb}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[10px] font-bold text-slate-300 block uppercase tracking-wider">
            100% Fixed Turnkey Price
          </span>
          <span className="text-2xl font-black drop-shadow">
            {formatCurrency(pkg.price)}
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
            {pkg.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {pkg.designName} &bull; Lot: {pkg.lotSizeSqm} m²
          </p>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3.5 border-y border-slate-100 text-slate-700 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{pkg.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{pkg.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{pkg.garages} Car</span>
            </div>
          </div>

          {/* Fixed Cost Guarantee */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed Fixed Site Costs Included</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
          <Link
            href={`/packages/${pkg.slug}`}
            className="flex-1 py-2.5 px-3 rounded-lg bg-brand-navy hover:bg-brand-surface text-white text-xs font-bold text-center tracking-wide uppercase transition-colors flex items-center justify-center gap-1"
          >
            <span>Package Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={triggerEnquiry}
            className="py-2.5 px-3.5 rounded-lg border border-slate-200 hover:border-brand-orange hover:text-brand-orange text-slate-700 text-xs font-bold uppercase transition-colors"
          >
            Reserve
          </button>
        </div>
      </div>

    </div>
  );
}
