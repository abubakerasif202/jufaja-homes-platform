'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';

/** Native touch scrolling with equivalent keyboard/button controls. */
export default function CatalogueRail({ children }: { children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const id = useId();
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({ back: false, forward: false });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const back = element.scrollLeft > 4;
      const forward = element.scrollLeft + element.clientWidth < element.scrollWidth - 4;
      setEdges(previous => previous.back === back && previous.forward === forward ? previous : { back, forward });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => {
      resize.disconnect();
      element.removeEventListener('scroll', update);
    };
  }, []);

  function advance(direction: number) {
    const element = rail.current;
    if (!element) return;
    const card = element.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? element.clientWidth) + gap), behavior: reduced ? 'auto' : 'smooth' });
  }

  return <div className="catalogue-rail">
    <div className="catalogue-rail__toolbar">
      <p id={`${id}-hint`}><MoveHorizontal aria-hidden="true" /> <span>Swipe or use the arrows to explore</span></p>
      <div role="group" aria-label="Home design collection controls">
        <button type="button" aria-label="Previous home designs" aria-controls={id} disabled={!edges.back} onClick={() => advance(-1)}><ArrowLeft aria-hidden="true" /></button>
        <button type="button" aria-label="Next home designs" aria-controls={id} disabled={!edges.forward} onClick={() => advance(1)}><ArrowRight aria-hidden="true" /></button>
      </div>
    </div>
    <div ref={rail} id={id} role="region" aria-label="Featured home design collection" aria-describedby={`${id}-hint`} tabIndex={0} className="featured-rail">{children}</div>
  </div>;
}
