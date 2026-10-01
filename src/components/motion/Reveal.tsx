'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealDirection = 'up' | 'down' | 'left' | 'right';
type RevealMode = 'fade' | 'mask-up' | 'mask-left';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: RevealDirection;
  /** `fade` translates and fades; `mask-*` wipes a curtain off the content (the content itself is never clipped, so images still lazy-load). */
  mode?: RevealMode;
  /** Background utility class for the curtain in mask modes; match the surface behind the content. */
  curtain?: string;
  className?: string;
  duration?: number;
}

const OFFSET = 24;
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeFrom: Record<RevealDirection, { opacity: number; x?: number; y?: number }> = {
  up: { opacity: 0, y: OFFSET },
  down: { opacity: 0, y: -OFFSET },
  left: { opacity: 0, x: OFFSET },
  right: { opacity: 0, x: -OFFSET },
};

const maskAxis: Record<Exclude<RevealMode, 'fade'>, { from: { scaleY: number } | { scaleX: number }; to: { scaleY: number } | { scaleX: number }; origin: string }> = {
  'mask-up': { from: { scaleY: 1 }, to: { scaleY: 0 }, origin: 'origin-top' },
  'mask-left': { from: { scaleX: 1 }, to: { scaleX: 0 }, origin: 'origin-right' },
};

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  mode = 'fade',
  curtain = 'bg-jufaja-forest-950',
  className = '',
  duration = 0.8,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0.25 : duration, delay: reduceMotion ? 0 : delay, ease: EASE };

  if (mode !== 'fade') {
    const axis = maskAxis[mode];
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {children}
        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? axis.to : axis.from}
          whileInView={axis.to}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...transition, ease: [0.76, 0, 0.24, 1] }}
          className={`pointer-events-none absolute inset-0 z-10 ${axis.origin} ${curtain}`}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : fadeFrom[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
