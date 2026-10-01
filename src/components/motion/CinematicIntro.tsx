'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

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
  const artwork = useRef<HTMLDivElement>(null);
  const [docking, setDocking] = useState(false);
  const [destination, setDestination] = useState({ x: 0, y: 0, scale: 1 });

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
      document.documentElement.classList.add('jufaja-intro-seen');
      setVisible(false);
      return;
    }

    introStartedAt.current ??= Date.now();
    const duration = reduceMotion ? 0 : 2900;
    const remaining = Math.max(0, duration - (Date.now() - introStartedAt.current));
    const timer = setTimeout(complete, remaining);
    return () => clearTimeout(timer);
  }, [complete, reduceMotion]);

  useEffect(() => {
    if (!visible || reduceMotion) return;
    const timer = setTimeout(() => {
      const headerLogo = document.querySelector('header [data-jufaja-logo]');
      if (!headerLogo || !artwork.current) return;
      const target = headerLogo.getBoundingClientRect();
      const current = artwork.current.getBoundingClientRect();
      setDestination({
        x: target.left + target.width / 2 - current.left - current.width / 2,
        y: target.top + target.height / 2 - current.top - current.height / 2,
        scale: target.width / current.width,
      });
      setDocking(true);
    }, 2450);
    return () => clearTimeout(timer);
  }, [visible, reduceMotion]);

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
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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

          <motion.div
            ref={artwork}
            aria-hidden="true"
            initial={false}
            animate={docking ? destination : { x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] aspect-[3/2] w-[240px] sm:w-[360px]"
          >
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: ['inset(0 0 100% 0)', 'inset(0 0 38% 0)', 'inset(0 0 0% 0)'] }}
              transition={{ duration: reduceMotion ? 0 : 1.95, delay: reduceMotion ? 0 : 0.3, times: [0, 0.62, 1], ease: 'easeInOut' }}
              className="jufaja-intro__artwork absolute inset-0"
            >
              <Image src="/brand/jufaja-logo-transparent.png" alt="" width={1536} height={1024} sizes="(min-width: 640px) 360px, 240px" quality={90} priority className="h-full w-full object-contain" />
            </motion.div>
            {!reduceMotion && <svg aria-hidden="true" viewBox="0 0 1536 1024" className="pointer-events-none absolute inset-0 h-full w-full">
              <motion.path d="M304 628 L744 334 L1109 612 L1216 624" fill="none" stroke="var(--jufaja-gold-500)" strokeWidth="4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.6, 0] }} transition={{ duration: 1.15, delay: 0.1, times: [0, 0.45, 1] }} />
              <motion.path d="M304 628 L744 334 L1109 612 L1216 624" fill="none" stroke="var(--jufaja-gold-400)" strokeWidth="3" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.35, 0] }} transition={{ duration: 0.45, delay: 2.05, times: [0, 0.45, 1] }} />
            </svg>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
