'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import ParallaxImage from '@/components/motion/ParallaxImage';
import Reveal from '@/components/motion/Reveal';

const DEPTH_PX = 14;
const SPRING = { stiffness: 90, damping: 18, mass: 0.6 };

/** Framed portrait of Javed Iqbal with a pointer-responsive depth layer behind the frame. */
export default function LeadershipPortrait() {
  const reduceMotion = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const backX = useSpring(useTransform(px, (v) => v * -DEPTH_PX), SPRING);
  const backY = useSpring(useTransform(py, (v) => v * -DEPTH_PX), SPRING);
  const frontX = useSpring(useTransform(px, (v) => v * (DEPTH_PX / 3)), SPRING);
  const frontY = useSpring(useTransform(py, (v) => v * (DEPTH_PX / 3)), SPRING);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse' || !frame.current) return;
    const rect = frame.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={frame}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
    >
      {/* Depth layers: an offset gold-edged outline and a burgundy block that drift against the pointer */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: backX, y: backY }}
        className="absolute -bottom-5 -left-5 right-5 top-5 border border-jufaja-gold-500/60 sm:-bottom-7 sm:-left-7 sm:right-7 sm:top-7"
      />
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: backX, y: backY }}
        className="absolute -bottom-5 -left-5 h-24 w-24 bg-jufaja-burgundy-700 sm:-bottom-7 sm:-left-7 sm:h-32 sm:w-32"
      />

      <motion.div style={reduceMotion ? undefined : { x: frontX, y: frontY }} className="relative">
        <Reveal mode="mask-up" duration={1.1}>
          <div className="relative bg-jufaja-forest-900 p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)]">
            <ParallaxImage
              src="/brand/javed-iqbal-executive.png"
              alt="Portrait of Javed Iqbal in a navy suit and tie"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 26rem, 90vw"
              quality={88}
              travel={3}
              frameClassName="aspect-[1122/1402] w-full"
              className="object-cover object-[50%_18%]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-2 bg-gradient-to-t from-jufaja-forest-950/70 via-transparent to-transparent" />
            <div className="absolute inset-x-2 bottom-2 flex items-end justify-between gap-3 p-4 sm:p-5 lg:hidden">
              <div>
                <p className="font-serif text-xl text-white sm:text-2xl">Javed Iqbal</p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-jufaja-gold-400">JUFAJA Constructions</p>
              </div>
              <span aria-hidden="true" className="mb-1 h-px w-12 bg-jufaja-gold-500" />
            </div>
          </div>
        </Reveal>
      </motion.div>
    </div>
  );
}
