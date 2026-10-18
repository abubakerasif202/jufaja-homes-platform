import PageHero from '@/components/ui/PageHero';
import ButtonLink from '@/components/ui/ButtonLink';
import InspirationGalleries from '@/components/gallery/InspirationGalleries';
import { buildGalleryCategories, INSPIRATION_PHOTOS } from '@/data/inspiration';
import { catalogueDesigns } from '@/lib/catalogue';
import { pageMetadata } from '@/lib/site-metadata';

export const metadata = pageMetadata(
  'Design Inspiration',
  'Browse bathroom, kitchen, living, facade, knockdown rebuild, double storey, duplex and outdoor living inspiration to help shape your home brief with JUFAJA Constructions.',
  '/inspiration',
);

export default function InspirationPage() {
  const categories = buildGalleryCategories(catalogueDesigns);
  return (
    <div className="min-h-screen bg-jufaja-cream">
      <PageHero image="/images/inspiration/kitchen-timber-island.webp" tone="ivory" label="Inspiration photograph · not a JUFAJA project">
        <p className="eyebrow">Design inspiration</p>
        <h1 className="type-h1 mt-4 text-jufaja-forest">Ideas for every space.</h1>
        <p className="type-lead mt-6 text-jufaja-muted">Bathrooms, kitchens, living spaces, facades and outdoor living, gathered to help you describe what you would like your home to feel like.</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="inspiration-galleries-heading">
        <header className="mb-8 max-w-3xl">
          <h2 id="inspiration-galleries-heading" className="type-h2 text-jufaja-forest">Eight ways to start the conversation.</h2>
          <p className="mt-3 text-sm leading-7 text-jufaja-muted">Interior and outdoor images are third-party inspiration photographs. Facade images are illustrative renderings and concept studies. This imagery is not a completed JUFAJA project, and inclusion here is not a confirmed specification or service.</p>
        </header>
        <InspirationGalleries categories={categories} />
      </section>

      <section className="border-t border-jufaja-border bg-white py-12 sm:py-16" aria-labelledby="inspiration-credits-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="inspiration-credits-heading" className="type-h3 text-jufaja-forest">Photo credits</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-jufaja-muted">Inspiration photographs are used under the Unsplash License. Thank you to the photographers.</p>
          <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-jufaja-muted sm:grid-cols-2 lg:grid-cols-3">
            {INSPIRATION_PHOTOS.map((photo) => (
              <li key={photo.id}>
                {photo.title} · <a className="underline underline-offset-2 hover:text-jufaja-forest" href={photo.credit.sourceUrl} rel="noopener noreferrer" target="_blank">{photo.credit.photographer}<span className="sr-only"> (opens Unsplash in a new tab)</span></a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-jufaja-border bg-jufaja-stone py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="type-h2 font-serif text-jufaja-forest">Found something you like?</h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-jufaja-muted">Tell us what caught your eye and we can talk through what may be possible on your site.</p>
          <div className="pt-2"><ButtonLink href="/contact?project=Design%20inspiration" arrow={false}>Start an enquiry</ButtonLink></div>
        </div>
      </section>
    </div>
  );
}
