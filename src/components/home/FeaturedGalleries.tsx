import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HomeDesign } from '@/types';
import DesignCard from '@/components/catalogue/DesignCard';

interface Props {
  featuredDesigns: HomeDesign[];
}

export default function FeaturedGalleries({ featuredDesigns }: Props) {
  return (
    <section className="border-b border-jufaja-border bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">Home design catalogue</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-jufaja-forest sm:text-5xl">Find a place to begin.</h2>
            <p className="mt-3 text-sm leading-6 text-jufaja-muted">Compare the information shown for selected home designs. Image and plan details should be confirmed with JUFAJA.</p>
          </div>
          <Link href="/designs" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-jufaja-forest hover:text-jufaja-forest-700">
            Browse all designs <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredDesigns.slice(0, 6).map((design) => <DesignCard key={design.id} design={design} />)}
        </div>
        <div className="mt-9 rounded-sm border border-jufaja-border bg-jufaja-cream p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h3 className="font-serif text-xl text-jufaja-forest">Looking for house and land?</h3>
            <p className="mt-1 text-sm leading-6 text-jufaja-muted">Contact JUFAJA to confirm current listings, availability and details.</p>
          </div>
          <Link href="/packages" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-jufaja-forest sm:mt-0">House &amp; land information <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" /></Link>
        </div>
      </div>
    </section>
  );
}
