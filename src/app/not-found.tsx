import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center bg-jufaja-cream py-20">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">404 · Page not found</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight text-jufaja-forest sm:text-6xl">Let’s find another way.</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-jufaja-muted">That address may have changed or the page may no longer be available.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white hover:bg-jufaja-forest-800"><ArrowLeft aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" /> Home</Link>
          <Link href="/designs" className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-jufaja-border bg-white px-6 py-3 text-sm font-semibold text-jufaja-forest">Browse home designs <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" /></Link>
        </div>
      </div>
    </main>
  );
}
