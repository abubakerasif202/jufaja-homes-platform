import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/motion/Reveal';
import ArchitecturalLines from '@/components/motion/ArchitecturalLines';
import TextReveal from '@/components/motion/TextReveal';

const topics = [
  { number: '01', title: 'Personal service', copy: 'Talk about who you will work with and how communication should happen.' },
  { number: '02', title: 'Quality construction', copy: 'Ask how quality reviews are planned, recorded and shared during a build.' },
  { number: '03', title: 'Considered craftsmanship', copy: 'Discuss the materials, finishes and details that matter to you.' },
  { number: '04', title: 'Local experience', copy: 'Review your site, its context and the approvals that may apply.' },
];

export default function BrandDifference() {
  return <section className="difference-scene">
    <div className="difference-scene__statement"><p className="eyebrow">03 / The JUFAJA difference</p><h2 className="type-display mt-5"><TextReveal text="Consider every detail." /></h2><p className="type-lead mt-6 max-w-md text-jufaja-muted">Every home begins with different questions. Use these topics to shape a conversation about your plans.</p><ButtonLink href="/contact" variant="outline" className="mt-8">Talk through your plans</ButtonLink><ArchitecturalLines className="difference-scene__drawing" /></div>
    <div className="difference-scene__topics">{topics.map((topic, index) => <Reveal key={topic.number} delay={index * .06}><article className="difference-topic"><span>{topic.number}</span><div><h3>{topic.title}</h3><p>{topic.copy}</p></div></article></Reveal>)}</div>
  </section>;
}
