import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import ParallaxImage from '@/components/motion/ParallaxImage';
import TextReveal from '@/components/motion/TextReveal';
import ButtonLink from '@/components/ui/ButtonLink';
import { JUFAJA_PROJECTS } from '@/data/projects';
export type { ProjectShowcase } from '@/data/projects';

export default function SelectedProjects() {
  return <section id="our-work" className="project-scene">
    <div className="project-scene__heading"><Reveal><p className="eyebrow eyebrow--light">04 / Space. Light. Possibility.</p><h2 className="type-display mt-4"><TextReveal text="Architectural studies." /></h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/70">A small collection of residential design studies. These images are illustrative references, not completed JUFAJA projects.</p></Reveal><ButtonLink href="/projects" variant="outline-light">View design studies</ButtonLink></div>
    <div className="project-scene__gallery">
      {JUFAJA_PROJECTS.map((project, index) => <article key={project.id} className={`project-study ${index === 0 ? 'project-study--lead' : ''}`}>
        <Reveal mode={index % 2 ? 'mask-left' : 'mask-up'} duration={1.1}>
          <Link href={`/contact?project=${encodeURIComponent(project.title)}`} className="project-study__image group" aria-label={`Discuss ${project.title}`}>
            <ParallaxImage src={project.image} alt={`${project.title}, illustrative concept image`} sizes={index === 0 ? '(min-width: 1024px) 100vw, 100vw' : '(min-width: 1024px) 50vw, 100vw'} travel={5} frameClassName="absolute inset-0" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="project-study__badge">{project.category}</span><span className="project-study__arrow"><ArrowUpRight aria-hidden="true" /></span><span className="project-study__caption">Illustrative image · not a completed project</span>
          </Link>
        </Reveal>
        <div className="project-study__info"><span aria-hidden="true" className="project-study__number">0{index + 1}</span><div><p className="eyebrow eyebrow--light">{project.study}</p><h3 className="mt-3 font-serif text-3xl sm:text-4xl">{project.title}</h3><p className="mt-3 max-w-lg text-sm leading-7 text-white/70">{project.description}</p></div></div>
      </article>)}
    </div>
  </section>;
}
