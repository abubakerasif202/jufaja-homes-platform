import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';

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
          <p className="eyebrow">Visit in person</p>
          <h1 className="type-h1 mt-3 max-w-3xl font-serif text-jufaja-forest">Display home details.</h1>
          <p className="type-lead mt-6 max-w-2xl text-jufaja-muted">
            Contact JUFAJA before travelling to confirm which display homes are currently open, their locations, opening times and the designs available to view.
          </p>
          <ButtonLink href="/contact?interest=Display%20Homes" className="mt-8">Ask about display homes</ButtonLink>
        </div>
      </section>
    </main>
  );
}
