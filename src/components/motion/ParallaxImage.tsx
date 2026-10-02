'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps extends Omit<ImageProps, 'fill' | 'width' | 'height'> {
  /** Vertical travel, as a percentage of the frame height, across the scroll range. */
  travel?: number;
  frameClassName?: string;
}

/** Image that drifts slightly against the scroll. Static under prefers-reduced-motion. */
export default function ParallaxImage({ travel = 8, frameClassName = '', className = '', alt, ...image }: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);
  const scale = 1 + (travel * 2) / 100;

  return (
    <div ref={frame} className={cn('relative overflow-hidden', frameClassName)}>
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { y, scale }}>
        <Image {...image} alt={alt} fill className={className} />
      </motion.div>
    </div>
  );
}
