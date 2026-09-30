'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface EnquireDesignButtonProps {
  designName: string;
  squares: number;
}

export default function EnquireDesignButton({ designName, squares }: EnquireDesignButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', { 
        detail: { context: `${designName} (${squares} sq)` } 
      })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow cursor-pointer flex items-center justify-center gap-2"
    >
      <MessageSquare className="w-4 h-4" />
      <span>Enquire On This Design</span>
    </button>
  );
}
