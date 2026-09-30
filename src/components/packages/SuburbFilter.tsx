'use client';

import React from 'react';

interface Props {
  suburbs: string[];
  selectedSuburb: string;
  onSelectSuburb: (suburb: string) => void;
}

export default function SuburbFilter({ suburbs, selectedSuburb, onSelectSuburb }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelectSuburb('all')}
        className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
          selectedSuburb === 'all'
            ? 'bg-brand-navy text-white shadow-sm'
            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
        }`}
      >
        All Sydney Suburbs
      </button>
      {suburbs.map((suburb) => (
        <button
          key={suburb}
          onClick={() => onSelectSuburb(suburb)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedSuburb.toLowerCase() === suburb.toLowerCase()
              ? 'bg-brand-navy text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          {suburb}
        </button>
      ))}
    </div>
  );
}
