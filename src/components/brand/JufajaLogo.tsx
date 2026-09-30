import Image from 'next/image';

interface JufajaLogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const dimensions = {
  sm: { width: 225, height: 50 },
  md: { width: 270, height: 60 },
  lg: { width: 315, height: 70 },
} as const;
const responsiveWidths = {
  sm: 'w-[130px] min-[360px]:w-[160px] sm:w-[225px]',
  md: 'w-[210px] sm:w-[270px]',
  lg: 'w-[250px] sm:w-[315px]',
} as const;

export default function JufajaLogo({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
}: JufajaLogoProps) {
  const src = variant === 'stacked'
    ? '/brand/jufaja-logo-stacked.svg'
    : theme === 'dark'
      ? '/brand/jufaja-logo-dark.svg'
      : '/brand/jufaja-logo-horizontal.svg';
  const box = variant === 'stacked'
    ? { width: 140, height: 126 }
    : dimensions[size];

  return (
    <Image
      src={src}
      alt=""
      width={box.width}
      height={box.height}
      priority={size !== 'lg'}
      className={`h-auto max-w-full ${variant === 'stacked' ? 'w-[140px]' : responsiveWidths[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
