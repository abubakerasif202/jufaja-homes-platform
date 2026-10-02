'use client';

import { useRef, type ReactNode, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/** Pointer depth without React renders. Touch and reduced-motion remain static. */
export default function DepthFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 140, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 140, damping: 24 });
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse' || !frame.current) return;
    const rect = frame.current.getBoundingClientRect();
    x.set(((event.clientY - rect.top) / rect.height - .5) * -4);
    y.set(((event.clientX - rect.left) / rect.width - .5) * 4);
  }
  return <div ref={frame} className={`depth-frame ${className}`} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <motion.div className="h-full" style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}>{children}</motion.div>
  </div>;
}
