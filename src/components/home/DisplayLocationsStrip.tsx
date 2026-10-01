import ButtonLink from '@/components/ui/ButtonLink';

export default function DisplayLocationsStrip() {
  return (
    <section className="border-t border-jufaja-border bg-jufaja-cream py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-8">
          <p className="eyebrow">Display homes</p>
          <h2 className="type-h2 mt-3 font-serif text-jufaja-forest">Check what is open before you visit.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-jufaja-muted">Locations, opening times and designs on display can change. Contact JUFAJA to confirm current details before travelling.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <ButtonLink href="/display-homes" variant="outline">Display home info</ButtonLink>
          <ButtonLink href="/contact?interest=Display%20Homes" arrow={false}>Ask JUFAJA</ButtonLink>
        </div>
      </div>
    </section>
  );
}
