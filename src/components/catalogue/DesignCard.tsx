'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeDesign } from '@/types';
import { Bed, Bath, Car, Maximize2, Video, ArrowRight } from 'lucide-react';
import { formatSquares, formatSqm } from '@/lib/utils';

interface Props {
  design: HomeDesign;
}

export default function DesignCard({ design }: Props) {
  const [activeFacadeIndex, setActiveFacadeIndex] = useState(0);

  const triggerEnquiry = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', { detail: { context: `${design.name} (${design.houseSizeSquares} sq)` } })
    );
  };

  const facade = design.facades[activeFacadeIndex] || design.facades[0];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Facade Image & Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <Image
          src={facade.image}
          alt={`${design.name} - ${facade.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />

        {/* Square Size Badge */}
        <div className="absolute top-3.5 right-3.5 bg-brand-orange text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
          {formatSquares(design.houseSizeSquares)}
        </div>

        {/* 3D Virtual Tour Badge */}
        {design.virtualTourUrl && (
          <div className="absolute top-3.5 left-3.5 bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
            <Video className="w-3.5 h-3.5" />
            <span>3D TOUR</span>
          </div>
        )}

        {/* Bottom Banner on Image */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
              {design.dwellingType === 'single' ? 'Single Storey' : design.dwellingType === 'double' ? 'Double Storey' : design.dwellingType.toUpperCase()}
            </span>
            <span className="text-sm font-bold text-slate-100">
              Min Lot Width: {design.minLotWidth}m
            </span>
          </div>
          <span className="text-xs text-slate-200 font-medium">
            {formatSqm(design.houseSizeSqm)}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Series */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                {design.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {design.series} Architectural Series
              </p>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3.5 border-y border-slate-100 text-slate-700 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{design.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{design.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{design.garages} Car</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {design.description}
          </p>
        </div>

        {/* Actions Button Strip */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link
            href={`/designs/${design.slug}`}
            className="flex-1 py-2.5 px-3 rounded-lg bg-brand-navy hover:bg-brand-surface text-white text-xs font-bold text-center tracking-wide uppercase transition-colors flex items-center justify-center gap-1"
          >
            <span>View Floorplan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={triggerEnquiry}
            className="py-2.5 px-3.5 rounded-lg border border-slate-200 hover:border-brand-orange hover:text-brand-orange text-slate-700 text-xs font-bold uppercase transition-colors"
          >
            Enquire
          </button>
        </div>
      </div>

    </div>
  );
}
