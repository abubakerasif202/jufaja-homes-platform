'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import JufajaMark from '@/components/brand/JufajaMark';

interface CinematicIntroProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'jufaja_intro_viewed';

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Render the fixed overlay in the initial HTML; a beforeInteractive script
  // hides it for sessions that have already completed the intro.
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const started = useRef(false);
  const introStartedAt = useRef<number | null>(null);
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
    if (seen) {
      setVisible(false);
      return;
    }

    introStartedAt.current ??= Date.now();
    const duration = reduceMotion ? 0 : 3050;
    const remaining = Math.max(0, duration - (Date.now() - introStartedAt.current));
    const timer = setTimeout(complete, remaining);
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
    <AnimatePresence>
      {visible && (
        <motion.div
          key="jufaja-intro"
          role="dialog"
          aria-label="JUFAJA Constructions logo introduction"
          aria-modal="true"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.45, ease: [0.22, 1, 0.36, 1] }}
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
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.75, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="jufaja-intro__mark"
            >
              <JufajaMark size="clamp(120px, 26vw, 200px)" animated />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.55, delay: reduceMotion ? 0 : 1.45 }}
              className="jufaja-intro__wordmark mt-1 font-serif text-4xl font-semibold tracking-[0.14em] text-jufaja-forest sm:text-5xl"
            >
              JUFAJA
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.5, delay: reduceMotion ? 0 : 1.8 }}
              className="jufaja-intro__descriptor mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-jufaja-gold-600 sm:text-xs"
            >
              Constructions <span className="px-1 text-jufaja-muted">·</span> Pty Ltd
            </motion.p>
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.8, delay: reduceMotion ? 0 : 2.15, ease: 'easeInOut' }}
              className="jufaja-intro__divider mt-6 h-px w-40 origin-left bg-jufaja-gold-500 sm:w-56"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
