'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function TextReveal({ text, className = '' }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  return <span className={className}>
    <span className="sr-only">{text}</span>
    {text.split(' ').map((word, index) => <span key={`${word}-${index}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom mr-[.2em] pb-[.08em]">
      <motion.span data-text-reveal-word className="inline-block" initial={reduced ? false : { y: '110%', rotate: 3 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : index * .065, ease: [.16, 1, .3, 1] }}>{word}</motion.span>
    </span>)}
  </span>;
}
