'use client';

import { useEffect, useState } from 'react';

/** Decorative architectural forms; never presented as completed project imagery. */
export default function ArchitecturalMotionStage() {
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState === 'visible');
    const frame = requestAnimationFrame(() => {
      updateVisibility();
      setReady(true);
    });
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  return (
    <div className="architectural-stage" data-moving={ready && visible && !paused}>
      <div className="architectural-stage__scene" aria-hidden="true">
        <div className="architectural-stage__ground" />
        {['left', 'centre', 'right'].map((position) => (
          <div className={`architectural-stage__model architectural-stage__model--${position}`} key={position}>
            <span className="architectural-stage__plane architectural-stage__plane--front" />
            <span className="architectural-stage__plane architectural-stage__plane--back" />
            <span className="architectural-stage__plane architectural-stage__plane--left" />
            <span className="architectural-stage__plane architectural-stage__plane--right" />
            <span className="architectural-stage__plane architectural-stage__plane--roof" />
            <span className="architectural-stage__base" />
          </div>
        ))}
      </div>
      {ready && (
        <button
          type="button"
          className="architectural-stage__control"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
      )}
    </div>
  );
}
