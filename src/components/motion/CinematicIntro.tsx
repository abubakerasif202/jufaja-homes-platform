'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import JufajaMark from '@/components/brand/JufajaMark';

interface CinematicIntroProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'jufaja_intro_viewed';

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const reduceMotion = useReducedMotion();
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    setExiting(true);
    exitTimer.current = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 450);
  }, [onComplete]);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      // Play once per mount when session storage is unavailable.
    }
    if (seen) return;

    setVisible(true);
    const timer = setTimeout(complete, reduceMotion ? 400 : 3050);
    return () => {
      clearTimeout(timer);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [complete, reduceMotion]);

  useEffect(() => {
    if (!visible) return;
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
    return () => document.removeEventListener('keydown', keepFocusInIntro);
  }, [visible, complete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="jufaja-intro"
          role="dialog"
          aria-label="JUFAJA Constructions logo introduction"
          aria-modal="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="jufaja-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-jufaja-cream"
        >
          <div aria-hidden="true" className="jufaja-intro__grid pointer-events-none absolute inset-0" />
          <button
            ref={skipButton}
            type="button"
            onClick={complete}
            className="absolute right-4 top-4 z-10 min-h-11 rounded-sm border border-jufaja-gold/40 bg-white/80 px-4 text-xs font-semibold text-jufaja-forest transition-colors hover:bg-white sm:right-8 sm:top-8"
          >
            Skip intro <span aria-hidden="true">→</span>
          </button>

          <div className="relative z-[1] flex flex-col items-center px-5 text-center">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={exiting ? { opacity: 0.65, y: -24, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.75, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="jufaja-intro__mark"
            >
              <JufajaMark size="clamp(120px, 26vw, 200px)" animated />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.55, delay: reduceMotion ? 0 : 1.45 }}
              className="mt-1 font-serif text-4xl font-semibold tracking-[0.14em] text-jufaja-forest sm:text-5xl"
            >
              JUFAJA
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.5, delay: reduceMotion ? 0 : 1.8 }}
              className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-jufaja-gold-600 sm:text-xs"
            >
              Constructions <span className="px-1 text-jufaja-muted">·</span> Pty Ltd
            </motion.p>
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.8, delay: reduceMotion ? 0 : 2.15, ease: 'easeInOut' }}
              className="mt-6 h-px w-40 origin-left bg-jufaja-gold-500 sm:w-56"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
