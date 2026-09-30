import React from 'react';

interface JufajaMarkProps {
  className?: string;
  size?: number | string;
  theme?: 'light' | 'dark';
  animated?: boolean;
}

export default function JufajaMark({ className = 'w-10 h-10', size, theme = 'light', animated = false }: JufajaMarkProps) {
  const isDark = theme === 'dark';
  const roofColor = 'var(--jufaja-gold-500)';
  const leftGreen = isDark ? 'var(--jufaja-green-700)' : 'var(--jufaja-green-900)';
  const burgundy = isDark ? 'var(--jufaja-burgundy-500)' : 'var(--jufaja-burgundy-700)';
  const gold = isDark ? 'var(--jufaja-gold-400)' : 'var(--jufaja-gold-500)';
  const goldLight = isDark ? 'var(--jufaja-ivory)' : 'var(--jufaja-gold-400)';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={`${className} ${animated ? 'jufaja-mark--animated' : ''}`}
      style={size ? { width: size, height: size } : undefined}
      aria-label="JUFAJA Constructions Official Emblem"
    >
      {/* Subtle Blueprint Datum Grid */}
      <g opacity="0.12" stroke={roofColor} strokeWidth="0.5">
        <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2 2" />
        <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="38" strokeDasharray="1 3" />
      </g>

      {/* Architectural Pitched Gable Roofline */}
      <path
        className={animated ? 'mark-roof' : undefined}
        d="M14 44 L48 18 L82 44"
        stroke={roofColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 44 L48 22 L76 44"
        stroke={goldLight}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* 4-Pane Architectural Window Under Gable */}
      <g className={animated ? 'mark-window' : undefined} fill={roofColor} opacity="0.9">
        <rect x="45.5" y="46" width="3.2" height="3.2" rx="0.4" />
        <rect x="50" y="46" width="3.2" height="3.2" rx="0.4" />
        <rect x="45.5" y="50.5" width="3.2" height="3.2" rx="0.4" />
        <rect x="50" y="50.5" width="3.2" height="3.2" rx="0.4" />
      </g>

      {/* Left Element: Architectural 'J' Green Spine */}
      <path
        className={animated ? 'mark-spine' : undefined}
        d="M26 44 L36 36 V76 H26 V44 Z"
        fill={leftGreen}
      />

      {/* Center & J Hook: Antique Brushed Gold */}
      <path
        className={animated ? 'mark-j' : undefined}
        d="M38 28 L46 22 L52 27 V74 C52 83 45 89 36 89 C27 89 22 83 22 79 C22 76.5 23.8 75 26.2 75 C28.5 75 30 76.5 30.8 78 C32 80 34 82 36.5 82 C40.5 82 44 79 44 72 V28 Z"
        fill={gold}
      />

      {/* Right Architectural Towers (Burgundy, Gold, Burgundy) */}
      {/* Tower 1: Burgundy */}
      <path
        className={animated ? 'mark-tower mark-tower--one' : undefined}
        d="M58 24 L63 28 V60 H58 V24 Z"
        fill={burgundy}
        stroke={goldLight}
        strokeWidth="0.6"
      />
      {/* Tower 2: Gold */}
      <path
        className={animated ? 'mark-tower mark-tower--two' : undefined}
        d="M65 30 L70 34 V60 H65 V30 Z"
        fill={gold}
        stroke={goldLight}
        strokeWidth="0.6"
      />
      {/* Tower 3: Burgundy */}
      <path
        className={animated ? 'mark-tower mark-tower--three' : undefined}
        d="M72 36 L77 40 V60 H72 V36 Z"
        fill={burgundy}
        stroke={goldLight}
        strokeWidth="0.6"
      />

      {/* Architectural Foundation Baseline with Gold Framing */}
      <line
        x1="14"
        y1="93"
        x2="86"
        y2="93"
        stroke={roofColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <polygon points="50,91 52,93 50,95 48,93" fill={goldLight} />
    </svg>
  );
}
