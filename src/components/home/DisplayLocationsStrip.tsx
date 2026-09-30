import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DisplayLocationsStrip() {
  return (
    <section className="border-t border-jufaja-border bg-jufaja-cream py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">Display homes</p>
          <h2 className="mt-3 font-serif text-3xl text-jufaja-forest sm:text-4xl">Check what is open before you visit.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-jufaja-muted">Locations, opening times and designs on display can change. Contact JUFAJA to confirm current details before travelling.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <Link href="/display-homes" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-jufaja-border bg-white px-4 text-sm font-semibold text-jufaja-forest">Display home info <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" /></Link>
          <Link href="/contact?interest=Display%20Homes" className="inline-flex min-h-11 items-center rounded-sm bg-jufaja-forest px-4 text-sm font-semibold text-white hover:bg-jufaja-forest-800">Ask JUFAJA</Link>
        </div>
      </div>
    </section>
  );
}
