import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Homes',
  description: 'Discuss a custom home brief, your site and the design questions that matter to you with JUFAJA Constructions.',
  alternates: { canonical: '/custom-homes' },
};

const considerations = [
  ['Site shape and levels', 'Talk through boundaries, access, levels and the existing conditions on your property.'],
  ['Space and priorities', 'Describe the rooms, connections and everyday routines you want a home to support.'],
  ['Materials and finishes', 'Share the materials, finishes and details you want to consider for the brief.'],
  ['Planning and approvals', 'Confirm which planning requirements and professional advice apply to your site.'],
];

export default function CustomHomesPage() {
  return (
    <main className="bg-jufaja-cream">
      <section className="relative overflow-hidden border-b border-jufaja-border bg-white py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 bg-blueprint-fine opacity-30 lg:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">Custom homes</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-jufaja-forest sm:text-7xl">A home shaped around your brief.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-jufaja-muted">Start with the site and the way you want to live. A clear brief helps you explore appropriate design options and identify what needs closer review.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact?interest=Custom%20Home" className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jufaja-forest-800">Discuss your brief <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" /></Link>
            <Link href="/designs" className="inline-flex min-h-12 items-center rounded-sm border border-jufaja-border px-6 py-3 text-sm font-semibold text-jufaja-forest transition-colors hover:border-jufaja-gold-500">Browse listed designs</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">A useful brief</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-jufaja-forest">What would you like to work through?</h2>
          </div>
          <div className="grid gap-0 divide-y divide-jufaja-border border-y border-jufaja-border lg:col-span-8 lg:grid-cols-2 lg:gap-x-8 lg:divide-y-0 lg:border-0">
            {considerations.map(([title, copy], index) => <article key={title} className="py-5 lg:border-t lg:border-jufaja-border lg:py-6">
              <span className="text-xs font-semibold text-jufaja-gold-600">0{index + 1}</span>
              <h3 className="mt-2 font-serif text-2xl text-jufaja-forest">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-jufaja-muted">{copy}</p>
            </article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
