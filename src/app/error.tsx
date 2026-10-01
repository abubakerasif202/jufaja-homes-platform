'use client';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  void error;

  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-jufaja-cream px-4 py-20">
      <div role="alert" className="max-w-xl border border-jufaja-border bg-white p-8 text-center shadow-jufaja-soft">
        <p className="eyebrow">A temporary problem</p>
        <h1 className="type-h2 mt-3 font-serif text-jufaja-forest">This page could not load.</h1>
        <p className="mt-4 text-sm leading-6 text-jufaja-muted">Please try again. If the problem continues, return to the home page and try another route.</p>
        <button type="button" onClick={() => reset()} className="btn btn-primary mt-6">Try again</button>
      </div>
    </main>
  );
}
