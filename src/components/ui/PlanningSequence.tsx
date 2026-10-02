import Reveal from '@/components/motion/Reveal';
import ParallaxImage from '@/components/motion/ParallaxImage';

/** Editorial question sequence. Numbers show reading order, never business statistics. */
export default function PlanningSequence({ eyebrow, title, items, image }: { eyebrow: string; title: string; items: { title: string; copy: string }[]; image?: string }) {
  return <section className="planning-scene">
    <div className="planning-scene__intro"><Reveal><p className="eyebrow">{eyebrow}</p><h2 className="type-h2 mt-4 text-jufaja-forest">{title}</h2></Reveal>{image && <Reveal mode="mask-up" curtain="bg-jufaja-stone" className="mt-8"><ParallaxImage src={image} alt="Illustrative architecture detail, not a JUFAJA project or confirmed inclusion" sizes="(min-width: 1024px) 35vw, 100vw" travel={3} frameClassName="aspect-[4/3]" className="object-cover" /><p className="mt-3 text-xs text-jufaja-muted">Illustrative architecture reference</p></Reveal>}</div>
    <div className="planning-scene__sequence">{items.map((item, index) => <Reveal key={item.title} delay={index * .05}><article><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article></Reveal>)}</div>
  </section>;
}
