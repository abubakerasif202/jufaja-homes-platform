'use client';

import './hero-slideshow.css';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnimationEvent, CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { HERO_SLIDES } from '@/data/hero-slides';
import { useReducedMotion } from '@/lib/use-reduced-motion';

const SWIPE_DISTANCE_PX = 48;
const INTRO_SEEN_CLASS = 'jufaja-intro-seen';
const PROGRESS_ANIMATION = 'cv-hero-progress';
const COUNT = HERO_SLIDES.length;
const CROSSFADE_MS = 1100;

/** Resolves once the opening logo sequence has finished (or was never shown), so slide 1 is not animated unseen. */
function useIntroFinished() {
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const check = () => {
      if (root.classList.contains(INTRO_SEEN_CLASS)) {
        setFinished(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const observer = new MutationObserver(() => { if (check()) observer.disconnect(); });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return finished;
}

function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible');
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return visible;
}

/**
 * Cinematic hero. Slide 1 (and the only <h1>) is complete, visible server HTML. Rotation is driven by the gold
 * progress bar's CSS animation, so pausing (button, hover, focus, hidden tab) pauses the 5s clock with it and no
 * timers are left to clean up. Later slides are server-rendered but aria-hidden; their images mount after the intro.
 */
export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  // null follows the visitor's motion preference: paused for reduced motion, playing otherwise.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const introFinished = useIntroFinished();
  const pageVisible = usePageVisible();
  const reducedMotion = useReducedMotion();
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const clearPrevious = useRef<number | undefined>(undefined);

  const paused = userPaused ?? reducedMotion;
  const playing = introFinished && !paused && pageVisible;

  const goTo = useCallback((target: number) => {
    const destination = (target + COUNT) % COUNT;
    if (destination === index) return;
    setPrevious(index);
    setIndex(destination);
    setHasMoved(true);
    window.clearTimeout(clearPrevious.current);
    clearPrevious.current = window.setTimeout(() => setPrevious(null), CROSSFADE_MS + 200);
  }, [index]);

  useEffect(() => () => window.clearTimeout(clearPrevious.current), []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const back = useCallback(() => goTo(index - 1), [goTo, index]);

  const onProgressEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName === PROGRESS_ANIMATION) next();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_DISTANCE_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) next(); else back();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); back(); }
  };

  return (
    <section
      className="cv-hero"
      aria-roledescription="carousel"
      aria-labelledby="cv-hero-heading"
      data-motion={introFinished ? 'on' : 'off'}
      data-playing={playing ? 'true' : 'false'}
      onKeyDown={onKeyDown}
    >
      <h1 id="cv-hero-heading" className="cv-hero__brand">
        JUFAJA Constructions<span className="sr-only"> — home designs and building enquiries</span>
      </h1>

      <div
        className="cv-hero__stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { swipeStart.current = null; }}
        aria-live={playing ? 'off' : 'polite'}
      >
        {HERO_SLIDES.map((slide, i) => {
          const active = i === index;
          const state = active ? 'is-active' : i === previous ? 'is-previous' : '';
          const entering = active && hasMoved ? 'is-entering' : '';
          const mounted = i === 0 || introFinished;
          const focus = { '--focus-mobile': slide.focusMobile, '--focus-desktop': slide.focusDesktop } as CSSProperties;
          return (
            <div
              key={slide.id}
              className={`cv-slide ${state} ${entering}`.trim()}
              data-align={slide.align ?? 'center'}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${COUNT}: ${slide.eyebrow}`}
              aria-hidden={active ? undefined : true}
              style={focus}
            >
              {mounted && (
                <Image
                  src={slide.photo}
                  alt={active ? slide.alt : ''}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'eager'}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  quality={80}
                  sizes="100vw"
                  className="cv-hero__image"
                />
              )}
              <div className="cv-hero__shade" aria-hidden="true" />
              <div className="cv-hero__content">
                <p className="cv-kicker cv-hero__eyebrow">{slide.eyebrow}</p>
                <h2 className="cv-hero__headline">
                  {slide.lines.map((line, lineIndex) => (
                    <span key={line} className={lineIndex === slide.lines.length - 1 ? 'cv-hero__accent' : undefined}>{line} </span>
                  ))}
                </h2>
                <p className="cv-hero__copy">{slide.copy}</p>
                <Link href={slide.cta.href} className="cv-button cv-button--light cv-hero__cta" tabIndex={active ? undefined : -1}>
                  {slide.cta.label} <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <p className="cv-hero__caption">{slide.caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cv-hero__controls">
        <ol className="cv-hero__progress" aria-label="Choose a slide">
          {HERO_SLIDES.map((slide, i) => (
            <li key={slide.id}>
              <button
                type="button"
                className="cv-hero__dot"
                aria-label={`Go to slide ${i + 1}: ${slide.eyebrow}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                <span className="cv-hero__dot-track" aria-hidden="true">
                  {i === index && <span className="cv-hero__dot-fill" onAnimationEnd={onProgressEnd} />}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="cv-hero__buttons">
          <button type="button" className="cv-hero__control" onClick={back} aria-label="Previous slide"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button
            type="button"
            className="cv-hero__control"
            onClick={() => setUserPaused(!paused)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {paused ? <Play aria-hidden="true" size={20} /> : <Pause aria-hidden="true" size={20} />}
          </button>
          <button type="button" className="cv-hero__control" onClick={next} aria-label="Next slide"><ChevronRight aria-hidden="true" size={22} /></button>
        </div>
      </div>
    </section>
  );
}
