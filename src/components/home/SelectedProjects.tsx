'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import ButtonLink from '@/components/ui/ButtonLink';

import { JUFAJA_PROJECTS, type ProjectShowcase } from '@/data/projects';
export type { ProjectShowcase };

export default function SelectedProjects() {
  return (
    <section id="our-work" className="relative overflow-hidden border-b border-jufaja-border bg-jufaja-stone py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <Reveal>
            <div className="eyebrow mb-3 inline-flex items-center gap-2 rounded-sm border border-jufaja-gold-500/40 bg-white px-3 py-1">
              <Sparkles aria-hidden="true" className="w-3 h-3" />
              <span>Design inspiration</span>
            </div>
            <h2 className="type-h2 font-serif text-jufaja-forest">
              Architectural Studies
            </h2>
            <p className="text-sm text-jufaja-muted mt-2 max-w-xl font-normal leading-relaxed">
              A small collection of residential design studies. These images are illustrative references, not completed JUFAJA projects.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ButtonLink href="/projects" variant="outline">
              View Design Studies
            </ButtonLink>
          </Reveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JUFAJA_PROJECTS.map((proj, idx) => (
            <Reveal key={proj.id} delay={idx * 0.15}>
              <div className="bg-white rounded-sm overflow-hidden border border-jufaja-border shadow-sm hover:shadow-luxury hover:-translate-y-1 hover:border-jufaja-gold-500 transition-[transform,box-shadow,border-color] duration-300 group flex flex-col justify-between h-full">
                
                {/* Visual */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-jufaja-stone">
                  <Image
                    src={proj.image}
                    alt={`${proj.title} concept image, shown for design inspiration`}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-jufaja-forest-900 text-white px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                    {proj.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white text-jufaja-charcoal px-3 py-1.5 rounded-sm text-[11px] font-semibold shadow-sm">
                    Illustrative image · design concept
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="type-h3 font-serif text-jufaja-forest group-hover:text-jufaja-gold-600 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-jufaja-muted leading-relaxed font-normal">
                    {proj.description}
                  </p>

                  <div className="pt-2">
                    <span className="eyebrow mb-2 block">
                      Study focus
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-jufaja-charcoal">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium">
                        <span aria-hidden="true" className="w-1 h-1 rounded-full bg-jufaja-gold-500 shrink-0" />
                        <span>{proj.study}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="px-6 sm:px-8 py-4 bg-jufaja-ivory border-t border-jufaja-border flex items-center justify-between text-xs">
                  <span className="font-semibold text-jufaja-muted">Concept only</span>
                  <Link
                    href={`/contact?project=${encodeURIComponent(proj.title)}`}
                    className="font-bold text-jufaja-forest hover:text-jufaja-gold-600 flex items-center gap-1 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    <span>Discuss an idea</span>
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
