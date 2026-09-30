'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeDesign } from '@/types';
import { Bed, Bath, Car, Video, ArrowRight, Compass } from 'lucide-react';
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
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-jufaja-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group">
      
      {/* Facade Image Frame */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-100">
        <Image
          src={facade.image}
          alt={`${design.name} - ${facade.name}`}
          fill
          className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jufaja-forest/80 via-transparent to-transparent opacity-70" />

        {/* Square Size Badge (Gold) */}
        <div className="absolute top-3.5 right-3.5 bg-jufaja-forest text-white text-[11px] font-bold px-3 py-1 rounded-full shadow border border-jufaja-gold/40">
          <span className="text-jufaja-gold mr-1">&bull;</span>
          {formatSquares(design.houseSizeSquares)}
        </div>

        {/* 3D Virtual Tour Badge */}
        {design.virtualTourUrl && (
          <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md text-jufaja-forest text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm border border-stone-200">
            <Video className="w-3 h-3 text-jufaja-gold" />
            <span className="tracking-wider">3D TOUR</span>
          </div>
        )}

        {/* Bottom Banner on Image */}
        <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-end text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-jufaja-gold block">
              {design.dwellingType === 'single'
                ? 'Single Storey'
                : design.dwellingType === 'double'
                ? 'Double Storey'
                : design.dwellingType.toUpperCase()}
            </span>
            <span className="text-xs font-semibold text-stone-200">
              Min Frontage: {design.minLotWidth}m
            </span>
          </div>
          <span className="text-xs text-stone-300 font-medium">
            {formatSqm(design.houseSizeSqm)}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Series */}
          <div className="mb-3">
            <h3 className="font-serif font-bold text-xl text-jufaja-forest group-hover:text-jufaja-gold transition-colors">
              {design.name}
            </h3>
            <p className="text-[11px] text-stone-400 font-medium tracking-wide uppercase mt-0.5">
              {design.series} Architectural Series
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-stone-700 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{design.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{design.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{design.garages} Car</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-3 font-normal">
            {design.description}
          </p>
        </div>

        {/* Actions Button Strip */}
        <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-2.5">
          <Link
            href={`/designs/${design.slug}`}
            className="flex-1 py-2.5 px-3 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold text-center tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-1.5 border border-jufaja-gold/40"
          >
            <span>View Floorplan</span>
            <ArrowRight className="w-3 h-3 text-jufaja-gold" />
          </Link>
          <button
            onClick={triggerEnquiry}
            className="py-2.5 px-3.5 rounded-lg border border-stone-300 hover:border-jufaja-gold hover:text-jufaja-gold text-stone-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Enquire
          </button>
        </div>
      </div>

    </div>
  );
}
