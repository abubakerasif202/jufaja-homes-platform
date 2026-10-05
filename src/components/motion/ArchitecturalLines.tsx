'use client';

import { useReducedMotion } from '@/lib/use-reduced-motion';
import { motion } from 'framer-motion';

/** A drawn axonometric house study, not a representation of a specific project. */
export default function ArchitecturalLines({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  return <svg aria-hidden="true" viewBox="0 0 700 650" fill="none" className={`architectural-lines ${className}`}>
    {[
      'M90 440 350 590 620 430 360 280Z',
      'M90 440V230L350 80 620 230V430M350 590V380L90 230M350 380 620 230 350 80',
      'M90 230 220 85 480 85 620 230M220 85 350 230 480 85M350 230V380',
      'M140 465V310L235 365V520M450 530V375L560 310V465',
      'M10 480 350 675 690 475M350 20V640M35 200 350 15 675 205',
    ].map((d, index) => <motion.path key={d} d={d} stroke="currentColor" strokeWidth={index === 1 ? 1.4 : .7} strokeDasharray={index === 4 ? '5 9' : undefined} initial={reduced ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: index === 4 ? .4 : .8 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1.8, delay: reduced ? 0 : index * .16, ease: 'easeInOut' }} />)}
  </svg>;
}
