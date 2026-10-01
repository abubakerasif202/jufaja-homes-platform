import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';

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
          <p className="eyebrow">Selections and specifications</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Know what is included in your project.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">Inclusions depend on the current specification, design, site and contract. Ask JUFAJA for the applicable written schedule before comparing or committing to a project.</p>
          <ButtonLink href="/contact?interest=Inclusions" className="mt-8">Ask for current details</ButtonLink>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="type-h3 font-serif text-jufaja-forest">Questions to ask</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => <li key={topic} className="rounded-sm border border-jufaja-border bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-jufaja-gold-500">
            <span className="text-xs font-semibold text-jufaja-gold-600">0{index + 1}</span>
            <p className="mt-3 font-medium text-jufaja-forest-900">{topic}</p>
          </li>)}
        </ul>
      </section>
    </main>
  );
}
