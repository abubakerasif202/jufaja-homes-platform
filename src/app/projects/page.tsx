import React from 'react';
import { pageMetadata } from '@/lib/site-metadata';
import ParallaxImage from '@/components/motion/ParallaxImage';
import Reveal from '@/components/motion/Reveal';
import PageHero from '@/components/ui/PageHero';
import ButtonLink from '@/components/ui/ButtonLink';
import { JUFAJA_PROJECTS } from '@/data/projects';

export const metadata = pageMetadata('Design Inspiration', 'Explore illustrative residential architecture references and concept studies from JUFAJA Constructions.', '/projects');

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-jufaja-cream">
      {/* Hero Header */}
      <PageHero image={JUFAJA_PROJECTS[0].image} tone="ivory">
        <p className="eyebrow">Illustrative concepts / Design journal</p>
        <h1 className="type-h1 mt-4 text-jufaja-forest">Design inspiration.</h1>
        <p className="type-lead mt-6 text-jufaja-muted">These reference images and concept studies illustrate architectural directions. They are not photographs or records of completed JUFAJA projects.</p>
      </PageHero>

      {/* Projects Showcase List */}
      <section className="studies-journal py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-24">
          {JUFAJA_PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              className={`journal-study relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Frame */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Reveal mode="mask-up" curtain="bg-jufaja-stone"><div className="journal-image relative h-[340px] sm:h-[440px] w-full overflow-hidden bg-jufaja-stone group">
                  <ParallaxImage
                    src={proj.image}
                    alt={`${proj.title} illustrative concept image`}
                    frameClassName="absolute inset-0"
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-jufaja-forest-900 text-white px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider">
                    {proj.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white px-3.5 py-1.5 rounded-sm text-xs font-semibold text-jufaja-charcoal shadow flex items-center gap-1.5">
                    <span>Illustrative image · not a completed project</span>
                  </div>
                </div></Reveal>
              </div>

              {/* Text Description */}
              <span aria-hidden="true" className="journal-index">0{idx + 1}</span>
              <div className={`lg:col-span-5 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <span className="eyebrow block">
                    {proj.category} · {proj.study}
                  </span>
                  <h2 className="type-h2 font-serif text-jufaja-forest">
                    {proj.title}
                  </h2>
                </div>

                <p className="text-sm text-jufaja-muted leading-relaxed font-normal">
                  {proj.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs leading-6 text-jufaja-muted">Concept only. Specifications and site suitability depend on an individual project brief.</span>
                </div>

                <div className="pt-4">
                  <ButtonLink href={`/contact?project=${encodeURIComponent(proj.title)}`}>
                    Discuss your project
                  </ButtonLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="bg-jufaja-stone py-16 border-t border-jufaja-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="type-h2 font-serif text-jufaja-forest">
            Have an idea in mind?
          </h2>
          <p className="text-sm text-jufaja-muted max-w-xl mx-auto leading-relaxed">
            Share a little about your plans and we can talk through possible next steps.
          </p>
          <div className="pt-2">
            <ButtonLink href="/contact" arrow={false}>
              Contact JUFAJA
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
