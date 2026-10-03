import ButtonLink from '@/components/ui/ButtonLink';

export default function DisplayLocationsStrip() {
  return (
    <section className="display-strip border-t border-jufaja-border bg-jufaja-cream py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-8">
          <p className="eyebrow">Display homes</p>
          <h2 className="type-h2 mt-3 font-serif text-jufaja-forest">Ask about viewing a home.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-jufaja-muted">Viewing locations and opening hours are not published here. Ask JUFAJA about current opportunities before planning a visit.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <ButtonLink href="/display-homes" variant="outline">Display home info</ButtonLink>
          <ButtonLink href="/contact?interest=Display%20Homes" arrow={false}>Ask JUFAJA</ButtonLink>
        </div>
      </div>
    </section>
  );
}
