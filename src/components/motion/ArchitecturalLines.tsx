'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ArchitecturalLinesProps {
  variant?: 'divider' | 'corner' | 'grid';
  className?: string;
}

export default function ArchitecturalLines({
  variant = 'divider',
  className = '',
}: ArchitecturalLinesProps) {
  if (variant === 'divider') {
    return (
      <div className={`relative flex items-center justify-center my-12 ${className}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-jufaja-gold/40 to-transparent"
        />
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute w-2 h-2 bg-jufaja-gold/60 border border-white"
        />
      </div>
    );
  }

  if (variant === 'corner') {
    return (
      <div className={`absolute pointer-events-none ${className}`}>
        <div className="w-4 h-4 border-t border-l border-jufaja-gold/50" />
        <div className="w-1.5 h-1.5 bg-jufaja-forest/20 mt-1 ml-1" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 bg-blueprint-fine pointer-events-none opacity-40 ${className}`} />
  );
}
