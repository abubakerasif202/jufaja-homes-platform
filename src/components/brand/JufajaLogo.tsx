import Image from 'next/image';

interface JufajaLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const responsiveWidths = {
  sm: 'w-[112px] min-[360px]:w-[128px] sm:w-[144px]',
  md: 'w-[210px] sm:w-[270px]',
  lg: 'w-[250px] sm:w-[315px]',
} as const;
const sizes = {
  sm: '(min-width: 640px) 144px, (min-width: 360px) 128px, 112px',
  md: '(min-width: 640px) 270px, 210px',
  lg: '(min-width: 640px) 315px, 250px',
} as const;

export default function JufajaLogo({
  className = '',
  theme = 'light',
  size = 'md',
}: JufajaLogoProps) {
  return (
    <Image
      src="/brand/jufaja-logo-transparent.png"
      alt=""
      width={1536}
      height={1024}
      sizes={sizes[size]}
      quality={90}
      priority={size === 'sm'}
      data-jufaja-logo={theme}
      className={`h-auto max-w-full object-contain ${responsiveWidths[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
