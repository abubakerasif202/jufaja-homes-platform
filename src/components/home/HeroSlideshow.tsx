'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { useInView, useReducedMotion } from 'framer-motion';
import ArchitecturalLines from '@/components/motion/ArchitecturalLines';
import ButtonLink from '@/components/ui/ButtonLink';
import { HERO_SLIDES } from '@/data/hero-slides';

const SLIDE_MS = 6000;
const FADE_MS = 1300;
const WARM_MS = 2500;
const SWIPE_PX = 48;
const COUNT = HERO_SLIDES.length;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Full-bleed property slideshow. All motion is CSS-driven and keyed to a single source of truth:
 * the active slide's progress bar. Its animationend advances the slide, so hover/focus/pause
 * simply pause the animation and no separate timer can drift out of sync.
 */
export default function HeroSlideshow() {
  // Resolved only after mount so the server HTML and first client render always match.
  const prefersReducedMotion = useReducedMotion();
  const scene = useRef<HTMLElement>(null);
  const inView = useInView(scene);
  const [pageHidden, setPageHidden] = useState(false);
  useEffect(() => {
    const update = () => setPageHidden(document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = mounted && Boolean(prefersReducedMotion);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [warm, setWarm] = useState(false);
  const activeRef = useRef(0);
  const clearPrevious = useRef<number | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  // Later slides mount after first paint so they never compete with the LCP image.
  useEffect(() => {
    setMounted(true);
    const timer = window.setTimeout(() => setWarm(true), WARM_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(
    () => () => {
      if (clearPrevious.current) window.clearTimeout(clearPrevious.current);
    },
    []
  );

  const goTo = useCallback((index: number) => {
    const target = ((index % COUNT) + COUNT) % COUNT;
    if (target === activeRef.current) {
      setCycle((c) => c + 1);
      return;
    }
    setPrevious(activeRef.current);
    activeRef.current = target;
    setActive(target);
    if (clearPrevious.current) window.clearTimeout(clearPrevious.current);
    clearPrevious.current = window.setTimeout(() => setPrevious(null), FADE_MS);
  }, []);

  const next = useCallback(() => goTo(activeRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(activeRef.current - 1), [goTo]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) next();
    else prev();
  };

  const paused = hovering || focused || userPaused || !inView || pageHidden;

  return (
    <section
      ref={scene}
      aria-roledescription="carousel"
      aria-label="Featured JUFAJA home designs"
      data-paused={paused}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHovering(false)}
      // Only keyboard focus pauses; a mouse click on a control must not leave the slideshow stuck paused.
      onFocus={(e) => e.target.matches(':focus-visible') && setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      style={{ '--hs-ms': `${SLIDE_MS}ms`, '--hs-fade': `${FADE_MS}ms` } as React.CSSProperties}
      className="hs cinematic-hero relative isolate -mt-[89px] h-[86svh] min-h-[500px] touch-pan-y overflow-hidden bg-jufaja-forest-950 text-white min-[360px]:-mt-[101px] lg:h-[100svh] lg:max-h-[1040px] lg:min-h-[600px]"
    >
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === active;
        const isPrevious = index === previous;
        // Warm only the next scene; avoid four full-screen downloads competing at once.
        const isNext = warm && inView && !pageHidden && index === (active + 1) % COUNT;
        if (index > 0 && !isActive && !isPrevious && !isNext) return null;
        const Heading = index === 0 ? 'h1' : 'h2';
        const alignRight = slide.align === 'right';
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${COUNT}`}
            aria-hidden={!isActive}
            className={`hs-slide absolute inset-0 ${isActive ? 'is-active z-20' : isPrevious ? 'is-previous z-10' : 'z-0'}`}
            style={{ '--fm': slide.focusMobile, '--fd': slide.focusDesktop } as React.CSSProperties}
          >
            <div className="hs-image-frame absolute inset-0">
              <Image
                src={slide.photo}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : 'eager'}
                quality={80}
                sizes="100vw"
                className="hs-img object-cover"
              />
            </div>
            {/* Readability: soft forest gradients sit under the copy so the house stays the hero */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-image-scrim" />
            <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-jufaja-forest-950/35 via-transparent to-transparent ${alignRight ? 'lg:hidden' : ''}`} />
            {alignRight && <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-jufaja-forest-950/35 via-transparent to-transparent lg:block" />}
            <div className="hs-copy absolute inset-0 z-40 flex items-end">
              <div className={`mx-auto w-full max-w-7xl px-4 pb-32 sm:px-6 lg:px-8 lg:pb-44 ${alignRight ? 'lg:text-right' : ''}`}>
                {index === 0 && (
                  <p className="eyebrow eyebrow--light hs-rise hidden items-center gap-3 sm:flex" style={{ '--d': '250ms' } as React.CSSProperties}>
                    <span aria-hidden="true" className="h-px w-10 bg-jufaja-gold-500" />
                    Australian Home Builders
                  </p>
                )}
                <Heading className={`type-hero mt-4 max-w-4xl text-white ${alignRight ? 'lg:ml-auto' : ''}`}>
                  {slide.lines.map((line, i) => {
                    const accent = i === slide.lines.length - 1;
                    const breakOnMobile = i === 0 && (line === 'Building Homes' || line === 'Homes Designed');
                    return (
                      <span key={line} className="hs-mask block pb-[0.1em]">
                        <span
                          className={`hs-line block ${accent ? 'font-medium italic text-jufaja-gold-400' : ''}`}
                          style={{ '--d': `${350 + i * 110}ms` } as React.CSSProperties}
                        >
                          {breakOnMobile ? <>{line.split(' ')[0]}{' '}<br className="sm:hidden" />{line.split(' ')[1]}</> : line}
                        </span>
                      </span>
                    );
                  })}
                </Heading>
                <p className={`hs-rise type-lead hero-lead mt-5 hidden max-w-xl text-jufaja-ivory/90 sm:block ${alignRight ? 'lg:ml-auto' : ''}`} style={{ '--d': '800ms' } as React.CSSProperties}>
                  {slide.copy}
                </p>
                <div className={`hs-rise hero-ctas mt-6 sm:mt-7 ${alignRight ? 'lg:flex lg:justify-end' : ''}`} style={{ '--d': '950ms' } as React.CSSProperties}>
                  <ButtonLink tabIndex={isActive ? undefined : -1} href={slide.cta.href} variant="gold">{slide.cta.label}</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div aria-hidden="true" className="hero-blueprint"><ArchitecturalLines /><span>FORM / SPACE / LIGHT</span></div>
      <div aria-hidden="true" className={`hero-detail ${HERO_SLIDES[active].align === 'right' ? 'hero-detail--left' : ''}`}>
        <div className="hero-detail__frame"><Image src={HERO_SLIDES[active].photo} alt="" fill sizes="320px" className="object-cover" /></div>
        <div className="hero-detail__label"><span>Design perspective</span><span>{pad(active + 1)} / {pad(COUNT)}</span></div>
      </div>
      <a href="#explore" className="hero-scroll"><span>Explore the possibilities</span><span aria-hidden="true">↓</span></a>

      {/* Top scrim keeps the transparent header legible */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30 h-40 bg-gradient-to-b from-jufaja-forest-950/60 to-transparent" />

      {/* Controls */}
      <div className="hero-controls absolute inset-x-0 bottom-14 z-50 lg:bottom-24">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <p aria-hidden="true" className="hidden shrink-0 text-xs font-bold tabular-nums tracking-[0.2em] text-white sm:block">
              {pad(active + 1)} <span className="text-white/50">/ {pad(COUNT)}</span>
            </p>
            <div role="group" aria-label="Choose slide" className="flex items-center">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Show slide ${index + 1}: ${slide.lines.join(' ')}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => goTo(index)}
                    className="group flex min-h-11 items-center px-1"
                  >
                    <span className="relative block h-[3px] w-9 overflow-hidden bg-white/35 transition-colors group-hover:bg-white/60 sm:w-14">
                      {isActive && (
                        <span
                          key={`${index}-${cycle}`}
                          className={`hs-fill absolute inset-0 origin-left bg-jufaja-gold-500 ${reduceMotion ? 'is-static' : warm ? 'is-running' : 'is-idle'}`}
                          onAnimationEnd={(e) => {
                            if (e.animationName === 'hs-progress' && !reduceMotion && !paused) next();
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="hidden truncate text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 md:block">Illustrative design images</p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                className="hs-ctl flex h-11 w-11 items-center justify-center text-white"
              >
                {userPaused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
              </button>
            )}
            <button type="button" onClick={prev} aria-label="Previous slide" className="hs-ctl hs-ctl--prev flex h-11 w-11 items-center justify-center border border-white/30 text-white">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button type="button" onClick={next} aria-label="Next slide" className="hs-ctl hs-ctl--next flex h-11 w-11 items-center justify-center border border-white/30 text-white">
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
