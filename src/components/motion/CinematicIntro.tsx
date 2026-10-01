'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface CinematicIntroProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'jufaja_intro_viewed';
const INTRO_MS = 1950;
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Short, once-per-session opening: a forest-green frame, a gold roofline drawing itself,
 * and the approved logo resolving on an ivory plate before the frame lifts to the hero.
 * The overlay is part of the server HTML; a beforeInteractive script hides it for returning sessions.
 */
export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const started = useRef(false);
  const skipButton = useRef<HTMLButtonElement>(null);

  const complete = useCallback(() => {
    if (started.current) return;
    started.current = true;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage can be disabled; the intro still remains skippable.
    }
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      // Play once per mount when session storage is unavailable.
    }
    if (seen || reduceMotion) {
      document.documentElement.classList.add('jufaja-intro-seen');
      if (reduceMotion) {
        try {
          window.sessionStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          // Nothing to persist when storage is unavailable.
        }
      }
      setVisible(false);
      return;
    }
    const timer = setTimeout(complete, INTRO_MS);
    return () => clearTimeout(timer);
  }, [complete, reduceMotion]);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    skipButton.current?.focus();
    const keepFocusInIntro = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        complete();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        skipButton.current?.focus();
      }
    };
    document.addEventListener('keydown', keepFocusInIntro);
    return () => {
      document.removeEventListener('keydown', keepFocusInIntro);
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [visible, complete]);

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.classList.add('jufaja-intro-seen')}>
      {visible && (
        <motion.div
          key="jufaja-intro"
          role="dialog"
          aria-label="JUFAJA Constructions logo introduction"
          aria-modal="true"
          initial={false}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="jufaja-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-jufaja-forest-950"
        >
          <div aria-hidden="true" className="jufaja-intro__grid bg-blueprint-dark pointer-events-none absolute inset-0" />
          <button
            ref={skipButton}
            type="button"
            onClick={complete}
            className="absolute right-4 top-4 z-10 min-h-11 rounded-sm border border-jufaja-gold-500/50 bg-jufaja-forest-900/60 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-jufaja-ivory transition-colors hover:bg-jufaja-forest-800 sm:right-8 sm:top-8"
          >
            Skip intro <span aria-hidden="true">→</span>
          </button>

          {/* Gold roofline drawing itself across the frame */}
          <svg aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
            <motion.path d="M-20 430 L360 430 L600 200 L840 430 L1220 430" fill="none" stroke="var(--jufaja-gold-500)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.1, ease: 'easeInOut' }} />
            <motion.path d="M-20 470 H1220" fill="none" stroke="var(--jufaja-gold-500)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="6 10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, delay: 0.3, ease: 'easeOut' }} />
          </svg>

          {/* Ivory plate keeps the dark-lettered approved logo legible */}
          <motion.div
            aria-hidden="true"
            initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0%)' }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="relative z-[1] bg-jufaja-cream px-8 py-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:px-14 sm:py-9"
          >
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-[3/2] w-[200px] sm:w-[300px]">
              <Image src="/brand/jufaja-logo-transparent.png" alt="" width={1536} height={1024} sizes="(min-width: 640px) 300px, 200px" quality={90} className="h-full w-full object-contain" />
            </motion.div>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 1.35, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-x-8 bottom-0 h-[3px] origin-left bg-jufaja-gold-500 sm:inset-x-14" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
