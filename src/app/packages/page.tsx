import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">House &amp; land</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-jufaja-forest sm:text-6xl">Let’s talk about current options.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-jufaja-muted">
            Online package details can change. Contact JUFAJA to confirm current land availability, pricing, inclusions and specifications before making a decision.
          </p>
          <Link href="/contact?interest=House%20%26%20Land" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jufaja-forest-800">
            Ask about house and land <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" />
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl border-l-2 border-jufaja-gold-500 pl-5">
          <h2 className="font-serif text-2xl text-jufaja-forest">What to confirm</h2>
          <p className="mt-2 text-sm leading-6 text-jufaja-muted">Ask for the latest land status, package price, plan, site costs, inclusions and any conditions that apply to the specific property.</p>
        </div>
      </section>
    </div>
  );
}
