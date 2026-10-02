import PlanningSequence from '@/components/ui/PlanningSequence';
import PageHero from '@/components/ui/PageHero';
import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Knockdown Rebuild Information',
  description: 'Explore questions to consider when planning a knockdown rebuild and contact JUFAJA Constructions to discuss your site.',
  alternates: { canonical: '/knockdown-rebuild' },
};

const topics = [
  { title: 'The site', copy: 'Existing structures, access, services, trees, easements and site levels may affect what is possible.' },
  { title: 'Planning controls', copy: 'The approval pathway depends on the property and the rules that apply. Confirm requirements with the relevant planning professionals.' },
  { title: 'Design and scope', copy: 'Compare a catalogue design with a custom brief, then confirm drawings, inclusions and specifications for your property.' },
  { title: 'Costs and timing', copy: 'Demolition, approvals, site conditions and build scope affect cost and timing. Request project-specific information before making a decision.' },
];

const questions = [
  ['Can every property use a fast approval pathway?', 'No single pathway can be assumed. Eligibility depends on the site and the applicable planning controls. Seek confirmation for your property.'],
  ['Can a catalogue design be used for a rebuild?', 'A listed plan is only a starting point. Confirm its current drawings, dimensions and suitability against the property and approval requirements.'],
  ['How long will the project take?', 'Timing depends on design, site investigations, approvals, demolition and construction scope. Ask for a project-specific timeline.'],
];

export default function KnockdownRebuildPage() {
  return (
    <div className="bg-jufaja-cream">
      <PageHero image="/images/architecture/daylight-sculptural-home.webp" tone="burgundy" label="Architecture reference">
        <p className="eyebrow">Knockdown rebuild</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Make room for a new chapter.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">Replacing an existing home involves site, design, planning and demolition questions. Start by understanding what applies to your property.</p>
          <ButtonLink href="/contact?interest=Knockdown%20Rebuild" className="mt-8">Discuss your site</ButtonLink>
      </PageHero>

      <PlanningSequence eyebrow="Questions to work through" title="Start with the property." items={topics} image="/images/architecture/daylight-family-home.webp" />

      <section className="border-y border-jufaja-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Before you decide</p>
          <h2 className="type-h2 mt-3 font-serif text-jufaja-forest">Common questions</h2>
          <div className="mt-8 divide-y divide-jufaja-border border-y border-jufaja-border">
            {questions.map(([question, answer]) => <details key={question} className="group py-5">
              <summary className="cursor-pointer list-none font-serif text-xl text-jufaja-forest marker:hidden focus-visible:outline-jufaja-gold-600">{question}<span aria-hidden="true" className="float-right ml-4 text-jufaja-gold-600 group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-jufaja-muted">{answer}</p>
            </details>)}
          </div>
        </div>
      </section>
    </div>
  );
}
