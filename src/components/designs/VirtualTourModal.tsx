'use client';

import React, { useState } from 'react';
import { Video, X, ExternalLink } from 'lucide-react';

interface Props {
  virtualTourUrl: string | null;
  designName: string;
}

export default function VirtualTourModal({ virtualTourUrl, designName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!virtualTourUrl) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <Video className="w-4 h-4" />
        <span>Experience 3D Virtual Tour</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[80vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-700">
            
            {/* Modal Header */}
            <div className="bg-brand-navy p-4 px-6 text-white flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-brand-orange" />
                <h4 className="text-lg font-bold">{designName} &bull; Matterport 3D Tour</h4>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Matterport Iframe */}
            <div className="flex-1 w-full h-full bg-black">
              <iframe
                src={virtualTourUrl}
                title={`${designName} 3D Tour`}
                className="w-full h-full border-0"
                allowFullScreen
                allow="xr-spatial-tracking"
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
