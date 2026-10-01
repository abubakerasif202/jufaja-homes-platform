import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';
import { JUFAJA_PROJECTS } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Design Inspiration | JUFAJA Constructions',
  description: 'Explore illustrative residential architecture references and concept studies from JUFAJA Constructions.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-jufaja-cream">
      {/* Hero Header */}
      <section className="bg-jufaja-cream text-jufaja-forest py-16 sm:py-24 relative overflow-hidden border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="eyebrow inline-flex items-center gap-2 rounded-sm border border-jufaja-gold-500/40 bg-white px-3 py-1">
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5" />
            <span>Illustrative concepts</span>
          </div>
          <h1 className="type-h1 font-serif text-jufaja-forest">
            Design Inspiration
          </h1>
          <p className="type-lead text-jufaja-muted max-w-2xl mx-auto">
            These reference images and concept studies illustrate architectural directions. They are not photographs or records of completed JUFAJA projects.
          </p>
        </div>
      </section>

      {/* Projects Showcase List */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-24">
          {JUFAJA_PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Frame */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative h-[340px] sm:h-[440px] w-full rounded-sm overflow-hidden shadow-luxury border-2 border-white bg-jufaja-stone group">
                  <Image
                    src={proj.image}
                    alt={`${proj.title} illustrative concept image`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-jufaja-forest-900 text-white px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider">
                    {proj.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white px-3.5 py-1.5 rounded-sm text-xs font-semibold text-jufaja-charcoal shadow flex items-center gap-1.5">
                    <span>Illustrative image · not a completed project</span>
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className={`lg:col-span-5 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <span className="eyebrow block">
                    {proj.category} · {proj.study}
                  </span>
                  <h2 className="type-h3 font-serif text-jufaja-forest">
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
