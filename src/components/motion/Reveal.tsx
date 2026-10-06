'use client';

import React, { useEffect, useRef } from 'react';

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
/** Pixels inside the viewport edge an element must cross before it counts as revealed. */
const TRIGGER_MARGIN = 60;

const fadeOffset: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: OFFSET },
  down: { x: 0, y: -OFFSET },
  left: { x: OFFSET, y: 0 },
  right: { x: -OFFSET, y: 0 },
};

const maskAxis: Record<Exclude<RevealMode, 'fade'>, { axis: 'x' | 'y'; origin: string }> = {
  'mask-up': { axis: 'y', origin: 'origin-top' },
  'mask-left': { axis: 'x', origin: 'origin-right' },
};

/**
 * Progressive-enhancement scroll reveal. The server markup is always fully visible; after
 * hydration, only elements that start below the fold are armed (hidden) and then released by an
 * IntersectionObserver. The state lives in a data attribute so React never re-renders the subtree.
 */
function useScrollReveal(watched: React.RefObject<HTMLElement | null>, armedSelector: string | null) {
  useEffect(() => {
    const watchedElement = watched.current;
    const armedElement = armedSelector ? watchedElement?.querySelector<HTMLElement>(armedSelector) : watchedElement;
    if (!watchedElement || !armedElement) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (watchedElement.getBoundingClientRect().top < window.innerHeight - TRIGGER_MARGIN) return;

    armedElement.setAttribute('data-state', 'armed');
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      armedElement.setAttribute('data-state', 'shown');
      observer.disconnect();
    }, { rootMargin: `0px 0px -${TRIGGER_MARGIN}px 0px` });
    observer.observe(watchedElement);
    return () => {
      observer.disconnect();
      armedElement.setAttribute('data-state', 'shown');
    };
  }, [watched, armedSelector]);
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  mode = 'fade',
  curtain = 'bg-jufaja-forest-950',
  className = '',
  duration = 0.8,
}: RevealProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  useScrollReveal(wrapper, mode === 'fade' ? null : '[data-reveal-curtain]');

  const timing = { '--reveal-duration': `${duration}s`, '--reveal-delay': `${delay}s` } as React.CSSProperties;

  if (mode !== 'fade') {
    const { axis, origin } = maskAxis[mode];
    return (
      <div ref={wrapper} className={`relative overflow-hidden ${className}`}>
        {children}
        <div
          data-reveal-curtain
          data-axis={axis}
          aria-hidden="true"
          style={timing}
          className={`pointer-events-none absolute inset-0 z-10 ${origin} ${curtain}`}
        />
      </div>
    );
  }

  const { x, y } = fadeOffset[direction];
  return (
    <div
      ref={wrapper}
      data-reveal
      style={{ ...timing, '--reveal-x': `${x}px`, '--reveal-y': `${y}px` } as React.CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
