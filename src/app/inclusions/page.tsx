import PlanningSequence from '@/components/ui/PlanningSequence';
import PageHero from '@/components/ui/PageHero';
import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Inclusions Information',
  description: 'Ask JUFAJA Constructions for current inclusions information and confirm products and specifications for your project.',
  alternates: { canonical: '/inclusions' },
};

const topics = [
  { title: 'Standard inclusions', copy: 'Ask for the written schedule that applies to the current design and specification.' },
  { title: 'Optional upgrades', copy: 'Confirm which selections are optional and how they affect the project price.' },
  { title: 'Product selections', copy: 'Confirm the applicable products, materials and finishes in writing.' },
  { title: 'Site and contract allowances', copy: 'Ask which allowances and conditions apply to your specific site and contract.' },
];

export default function InclusionsPage() {
  return (
    <div className="min-h-[65vh] bg-jufaja-cream">
      <PageHero image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85" tone="burgundy" label="Architecture reference">
        <p className="eyebrow">Selections and specifications</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Know what is included in your project.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">Inclusions depend on the current specification, design, site and contract. Ask JUFAJA for the applicable written schedule before comparing or committing to a project.</p>
          <ButtonLink href="/contact?interest=Inclusions" className="mt-8">Ask for current details</ButtonLink>
      </PageHero>
      <PlanningSequence eyebrow="Selections / In detail" title="Questions to ask." items={topics} image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" />
    </div>
  );
}
