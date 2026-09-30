import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inclusions Information',
  description: 'Ask JUFAJA Constructions for current inclusions information and confirm products and specifications for your project.',
  alternates: { canonical: '/inclusions' },
};

const topics = ['Standard inclusions', 'Optional upgrades', 'Product selections', 'Site and contract allowances'];

export default function InclusionsPage() {
  return (
    <main className="min-h-[65vh] bg-jufaja-cream">
      <section className="border-b border-jufaja-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">Selections and specifications</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-jufaja-forest sm:text-6xl">Know what is included in your project.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-jufaja-muted">Inclusions depend on the current specification, design, site and contract. Ask JUFAJA for the applicable written schedule before comparing or committing to a project.</p>
          <Link href="/contact?interest=Inclusions" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jufaja-forest-800">Ask for current details <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" /></Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-jufaja-forest">Questions to ask</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => <li key={topic} className="border border-jufaja-border bg-white p-5">
            <span className="text-xs font-semibold text-jufaja-gold-600">0{index + 1}</span>
            <p className="mt-3 font-medium text-jufaja-forest-900">{topic}</p>
          </li>)}
        </ul>
      </section>
    </main>
  );
}
