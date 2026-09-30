import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FounderStory() {
  return (
    <section className="relative overflow-hidden border-y border-jufaja-border bg-white py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-[38%] bg-blueprint-fine opacity-30" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">A personal introduction</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-jufaja-forest sm:text-5xl">A home starts with a conversation.</h2>
          <div aria-hidden="true" className="mt-7 h-px w-24 bg-jufaja-gold-500" />
        </div>
        <div className="lg:col-span-7 lg:border-l lg:border-jufaja-border lg:pl-12">
          <p className="font-serif text-2xl text-jufaja-forest">Javed Iqbal</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-jufaja-muted">
            Every project begins with different priorities. Share what you are planning, where you hope to build, and the questions you want answered. The JUFAJA team can help you explore the designs and services available.
          </p>
          <Link href="/about-us" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-jufaja-forest transition-colors hover:text-jufaja-forest-700">
            Meet JUFAJA <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
