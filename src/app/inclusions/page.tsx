import PlanningSequence from '@/components/ui/PlanningSequence';
import PageHero from '@/components/ui/PageHero';
import { pageMetadata } from '@/lib/site-metadata';
import ButtonLink from '@/components/ui/ButtonLink';

export const metadata = pageMetadata('Inclusions Information', 'Ask JUFAJA Constructions for current inclusions information and confirm products and specifications for your project.', '/inclusions');

const topics = [
  { title: 'Standard inclusions', copy: 'Ask for the written schedule that applies to the current design and specification.' },
  { title: 'Optional upgrades', copy: 'Confirm which selections are optional and how they affect the project price.' },
  { title: 'Product selections', copy: 'Confirm the applicable products, materials and finishes in writing.' },
  { title: 'Site and contract allowances', copy: 'Ask which allowances and conditions apply to your specific site and contract.' },
];

export default function InclusionsPage() {
  return (
    <div className="min-h-[65vh] bg-jufaja-cream">
      <PageHero image="/images/architecture/daylight-stone-residence.webp" tone="burgundy" label="Architecture reference">
        <p className="eyebrow">Selections and specifications</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Know what is included in your project.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">A current inclusions schedule is not published here. Request the written schedule for your preferred design so you can compare standard selections, optional upgrades and site allowances.</p>
          <ButtonLink href="/contact?interest=Inclusions" className="mt-8">Ask for current details</ButtonLink>
      </PageHero>
      <PlanningSequence eyebrow="Selections / In detail" title="Questions to ask." items={topics} image="/images/architecture/daylight-paired-homes.webp" />
    </div>
  );
}
