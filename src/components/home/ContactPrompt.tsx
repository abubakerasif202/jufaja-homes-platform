import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContactPrompt() {
  return (
    <section className="relative overflow-hidden border-t border-jufaja-border bg-jufaja-cream py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">A considered first step</p>
        <h2 className="font-serif text-3xl tracking-tight text-jufaja-forest sm:text-5xl">Start with a conversation.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-jufaja-muted sm:text-base">Tell us what you have in mind, where you hope to build, and what matters most in your future home. We can help you explore the next steps.</p>
        <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jufaja-forest-800">
          Talk with JUFAJA <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" />
        </Link>
      </div>
    </section>
  );
}
