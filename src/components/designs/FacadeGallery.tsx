'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FacadeOption } from '@/types';

interface Props {
  facades: FacadeOption[];
  designName: string;
}

export default function FacadeGallery({ facades, designName }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeFacade = facades[selectedIdx] || facades[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Main Facade View */}
      <div className="relative h-[320px] sm:h-[440px] w-full bg-slate-900">
        <Image
          src={activeFacade.image}
          alt={`${designName} - ${activeFacade.name}`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-6 left-6 text-white">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-1">
            SELECTED FAÇADE
          </span>
          <h3 className="text-2xl sm:text-3xl font-black drop-shadow-md">
            {activeFacade.name}
          </h3>
        </div>
      </div>

      {/* Thumbnails Selector */}
      {facades.length > 1 && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-4 overflow-x-auto">
          {facades.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative h-20 w-32 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                idx === selectedIdx
                  ? 'border-brand-orange shadow-md scale-102'
                  : 'border-slate-300 opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={f.image} alt={f.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-1.5">
                <span className="text-[10px] font-bold text-white truncate drop-shadow">{f.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
