import React from 'react';

interface JufajaMarkProps {
  className?: string;
  size?: number | string;
  theme?: 'light' | 'dark';
}

export default function JufajaMark({ className = 'w-10 h-10', size, theme = 'light' }: JufajaMarkProps) {
  const isDark = theme === 'dark';
  const roofColor = isDark ? '#dfc17b' : '#c5a059';
  const leftPillarColor = isDark ? '#2d5e48' : '#163024';
  const rightPillarColor = isDark ? '#9e3049' : '#6b1d2f';
  const centerGold = isDark ? '#dfc17b' : '#c5a059';
  const goldHighlight = isDark ? '#fff4d4' : '#dfc17b';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="JUFAJA Constructions Emblem"
    >
      {/* Subtle Blueprint Datum Grid */}
      <g opacity="0.12" stroke={roofColor} strokeWidth="0.5">
        <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2 2" />
        <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="38" strokeDasharray="1 3" />
      </g>

      {/* Architectural Pitched Gable Roofline */}
      <path
        d="M14 42 L50 14 L86 42"
        stroke={roofColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 43 L50 21 L78 43"
        stroke={roofColor}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Left Pillar: Deep Forest Green */}
      <path d="M24 43.5 L36 34.2 V78 H24 V43.5 Z" fill={leftPillarColor} />

      {/* Right Pillar: Deep Burgundy */}
      <path d="M64 34.2 L76 43.5 V78 H64 V34.2 Z" fill={rightPillarColor} />

      {/* Center Pillar & Architectural 'J' Monogram */}
      <path
        d="M44 26 L50 21.3 L56 26 V74 C56 84 48 90 38 90 C28 90 23 83.5 23 79 C23 76.5 24.8 75 27.2 75 C29.5 75 31 76.5 31.8 78 C33 80.2 35.2 82.5 38.5 82.5 C43 82.5 47 79 47 72 V26 Z"
        fill={centerGold}
      />

      {/* Keyline Spine Highlight */}
      <path
        d="M50 24 V72"
        stroke={goldHighlight}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Architectural Foundation Baseline */}
      <line
        x1="16"
        y1="94"
        x2="84"
        y2="94"
        stroke={roofColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
