import PlanningSequence from '@/components/ui/PlanningSequence';
import PageHero from '@/components/ui/PageHero';
import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'House and Land Information',
  description: 'Contact JUFAJA Constructions to discuss house and land options and confirm current listing details.',
  alternates: { canonical: '/packages' },
};

export default function PackagesPage() {
  return (
    <div className="min-h-[65vh] bg-jufaja-cream">
      <PageHero image="/images/architecture/daylight-family-home.webp" tone="green" label="Architecture reference">
        <p className="eyebrow">House &amp; land</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Let’s talk about current options.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">
            Online package details can change. Contact JUFAJA to confirm current land availability, pricing, inclusions and specifications before making a decision.
          </p>
          <ButtonLink href="/contact?interest=House%20%26%20Land" className="mt-8">Ask about house and land</ButtonLink>
      </PageHero>
      <PlanningSequence eyebrow="Before you decide" title="What to confirm." items={[
        { title: 'Land and availability', copy: 'Ask for the latest land status and any conditions that apply to the specific property.' },
        { title: 'Price and site costs', copy: 'Confirm the current package price, site costs and applicable allowances.' },
        { title: 'Plan and inclusions', copy: 'Request the current plan, inclusions and written specifications.' },
      ]} />
    </div>
  );
}
