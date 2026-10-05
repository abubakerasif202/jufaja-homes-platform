'use client';

import { startTransition, useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Hydrate deterministically; preference updates must not interrupt pending hydration. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => startTransition(() => setReduced(media.matches));
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}
