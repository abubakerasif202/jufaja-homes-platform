'use client';

import { useMemo, useState } from 'react';
import {
  PROPERTY_LOCATIONS,
  propertyAddress,
  propertyImageSearchUrl,
  propertyMapUrl,
  type PropertyLocation,
} from '@/data/property-locations';

const SUBURBS = ['All suburbs', ...Array.from(new Set(PROPERTY_LOCATIONS.map((location) => location.suburb))).sort()];
const PHOTO_PROPERTIES = PROPERTY_LOCATIONS.filter((location) => (location.photos?.length ?? 0) > 0).length;
const PUBLISHED_PHOTOS = PROPERTY_LOCATIONS.reduce((total, location) => total + (location.photos?.length ?? 0), 0);

function PropertyPhotographs({ location }: { location: PropertyLocation }) {
  const photos = location.photos || [];
  const [active, setActive] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const hasPhotos = photos.length > 0;
  const selected = photos[active] || '';

  const show = (index: number) => {
    setActive((index + photos.length) % photos.length);
    setImageFailed(false);
  };

  return (
    <div className="relative">
      <div className="relative h-52 overflow-hidden bg-jufaja-forest-900 sm:h-56">
        {hasPhotos && !imageFailed ? (
          // Images come from the exact-address-matched public listing source.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selected}
            alt={`Property photograph at ${propertyAddress(location)}. Image ${active + 1} of ${photos.length}.`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col justify-center gap-3 bg-blueprint-grid p-6 text-white">
            <span className="text-xs font-semibold uppercase tracking-[.18em] text-jufaja-gold-400">{location.suburb}</span>
            <span className="font-serif text-2xl">{location.street}</span>
            <span className="text-xs text-white/70">{hasPhotos ? 'Source image currently unavailable' : 'Photography not yet matched'}</span>
          </div>
        )}
        {hasPhotos && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-sm bg-jufaja-forest-900/90 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-jufaja-gold-400" />
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'} · {active + 1} / {photos.length}
          </div>
        )}
        {photos.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              type="button"
              onClick={() => show(active - 1)}
              aria-label={`Previous photograph of ${propertyAddress(location)}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-jufaja-forest-900/90 text-white hover:bg-jufaja-green-700 focus-visible:outline-offset-2"
            >‹</button>
            <button
              type="button"
              onClick={() => show(active + 1)}
              aria-label={`Next photograph of ${propertyAddress(location)}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-jufaja-forest-900/90 text-white hover:bg-jufaja-green-700 focus-visible:outline-offset-2"
            >›</button>
          </div>
        )}
      </div>
      {photos.length > 1 && (
        <details className="group border-b border-jufaja-border bg-jufaja-cream">
          <summary className="cursor-pointer px-5 py-3 text-xs font-semibold text-jufaja-forest hover:text-jufaja-gold-600">
            Browse all {photos.length} matched photographs
          </summary>
          <div className="grid max-h-80 grid-cols-3 gap-2 overflow-y-auto px-3 pb-4">
            {photos.map((photo, index) => (
              <button
                key={photo}
                type="button"
                aria-label={`Show photo ${index + 1} of ${propertyAddress(location)}`}
                aria-pressed={index === active}
                onClick={() => show(index)}
                className={`aspect-square overflow-hidden rounded-sm border-2 ${index === active ? 'border-jufaja-gold-500' : 'border-transparent'} focus-visible:outline-offset-2`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={`Property gallery thumbnail ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export default function PropertyAddressDirectory() {
  const [query, setQuery] = useState('');
  const [suburb, setSuburb] = useState('All suburbs');
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const results = useMemo(
    () => PROPERTY_LOCATIONS.filter((location) =>
      (suburb === 'All suburbs' || location.suburb === suburb)
      && (!onlyPhotos || (location.photos?.length ?? 0) > 0)
      && propertyAddress(location).toLowerCase().includes(query.trim().toLowerCase())
    ),
    [query, suburb, onlyPhotos]
  );

  return (
    <section aria-labelledby="property-address-heading" className="border-t border-jufaja-border bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">South-West Sydney / Property gallery</p>
            <h2 id="property-address-heading" className="type-h2 mt-3 text-jufaja-forest">
              Residential property collection.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-jufaja-muted sm:text-base">
              Browse the JUFAJA address register with matched property photographs from authorised public listing sources.
              Locations without a confidently matched image remain listed, without an unrelated stock photograph.
              Project scope and specifications vary by address.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 border-l-2 border-jufaja-gold px-5 py-2 text-xs text-jufaja-muted">
            <div><strong className="block font-serif text-3xl text-jufaja-forest">{PROPERTY_LOCATIONS.length}</strong>locations</div>
            <div><strong className="block font-serif text-3xl text-jufaja-forest">{PHOTO_PROPERTIES}</strong>photo albums</div>
            <div><strong className="block font-serif text-3xl text-jufaja-forest">{PUBLISHED_PHOTOS}</strong>photos</div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-sm border border-jufaja-border bg-jufaja-cream p-4 sm:grid-cols-2 sm:p-6">
          <div>
            <label htmlFor="property-address-search" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-jufaja-forest">
              Search an address
            </label>
            <input
              id="property-address-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Street name, number or suburb"
              className="w-full rounded-sm border border-jufaja-border bg-white px-4 py-3 text-sm text-jufaja-charcoal placeholder:text-jufaja-muted focus:border-jufaja-gold focus:outline-none focus:ring-2 focus:ring-jufaja-gold/20"
            />
          </div>
          <div>
            <label htmlFor="property-suburb-filter" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-jufaja-forest">
              Filter by suburb
            </label>
            <select
              id="property-suburb-filter"
              value={suburb}
              onChange={(event) => setSuburb(event.target.value)}
              className="w-full rounded-sm border border-jufaja-border bg-white px-4 py-3 text-sm text-jufaja-charcoal focus:border-jufaja-gold focus:outline-none focus:ring-2 focus:ring-jufaja-gold/20"
            >
              {SUBURBS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-jufaja-forest sm:col-span-2">
            <input type="checkbox" checked={onlyPhotos} onChange={(event) => setOnlyPhotos(event.target.checked)}
              className="h-4 w-4 accent-jufaja-forest" />
            Show only properties with photographs
          </label>
        </div>

        <p className="mt-5 text-xs text-jufaja-muted" role="status" aria-live="polite">
          Showing {results.length} of {PROPERTY_LOCATIONS.length} property addresses.
        </p>

        {results.length === 0 ? (
          <p className="mt-8 rounded-sm border border-jufaja-border bg-jufaja-cream p-8 text-center text-jufaja-muted">
            No matching addresses. Try another street or suburb, or turn off the photo filter.
          </p>
        ) : (
          <div className="mt-5 grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((location) => (
              <article key={propertyAddress(location)} className="min-w-0 overflow-hidden rounded-sm border border-jufaja-border bg-white shadow-sm transition-shadow hover:shadow-md">
                <PropertyPhotographs location={location} />
                <div className="p-5">
                  <span className="eyebrow block">{location.suburb} / NSW {location.postcode}</span>
                  <h3 className="mt-3 font-serif text-xl leading-tight text-jufaja-forest">{location.street}</h3>
                  <p className="mt-3 text-xs leading-5 text-jufaja-muted">
                    {location.photos?.length
                      ? `Photos: ${location.photoCredit ?? 'public property listing'}. Shared with JUFAJA permission; source credits retained.`
                      : location.sourceUrl
                        ? 'Public property profile available. A reliable exterior photograph is not yet confirmed.'
                        : 'Photo research pending. No substitute property images have been used.'}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 border-t border-jufaja-border pt-4 text-xs font-semibold">
                    <a href={propertyMapUrl(location)} target="_blank" rel="noopener noreferrer" className="text-jufaja-forest underline underline-offset-4 hover:text-jufaja-gold-600">
                      Google Maps<span className="sr-only"> (opens in new tab)</span>
                    </a>
                    {location.sourceUrl && (
                      <a href={location.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-jufaja-forest underline underline-offset-4 hover:text-jufaja-gold-600">
                        {location.photos?.length ? 'Full original gallery' : 'Property source'}<span className="sr-only"> (opens in new tab)</span>
                      </a>
                    )}
                    {!location.photos?.length && (
                      <a href={propertyImageSearchUrl(location)} target="_blank" rel="noopener noreferrer" className="text-jufaja-forest underline underline-offset-4 hover:text-jufaja-gold-600">
                        Search for photos<span className="sr-only"> (opens in new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
