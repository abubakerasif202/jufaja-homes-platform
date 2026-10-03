import PlanningSequence from '@/components/ui/PlanningSequence';
import PageHero from '@/components/ui/PageHero';
import { pageMetadata } from '@/lib/site-metadata';
import ButtonLink from '@/components/ui/ButtonLink';

export const metadata = pageMetadata('Display Home Enquiries', 'Contact JUFAJA Constructions to confirm current display home locations, designs and opening times.', '/display-homes');

export default function DisplayHomesPage() {
  return (
    <div className="min-h-[65vh] bg-jufaja-cream">
      <PageHero image="/images/architecture/daylight-family-home.webp" tone="ivory" label="Architecture reference">
        <p className="eyebrow">Display home enquiries</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Arrange your next step.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">
            No confirmed display locations or opening hours are published here. Ask JUFAJA about current viewing opportunities and arrange a visit before travelling.
          </p>
          <ButtonLink href="/contact?interest=Display%20Homes" className="mt-8">Ask about display homes</ButtonLink>
      </PageHero>
      <PlanningSequence eyebrow="Plan your visit" title="Before you make the journey." items={[
        { title: 'Confirm the location', copy: 'Contact JUFAJA to confirm which display homes are currently available to visit.' },
        { title: 'Check opening times', copy: 'Confirm current opening times directly before travelling.' },
        { title: 'Ask what is on display', copy: 'Check the designs available to view and any details you would like to discuss.' },
      ]} />
    </div>
  );
}
