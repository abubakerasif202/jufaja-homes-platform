import type { ReactNode } from 'react';
import ParallaxImage from '@/components/motion/ParallaxImage';
import Reveal from '@/components/motion/Reveal';
import ArchitecturalLines from '@/components/motion/ArchitecturalLines';

export default function PageHero({ children, image, label = 'Architecture reference', tone = 'green' }: { children: ReactNode; image: string; label?: string; tone?: 'green' | 'ivory' | 'burgundy' }) {
  return <section className={`page-hero page-hero--${tone}`}>
    <div className="page-hero__copy"><Reveal>{children}</Reveal></div>
    <Reveal mode="mask-left" className="page-hero__visual" curtain={tone === 'ivory' ? 'bg-jufaja-stone' : 'bg-jufaja-forest-950'}>
      <ParallaxImage src={image} alt={label === 'Architecture reference' ? 'Illustrative residential architecture reference, not a completed JUFAJA project' : label} sizes="(min-width: 1024px) 48vw, 100vw" priority travel={4} frameClassName="absolute inset-0" className="object-cover" />
      <div className="page-hero__caption">{label === 'Architecture reference' ? 'Illustrative image · architecture reference' : label}</div>
    </Reveal>
    <ArchitecturalLines className="page-hero__drawing" />
    <span aria-hidden="true" className="page-hero__index">JUFAJA / CONSTRUCTIONS</span>
  </section>;
}
