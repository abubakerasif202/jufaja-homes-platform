'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import ButtonLink from '@/components/ui/ButtonLink';
import { JUFAJA_PROJECTS } from '@/data/projects';

const SLIDE_MS = 6500;
const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE_PROJECT_IDS = ['arden-grove', 'verdant-kdrb', 'meridian-duplex'];

const slides = SLIDE_PROJECT_IDS.flatMap((id) => {
  const project = JUFAJA_PROJECTS.find((p) => p.id === id);
  return project ? [{ ...project, image: project.image.replace('w=1200', 'w=2000') }] : [];
});

const headlineLines = ['Building Homes', 'for a Brighter'];

const quickLinks = [
  { href: '/designs', label: 'Home designs' },
  { href: '/custom-homes', label: 'Custom homes' },
  { href: '/knockdown-rebuild', label: 'Knockdown rebuild' },
];

export default function HeroCinematic() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [stopped, setStopped] = useState(false);
  // Later slides mount after first paint so they never compete with the LCP image.
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setWarm(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reduceMotion || stopped || hovering || !warm || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, stopped, hovering, warm, active]);

  const triggerEnquiry = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', {
        detail: { context: 'Homepage Hero: Site Appraisal & Feasibility Request' },
      })
    );
  };

  const current = slides[active];

  return (
    <section
      aria-label="JUFAJA Constructions introduction"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className="relative isolate overflow-hidden bg-jufaja-forest-950 text-white lg:min-h-[calc(100svh-100px)]">
      {/* Imagery: stacked above the copy on mobile, full-bleed behind it on desktop */}
      <div className="relative h-[30svh] min-h-[200px] w-full lg:absolute lg:inset-0 lg:h-auto">
        {slides.map((slide, index) => (index === 0 || warm || index === active) && (
          <div
            key={slide.id}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${index === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={slide.image}
              alt={index === active ? `${slide.title}: illustrative residential design image` : ''}
              fill
              priority={index === 0}
              quality={80}
              sizes="100vw"
              className={`object-cover object-center ${reduceMotion ? '' : index === active ? 'scale-100 duration-[7000ms]' : 'scale-110'} transition-transform ease-out`}
            />
          </div>
        ))}
        {/* Scrims: desktop left-to-right reading gradient, mobile fade into the copy panel */}
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-jufaja-forest-950 via-jufaja-forest-950/80 to-jufaja-forest-950/10 lg:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-jufaja-forest-950 to-transparent lg:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-jufaja-forest-950 to-transparent lg:hidden" />
      </div>

      <div aria-hidden="true" className="bg-blueprint-dark pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-14 pt-6 sm:px-6 lg:min-h-[calc(100svh-100px)] lg:px-8 lg:pb-8 lg:pt-0">
        <div className="hero-block max-w-3xl lg:my-auto lg:py-10">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="eyebrow eyebrow--light flex items-center gap-3"
          >
            <span aria-hidden="true" className="h-px w-10 bg-jufaja-gold-500" />
            Australian Home Builders
          </motion.p>

          <h1 className="type-hero mt-5 text-white lg:mt-6">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block font-medium italic text-jufaja-gold-400"
                initial={reduceMotion ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.44, ease: EASE }}
              >
                Tomorrow.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="hero-lead type-lead mt-7 max-w-xl text-jufaja-ivory/85"
          >
            Explore considered home designs and practical information to help you start planning your build.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="hero-ctas mt-9 flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            <ButtonLink href="/designs" variant="gold">Explore Home Designs</ButtonLink>
            <ButtonLink href="/projects" variant="outline-light" arrow={false}>Our Work</ButtonLink>
            <button
              type="button"
              onClick={triggerEnquiry}
              className="hover-gold-sweep min-h-11 px-2 text-xs font-bold uppercase tracking-[0.14em] text-jufaja-ivory transition-colors hover:text-jufaja-gold-400"
            >
              Request Consultation
            </button>
          </motion.div>
        </div>

        {/* Bottom rail: service index, slide caption and controls */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="hero-rail mt-14 grid gap-8 border-t border-jufaja-gold-500/40 pt-6 lg:mt-4 lg:grid-cols-2 lg:items-end lg:gap-12"
        >
          <ul className="grid grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <li key={link.href}>
                <Link href={link.href} className="group block rounded-sm py-1">
                  <span className="hero-rail-num text-[11px] font-bold tabular-nums text-jufaja-gold-400">0{index + 1}</span>
                  <span className="hero-rail-label mt-1 block text-xs font-semibold leading-snug text-white transition-colors group-hover:text-jufaja-gold-300 sm:text-sm">{link.label}</span>
                  <span aria-hidden="true" className="hero-rail-bar mt-2 block h-px w-6 bg-jufaja-gold-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {current && (
            <div className="flex items-end justify-between gap-5 lg:justify-end lg:pr-44 min-[1360px]:pr-0">
              <div className="min-w-0 text-left lg:text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-jufaja-gold-400">Design concept · illustrative image</p>
                <p className="mt-1 font-serif text-lg text-white">{current.title}</p>
              </div>
              {slides.length > 1 && (
                <div role="group" aria-label="Choose hero image" className="flex shrink-0 items-center gap-1">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Show image ${index + 1}: ${slide.title}`}
                      aria-pressed={index === active}
                      onClick={() => {
                        setActive(index);
                        setStopped(true);
                      }}
                      className="group flex min-h-11 min-w-9 items-center justify-center"
                    >
                      <span className={`block h-[3px] rounded-none transition-all duration-500 ${index === active ? 'w-9 bg-jufaja-gold-500' : 'w-5 bg-white/40 group-hover:bg-white/80'}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
