export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite" className="min-h-[55vh] bg-jufaja-cream px-4 py-20 sm:px-6">
      <span className="sr-only">Loading page</span>
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-3 w-28 rounded-sm bg-jufaja-stone" />
        <div className="h-12 max-w-2xl rounded-sm bg-jufaja-stone sm:h-16" />
        <div className="h-5 max-w-xl rounded-sm bg-jufaja-stone" />
        <div className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-72 rounded-sm border border-jufaja-border bg-white" />)}
        </div>
      </div>
    </div>
  );
}
