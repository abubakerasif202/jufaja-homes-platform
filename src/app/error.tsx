'use client';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  void error;

  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-jufaja-cream px-4 py-20">
      <div role="alert" className="max-w-xl border border-jufaja-border bg-white p-8 text-center shadow-jufaja-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">A temporary problem</p>
        <h1 className="mt-3 font-serif text-4xl text-jufaja-forest">This page could not load.</h1>
        <p className="mt-4 text-sm leading-6 text-jufaja-muted">Please try again. If the problem continues, return to the home page and try another route.</p>
        <button type="button" onClick={() => reset()} className="mt-6 min-h-11 rounded-sm bg-jufaja-forest px-5 text-sm font-semibold text-white hover:bg-jufaja-forest-800">Try again</button>
      </div>
    </main>
  );
}
