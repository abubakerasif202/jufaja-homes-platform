'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  duration?: number;
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.7,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 24 };
      case 'down':
        return { opacity: 0, y: -24 };
      case 'left':
        return { opacity: 0, x: 24 };
      case 'right':
        return { opacity: 0, x: -24 };
      default:
        return { opacity: 0, y: 24 };
    }
  };

  return (
    <motion.div
      initial={reduceMotion ? false : getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduceMotion ? 0.25 : duration, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
