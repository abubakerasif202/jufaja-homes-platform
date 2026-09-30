'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ReservePackageButtonProps {
  title: string;
  suburb: string;
  formattedPrice: string;
}

export default function ReservePackageButton({ title, suburb, formattedPrice }: ReservePackageButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', {
        detail: { context: `${title} - ${suburb} (${formattedPrice})` }
      })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-full mt-4 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-extrabold text-xs uppercase tracking-wider shadow transition-all cursor-pointer flex items-center justify-center gap-2"
    >
      <MessageSquare className="w-4 h-4" />
      <span>Reserve This Lot / Enquire</span>
    </button>
  );
}
