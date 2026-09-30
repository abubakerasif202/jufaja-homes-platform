import React from 'react';
import JufajaMark from './JufajaMark';

interface JufajaLogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function JufajaLogo({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
}: JufajaLogoProps) {
  const isDark = theme === 'dark';
  const isStacked = variant === 'stacked';

  const markSize = size === 'sm' ? 36 : size === 'lg' ? 56 : 44;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl';
  const subSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[11px]' : 'text-[9.5px]';

  if (isStacked) {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <JufajaMark size={markSize * 1.3} theme={theme} className="mb-2" />
        <div className="w-16 h-[1px] bg-jufaja-gold/40 mb-2" />
        <span
          className={`font-serif font-black tracking-[0.16em] uppercase ${titleSize} ${
            isDark ? 'text-jufaja-ivory' : 'text-jufaja-forest'
          }`}
        >
          JUFAJA
        </span>
        <div className={`flex items-center gap-1.5 uppercase font-semibold tracking-[0.28em] ${subSize} mt-0.5`}>
          <span className="text-jufaja-gold font-bold">CONSTRUCTIONS</span>
          <span className={isDark ? 'text-stone-300' : 'text-stone-500'}>PTY LTD</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <JufajaMark size={markSize} theme={theme} className="shrink-0 transition-transform duration-300 hover:scale-105" />
      <div className="h-9 w-[1px] bg-jufaja-gold/30 hidden sm:block" />
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif font-black tracking-[0.14em] uppercase ${titleSize} ${
            isDark ? 'text-jufaja-ivory' : 'text-jufaja-forest'
          }`}
        >
          JUFAJA
        </span>
        <div className={`flex items-center gap-1.5 uppercase font-semibold tracking-[0.24em] ${subSize} mt-1`}>
          <span className="text-jufaja-gold font-bold">CONSTRUCTIONS</span>
          <span className={`hidden sm:inline ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>PTY LTD</span>
        </div>
      </div>
    </div>
  );
}
