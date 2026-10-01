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
      <section className="border-b border-jufaja-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">House &amp; land</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Let’s talk about current options.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">
            Online package details can change. Contact JUFAJA to confirm current land availability, pricing, inclusions and specifications before making a decision.
          </p>
          <ButtonLink href="/contact?interest=House%20%26%20Land" className="mt-8">Ask about house and land</ButtonLink>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl border-l-2 border-jufaja-gold-500 pl-5">
          <h2 className="type-h3 font-serif text-jufaja-forest">What to confirm</h2>
          <p className="mt-2 text-sm leading-6 text-jufaja-muted">Ask for the latest land status, package price, plan, site costs, inclusions and any conditions that apply to the specific property.</p>
        </div>
      </section>
    </div>
  );
}
