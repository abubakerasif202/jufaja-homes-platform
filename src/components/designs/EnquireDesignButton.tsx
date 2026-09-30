'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface EnquireDesignButtonProps {
  designName: string;
  squares: number;
  className?: string;
}

export default function EnquireDesignButton({ designName, squares, className }: EnquireDesignButtonProps) {
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
      className={className ?? 'w-full py-3 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2'}
    >
      <MessageSquare className="w-4 h-4" />
      <span>Enquire On This Design</span>
    </button>
  );
}
