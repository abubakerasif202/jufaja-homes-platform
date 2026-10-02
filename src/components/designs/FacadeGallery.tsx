'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FacadeOption } from '@/types';

interface Props {
  facades: FacadeOption[];
  designName: string;
}

export default function FacadeGallery({ facades, designName }: Props) {
  const reduced = useReducedMotion();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeFacade = facades[selectedIdx] || facades[0];

  return (
    <div className="bg-white rounded-sm border border-jufaja-border overflow-hidden shadow-sm">
      {/* Main Facade View */}
      <div className="facade-view relative h-[320px] sm:h-[440px] w-full bg-jufaja-stone">
        <AnimatePresence initial={false}><motion.div key={activeFacade.image + selectedIdx} className="absolute inset-0" initial={reduced ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .5 }}><Image
          src={activeFacade.image}
          alt={`Illustrative ${activeFacade.name} facade image for ${designName}; confirm the current design details with JUFAJA`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 66vw"
          className="object-cover"
        /></motion.div></AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-jufaja-forest-950/80 to-transparent" />

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
                  : 'border-jufaja-border hover:border-jufaja-gold-500'
              }`}
            >
              <Image src={f.image} alt="" fill sizes="128px" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-jufaja-forest-950/80 flex items-end p-1.5">
                <span className="text-[10px] font-bold text-white truncate drop-shadow">{f.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
