'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FloorplanLevel } from '@/types';
import { Maximize2, X, Download } from 'lucide-react';

interface Props {
  floorplans: FloorplanLevel[];
  designName: string;
}

export default function FloorplanViewer({ floorplans, designName }: Props) {
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activePlan = floorplans[activeLevelIndex] || floorplans[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-brand-navy">Architectural Floorplans</h3>
          <p className="text-xs text-slate-500 mt-0.5">Explore detailed room flow, dimensions, and living zones</p>
        </div>

        {/* Level Switcher Tabs */}
        {floorplans.length > 1 && (
          <div className="inline-flex p-1 bg-slate-100 rounded-lg">
            {floorplans.map((plan, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLevelIndex(idx)}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeLevelIndex === idx
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-navy'
                }`}
              >
                {plan.level}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Floorplan Canvas */}
      <div className="relative mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[460px] group">
        
        {/* Fullscreen Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 hover:text-brand-orange transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Zoom Plan</span>
        </button>

        {/* Floorplan Image */}
        <div className="relative w-full h-[360px] sm:h-[440px]">
          <Image
            src={activePlan.image}
            alt={`${designName} - ${activePlan.level}`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Floorplan Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div>
                <h4 className="text-xl font-bold text-brand-navy">{designName} &bull; {activePlan.level}</h4>
                <p className="text-xs text-slate-500">High-Resolution Architectural Schematic</p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative w-full h-[65vh] my-4">
              <Image
                src={activePlan.image}
                alt={`${designName} Fullscreen`}
                fill
                className="object-contain"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="px-6 py-2 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-brand-surface"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
