'use client';

import './inspiration-gallery.css';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

/** Wraps the marquee rows with one WCAG 2.2.2 pause/play control; the rows themselves are server-rendered. */
export default function GalleryMotionShell({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="cv-gallery" data-paused={paused ? 'true' : 'false'}>
      <button type="button" className="cv-gallery__toggle" onClick={() => setPaused((value) => !value)}>
        {paused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
        <span>{paused ? 'Play gallery motion' : 'Pause gallery motion'}</span>
      </button>
      {children}
    </div>
  );
}
