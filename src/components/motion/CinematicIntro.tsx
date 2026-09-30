'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check session storage so users aren't interrupted on internal navigation
    const hasSeenIntro = sessionStorage.getItem('jufaja_intro_viewed');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro) {
      onComplete?.();
      return;
    }

    if (prefersReducedMotion) {
      sessionStorage.setItem('jufaja_intro_viewed', 'true');
      const timer = setTimeout(() => {
        onComplete?.();
      }, 400);
      return () => clearTimeout(timer);
    }

    // First visit: trigger cinematic intro
    setIsVisible(true);

    const autoTimer = setTimeout(() => {
      handleComplete();
    }, 3600);

    return () => clearTimeout(autoTimer);
  }, []);

  const handleComplete = () => {
    setIsExiting(true);
    sessionStorage.setItem('jufaja_intro_viewed', 'true');
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-canvas"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#faf8f5] overflow-hidden select-none pointer-events-auto"
      >
        {/* Architectural Blueprint Grid Lines */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />

        {/* Ambient Subtle Gold Radial Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-jufaja-gold/10 to-transparent blur-3xl pointer-events-none" />

        {/* Discrete Skip Button */}
        <button
          onClick={handleComplete}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full border border-jufaja-gold/40 text-jufaja-forest/70 hover:text-jufaja-forest hover:border-jufaja-gold text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer bg-white/70 backdrop-blur-sm"
        >
          Skip Intro &rarr;
        </button>

        {/* Main Architectural Drafting Canvas */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex flex-col items-center justify-center">
          
          {/* Drafting Corner Registration Marks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-jufaja-gold" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-jufaja-gold" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-jufaja-gold" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-jufaja-gold" />
          </motion.div>

          <svg
            viewBox="0 0 160 160"
            className="w-48 h-48 sm:w-56 sm:h-56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Scene 1: Subtle Compass Alignment Circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="68"
              stroke="#c5a059"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Scene 2: Architectural House Drafting Profile (Stroke Animation) */}
            <motion.path
              d="M30 76 L80 32 L130 76"
              stroke="#c5a059"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M40 76 L80 41 L120 76"
              stroke="#c5a059"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            />

            {/* Scene 3: Structural Vertical Elements Rise */}
            
            {/* 1. Left Pillar: Deep Forest Green */}
            <motion.path
              d="M44 78 L60 65.5 V122 H44 V78 Z"
              fill="#163024"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* 2. Center Spine & Foundation 'J': Antique Brushed Gold */}
            <motion.path
              d="M72 54 L80 47.7 L88 54 V117 C88 130 78 138 65 138 C52 138 45 129.5 45 124 C45 121 47 119 50 119 C53 119 55 121 56 123 C57.5 126 60.5 128.5 65 128.5 C71 128.5 76 124 76 114 V54 Z"
              fill="#c5a059"
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Fine Gold Core Highlight Spine */}
            <motion.path
              d="M80 50 V114"
              stroke="#dfc17b"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            />

            {/* 3. Right Pillar: Deep Burgundy */}
            <motion.path
              d="M100 65.5 L116 78 V122 H100 V65.5 Z"
              fill="#6b1d2f"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Scene 4: Foundation Baseline & Traveling Gold Highlight */}
            <motion.line
              x1="32"
              y1="144"
              x2="128"
              y2="144"
              stroke="#c5a059"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 1.8, ease: 'easeOut' }}
            />
          </svg>

          {/* Scene 4.5: Official 3D Metallic Emblem Luster Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-4 w-48 h-28 sm:w-56 sm:h-32 pointer-events-none flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src="/brand/jufaja-mark-3d.png"
                alt="JUFAJA Constructions 3D Metallic Emblem"
                fill
                className="object-contain drop-shadow-[0_8px_16px_rgba(22,48,36,0.15)]"
                priority
              />
            </div>
          </motion.div>

          {/* Scene 5: Typography Reveal */}
          <div className="text-center mt-2 overflow-hidden">
            <motion.h1
              initial={{ y: 18, opacity: 0, letterSpacing: '0.08em' }}
              animate={{ y: 0, opacity: 1, letterSpacing: '0.18em' }}
              transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-black text-2xl sm:text-3xl text-jufaja-forest uppercase tracking-[0.18em]"
            >
              JUFAJA
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.3, ease: 'easeOut' }}
              className="flex items-center justify-center gap-1.5 mt-1 text-[10px] sm:text-xs font-bold tracking-[0.32em] text-jufaja-gold uppercase"
            >
              <span>CONSTRUCTIONS</span>
              <span className="text-stone-400 font-medium tracking-[0.2em]">PTY LTD</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="text-[10px] text-stone-500 font-medium italic mt-2 tracking-wide"
            >
              Building with confidence. Living with pride.
            </motion.p>
          </div>
        </div>

        {/* Bottom Architectural Blueprint Dimension Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="absolute bottom-6 text-[10px] font-mono tracking-widest text-stone-400 uppercase"
        >
          REF: SYD-RES-2026 // ARCHITECTURAL MASTERY
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
