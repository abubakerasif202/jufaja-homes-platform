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
    <div className="bg-white rounded-sm border border-jufaja-border overflow-hidden shadow-sm">
      {/* Main Facade View */}
      <div className="relative h-[320px] sm:h-[440px] w-full bg-jufaja-stone">
        <Image
          src={activeFacade.image}
          alt={`Illustrative ${activeFacade.name} facade image for ${designName}; confirm the current design details with JUFAJA`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 66vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-6 left-6 text-white">
          <span className="eyebrow eyebrow--light mb-1 block">
            ILLUSTRATIVE FACADE IMAGE
          </span>
          <h3 className="type-h3 font-serif drop-shadow-md">
            {activeFacade.name}
          </h3>
        </div>
      </div>

      {/* Thumbnails Selector */}
      {facades.length > 1 && (
        <div className="p-4 bg-jufaja-stone border-t border-jufaja-border flex gap-4 overflow-x-auto">
          {facades.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              aria-pressed={idx === selectedIdx}
              aria-label={`Show illustrative ${f.name} facade`}
              className={`relative h-20 w-32 shrink-0 rounded-sm overflow-hidden border-2 transition-[transform,opacity,border-color] duration-300 cursor-pointer ${
                idx === selectedIdx
                  ? 'border-jufaja-gold-600 shadow-md scale-[1.02]'
                  : 'border-jufaja-border opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={f.image} alt="" fill sizes="128px" className="object-cover" />
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
