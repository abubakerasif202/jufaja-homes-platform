'use client';

import './hero-slideshow.css';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnimationEvent, KeyboardEvent, PointerEvent } from 'react';
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

/** Six-second showcase; the image stage stays separate from editorial content and controls. */
export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const introFinished = useIntroFinished();
  const pageVisible = usePageVisible();
  const reducedMotion = useReducedMotion();
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const clearPrevious = useRef<number | undefined>(undefined);
  const paused = userPaused ?? reducedMotion;
  const playing = introFinished && !paused && pageVisible && !hovered;

  const goTo = useCallback((target: number) => {
    const destination = (target + COUNT) % COUNT;
    if (destination === index) return;
    setPrevious(index);
    setIndex(destination);
    window.clearTimeout(clearPrevious.current);
    clearPrevious.current = window.setTimeout(() => setPrevious(null), CROSSFADE_MS + 200);
  }, [index]);
  useEffect(() => () => window.clearTimeout(clearPrevious.current), []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const back = useCallback(() => goTo(index - 1), [goTo, index]);
  const onProgressEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (playing && event.animationName === PROGRESS_ANIMATION) next();
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') swipeStart.current = { x: event.clientX, y: event.clientY };
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
  const slide = HERO_SLIDES[index];
  const concept = slide.photo.startsWith('/images/architecture/');

  return (
    <section className="cv-hero" aria-roledescription="carousel" aria-label="Architectural showcase"
      data-motion={introFinished ? 'on' : 'off'} data-playing={playing ? 'true' : 'false'} onKeyDown={onKeyDown}
      onFocusCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null) && event.target.matches(':focus-visible')) setUserPaused(true); }}>
      <div className="cv-hero__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}
        onPointerCancel={() => { swipeStart.current = null; }}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true); }}
        onPointerLeave={() => setHovered(false)} aria-live={playing ? 'off' : 'polite'}>
        {HERO_SLIDES.map((item, i) => {
          const active = i === index;
          const mounted = i === 0 || active || i === previous || (introFinished && i === (index + 1) % COUNT);
          return (
            <div key={item.id} className={`cv-slide ${active ? 'is-active' : i === previous ? 'is-previous' : ''}`}
              role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${COUNT}: ${item.eyebrow}`} aria-hidden={active ? undefined : true}>
              {mounted && <Image src={item.photo} alt={active ? item.alt : ''} fill priority={i === 0}
                loading={i === 0 ? undefined : 'eager'} fetchPriority={i === 0 ? 'high' : 'low'} quality={80}
                sizes="(min-width: 1100px) 54vw, 100vw" className="cv-hero__image" />}
            </div>
          );
        })}
      </div>
      <div className="cv-hero__details">
        <p className="cv-hero__caption">{slide.eyebrow} · {concept ? 'Illustrative architectural concept' : 'Third-party inspiration photograph'}<br />Not a completed JUFAJA project</p>
        {HERO_SLIDES.map((item, i) => <Link key={item.id} href={item.cta.href} className="cv-hero__cta cv-card-link"
          hidden={i !== index} tabIndex={i === index ? undefined : -1} data-slide-index={i}>
          {item.cta.label} <ArrowRight aria-hidden="true" size={16} />
        </Link>)}
      </div>
      <div className="cv-hero__controls">
        <ol className="cv-hero__progress" aria-label="Choose a slide">
          {HERO_SLIDES.map((item, i) => <li key={item.id}><button type="button" className="cv-hero__dot"
            aria-label={`Go to slide ${i + 1}: ${item.eyebrow}`} aria-current={i === index ? 'true' : undefined} onClick={() => goTo(i)}>
            <span className="cv-hero__dot-track" aria-hidden="true">{i === index && <span className="cv-hero__dot-fill" onAnimationEnd={onProgressEnd} />}</span>
          </button></li>)}
        </ol>
        <div className="cv-hero__buttons">
          <button type="button" className="cv-hero__control" onClick={back} aria-label="Previous slide"><ChevronLeft aria-hidden="true" size={20} /></button>
          <button type="button" className="cv-hero__control" onClick={() => setUserPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
            {paused ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
          </button>
          <button type="button" className="cv-hero__control" onClick={next} aria-label="Next slide"><ChevronRight aria-hidden="true" size={20} /></button>
        </div>
      </div>
    </section>
  );
}
