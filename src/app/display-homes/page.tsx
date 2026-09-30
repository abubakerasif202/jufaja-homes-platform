import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Display Home Information',
  description: 'Contact JUFAJA Constructions to confirm current display home locations, designs and opening times.',
  alternates: { canonical: '/display-homes' },
};

export default function DisplayHomesPage() {
  return (
    <main className="min-h-[65vh] bg-jufaja-cream">
      <section className="border-b border-jufaja-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">Visit in person</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-jufaja-forest sm:text-6xl">Display home details.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-jufaja-muted">
            Contact JUFAJA before travelling to confirm which display homes are currently open, their locations, opening times and the designs available to view.
          </p>
          <Link href="/contact?interest=Display%20Homes" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jufaja-forest-800">
            Ask about display homes <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" />
          </Link>
        </div>
      </section>
    </main>
  );
}
