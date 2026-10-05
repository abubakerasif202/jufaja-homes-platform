'use client';

import { useReducedMotion } from '@/lib/use-reduced-motion';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps extends Omit<ImageProps, 'fill' | 'width' | 'height'> {
  /** Vertical travel, as a percentage of the frame height, across the scroll range. */
  travel?: number;
  frameClassName?: string;
}

function DesktopParallax({ frame, travel, children }: { frame: RefObject<HTMLDivElement>; travel: number; children: React.ReactNode }) {
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);
  return <motion.div className="absolute inset-0" style={{ y, scale: 1 + (travel * 2) / 100 }}>{children}</motion.div>;
}

/** Mobile, touch and reduced-motion render a static image without scroll subscriptions. */
export default function ParallaxImage({ travel = 8, frameClassName = '', className = '', alt, ...image }: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktopPointer, setDesktopPointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const update = () => setDesktopPointer(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const visual = <Image {...image} alt={alt} fill className={className} />;
  return (
    <div ref={frame} className={cn('relative overflow-hidden', frameClassName)}>
      {desktopPointer && reduceMotion === false && travel > 0
        ? <DesktopParallax frame={frame} travel={travel}>{visual}</DesktopParallax>
        : visual}
    </div>
  );
}
