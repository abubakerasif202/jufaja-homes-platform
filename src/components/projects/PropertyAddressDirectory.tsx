'use client';

import { useMemo, useState } from 'react';
import {
  PROPERTY_LOCATIONS,
  propertyAddress,
  propertyImageSearchUrl,
  propertyMapUrl,
} from '@/data/property-locations';

const SUBURBS = ['All suburbs', ...Array.from(new Set(PROPERTY_LOCATIONS.map((location) => location.suburb))).sort()];

export default function PropertyAddressDirectory() {
  const [query, setQuery] = useState('');
  const [suburb, setSuburb] = useState('All suburbs');
  const results = useMemo(
    () => PROPERTY_LOCATIONS.filter((location) =>
      (suburb === 'All suburbs' || location.suburb === suburb)
      && propertyAddress(location).toLowerCase().includes(query.trim().toLowerCase())
    ),
    [query, suburb]
  );

  return (
    <section aria-labelledby="property-address-heading" className="border-t border-jufaja-border bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">South-West Sydney / Property register</p>
            <h2 id="property-address-heading" className="type-h2 mt-3 text-jufaja-forest">
              Explore the property locations.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-jufaja-muted sm:text-base">
              An address index provided for the JUFAJA portfolio review. Follow each address to its map,
              public property records or Google Images research results. Photographs and individual
              project details have not yet been approved for publication as completed JUFAJA works.
            </p>
          </div>
          <p className="border-l-2 border-jufaja-gold px-5 py-2 text-sm text-jufaja-forest">
            <strong className="block font-serif text-4xl">{PROPERTY_LOCATIONS.length}</strong>
            submitted address entries
          </p>
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
        </div>

        <p className="mt-5 text-xs text-jufaja-muted" role="status" aria-live="polite">
          Showing {results.length} of {PROPERTY_LOCATIONS.length} addresses.
        </p>

        {results.length === 0 ? (
          <p className="mt-8 rounded-sm border border-jufaja-border bg-jufaja-cream p-8 text-center text-jufaja-muted">
            No matching addresses. Try another street or suburb.
          </p>
        ) : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((location) => (
              <article key={propertyAddress(location)} className="flex min-w-0 flex-col overflow-hidden rounded-sm border border-jufaja-border bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="relative flex h-28 items-center justify-between overflow-hidden bg-jufaja-forest-900 px-6 text-white">
                  <span className="relative z-10 text-xs font-semibold uppercase tracking-[.2em] text-jufaja-gold-400">{location.suburb}</span>
                  <span aria-hidden="true" className="absolute -right-5 -top-12 font-serif text-[10rem] font-semibold leading-none text-white/10">{location.street.match(/\d+[A-Z]?/)?.[0] || 'J'}</span>
                  <span className="relative z-10 rounded-sm border border-white/30 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider">Location</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl leading-tight text-jufaja-forest">{location.street}</h3>
                  <p className="mt-1 text-sm text-jufaja-muted">{location.suburb} NSW {location.postcode}</p>
                  <p className="mt-3 text-xs leading-5 text-jufaja-muted">
                    {location.listedPhotos
                      ? `A public listing has ${location.listedPhotos} images to review. Reuse requires photo rights.`
                      : location.sourceUrl
                        ? 'Public property profile located. A suitable approved photograph is not confirmed.'
                        : 'No matching photography verified yet. Check the exact address carefully.'}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-3 border-t border-jufaja-border pt-5 text-xs font-semibold">
                    <a href={propertyImageSearchUrl(location)} target="_blank" rel="noopener noreferrer" className="text-jufaja-forest underline underline-offset-4 hover:text-jufaja-gold-600">
                      Google images<span className="sr-only"> (opens in new tab)</span>
                    </a>
                    <a href={propertyMapUrl(location)} target="_blank" rel="noopener noreferrer" className="text-jufaja-forest underline underline-offset-4 hover:text-jufaja-gold-600">
                      Google Maps<span className="sr-only"> (opens in new tab)</span>
                    </a>
                    {location.sourceUrl && (
                      <a href={location.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-jufaja-forest underline underline-offset-4 hover:text-jufaja-gold-600">
                        Property source<span className="sr-only"> (opens in new tab)</span>
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
