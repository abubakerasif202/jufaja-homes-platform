import PlanningSequence from '@/components/ui/PlanningSequence';
import PageHero from '@/components/ui/PageHero';
import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';

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
    <div className="bg-jufaja-cream">
      <PageHero image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85" tone="green" label="Architecture reference">
        <p className="eyebrow">Custom homes</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">A home shaped around your brief.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">Start with the site and the way you want to live. A clear brief helps you explore appropriate design options and identify what needs closer review.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact?interest=Custom%20Home">Discuss your brief</ButtonLink>
            <ButtonLink href="/designs" variant="outline" arrow={false}>Browse listed designs</ButtonLink>
          </div>
      </PageHero>
      <PlanningSequence eyebrow="A useful brief" title="What would you like to work through?" items={considerations.map(([title, copy]) => ({ title, copy }))} image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85" />
    </div>
  );
}
