'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PROPERTY_LOCATIONS, propertyAddress, type PropertyLocation } from '@/data/property-locations';

const PHOTOGRAPHED_PROPERTIES = PROPERTY_LOCATIONS.filter(
  (property) => (property.photos?.length ?? 0) > 0
);
const SUBURBS = ['All areas', ...Array.from(new Set(PHOTOGRAPHED_PROPERTIES.map(
  (property) => property.suburb
))).sort()];

function PropertyImage({
  src,
  alt,
  className = '',
  eager = false,
  contain = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  contain?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Handle a photo that loaded (or failed) before hydration attached its handlers.
    const frame = requestAnimationFrame(() => {
      const image = imageRef.current;
      if (!image?.complete) return;
      if (image.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [src]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-jufaja-forest-900">
      {contain && !loaded && !failed && (
        <span role="status" className="pointer-events-none absolute inset-x-0 bottom-4 z-10 text-center text-sm text-white">
          Loading photograph…
        </span>
      )}
      {!failed ? (
        // Verified source URLs are image data, never public links. Local originals
        // can replace these sources once the approved files are available.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          width={1200}
          height={900}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'} ${className}`}
        />
      ) : (
        <div role="img" aria-label={alt + ' (image unavailable)'} className="flex h-full w-full items-center justify-center p-8">
          <span className="font-serif text-xl text-white/70">Photograph unavailable</span>
        </div>
      )}
    </div>
  );
}

export default function PropertyAddressDirectory() {
  const [query, setQuery] = useState('');
  const [suburb, setSuburb] = useState('All areas');
  const [opened, setOpened] = useState<PropertyLocation | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (dialog && !dialog.open) dialog.showModal();
    dialog?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog?.open) dialog.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, [opened]);

  useEffect(() => {
    const strip = thumbnailsRef.current;
    const selected = strip?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (!strip || !selected) return;
    const left = selected.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
    if (left < strip.scrollLeft) strip.scrollLeft = left;
    else if (left + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollLeft = left + selected.offsetWidth - strip.clientWidth;
    }
  }, [opened, photoIndex]);

  const shown = useMemo(() => PHOTOGRAPHED_PROPERTIES.filter((property) =>
    (suburb === 'All areas' || property.suburb === suburb) &&
    propertyAddress(property).toLowerCase().includes(query.trim().toLowerCase())
  ), [query, suburb]);

  const openGallery = (property: PropertyLocation, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setPhotoIndex(0);
    setOpened(property);
  };

  const closeGallery = () => dialogRef.current?.close();

  const onClose = () => {
    touchStart.current = null;
    setOpened(null);
  };

  const movePhoto = (direction: number) => {
    const count = opened?.photos?.length ?? 0;
    if (count <= 1) return;
    setPhotoIndex((index) => (index + direction + count) % count);
  };

  return (
    <section aria-labelledby="property-collection-heading" className="border-t border-jufaja-border bg-jufaja-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-3xl">
          <p className="eyebrow">South-West Sydney / Residences</p>
          <h2 id="property-collection-heading" className="type-h2 mt-3 text-jufaja-forest">
            Residential property collection.
          </h2>
          <p className="mt-5 text-base leading-7 text-jufaja-muted">
            Explore a curated collection of residential property photography across Sydney’s south-west.
          </p>
        </header>

        <div className="mb-8 grid gap-4 border-y border-jufaja-border py-5 sm:grid-cols-[1fr_220px]">
          <div>
            <label htmlFor="gallery-search" className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-jufaja-forest">
              Find a residence
            </label>
            <input id="gallery-search" type="search" value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search street or suburb"
              className="w-full rounded-sm border border-jufaja-border bg-white px-4 py-3 text-sm text-jufaja-charcoal focus:border-jufaja-gold-600 focus:outline-none focus:ring-2 focus:ring-jufaja-gold-500/30"
            />
          </div>
          <div>
            <label htmlFor="gallery-suburb" className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-jufaja-forest">
              Location
            </label>
            <select id="gallery-suburb" value={suburb} onChange={(event) => setSuburb(event.target.value)}
              className="w-full rounded-sm border border-jufaja-border bg-white px-4 py-3 text-sm text-jufaja-charcoal focus:border-jufaja-gold-600 focus:outline-none focus:ring-2 focus:ring-jufaja-gold-500/30">
              {SUBURBS.map((value) => <option value={value} key={value}>{value}</option>)}
            </select>
          </div>
        </div>

        <p className="mb-5 text-sm text-jufaja-muted" role="status" aria-live="polite">
          {shown.length} {shown.length === 1 ? 'residence' : 'residences'}
        </p>
        {shown.length ? (
          <div className="grid items-start gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((property, index) => {
              const firstImage = property.photos?.[0];
              if (!firstImage) return null;
              return (
                <article key={propertyAddress(property)} className="group min-w-0">
                  <button
                    type="button"
                    onClick={(event) => openGallery(property, event.currentTarget)}
                    aria-label={`View photos of ${propertyAddress(property)}`}
                    className="relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-jufaja-forest-900 text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jufaja-gold-600"
                  >
                    <PropertyImage
                      key={firstImage}
                      src={firstImage}
                      eager={index === 0}
                      alt={`Residential property at ${propertyAddress(property)}`}
                      className="transition-transform duration-700 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-white">
                      <span className="text-xs font-semibold uppercase tracking-[.14em]">{property.suburb}</span>
                      <span aria-hidden="true" className="text-sm">View gallery ↗</span>
                    </span>
                  </button>
                  <h3 className="mt-5 font-serif text-2xl leading-tight text-jufaja-forest">{property.street}</h3>
                  <p className="mt-1 text-sm text-jufaja-muted">{property.suburb} · NSW {property.postcode}</p>
                  {property.photoNote && (
                    <p className="mt-2 text-xs leading-5 text-jufaja-muted">
                      {property.photoNote}
                    </p>
                  )}
                  {property.photoCredit && (
                    <p className="mt-2 text-xs text-jufaja-muted">Image credit: {property.photoCredit}</p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-sm border border-jufaja-border bg-white px-6 py-10 text-center text-jufaja-muted">
            No residences match that search. Try another suburb or street.
          </p>
        )}

        <dialog
          ref={dialogRef}
          aria-labelledby="property-dialog-title"
          onClose={onClose}
          onClick={(event) => { if (event.target === event.currentTarget) closeGallery(); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); }
            if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); }
          }}
          className="m-auto max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-6xl overflow-y-auto rounded-sm border border-white/20 bg-jufaja-forest-950 p-0 text-white shadow-2xl backdrop:bg-black/85"
        >
          {opened && opened.photos?.length ? (
            <div className="w-full">
              <div className="flex items-center justify-between gap-4 p-4 sm:px-6">
                <div className="min-w-0">
                  <h2 id="property-dialog-title" className="break-words font-serif text-lg sm:text-2xl">{opened.street}</h2>
                  <p className="text-xs text-white/70">{opened.suburb}, NSW {opened.postcode}</p>
                </div>
                <button type="button" onClick={closeGallery} autoFocus
                  aria-label="Close property photo gallery"
                  className="min-h-11 min-w-11 rounded-sm border border-white/40 px-3 text-white hover:bg-white/10">
                  Close ×
                </button>
              </div>
              <div
                className="relative mx-3 h-[min(55vh,680px)] overflow-hidden bg-black sm:mx-6"
                onTouchStart={(event) => {
                  const touch = event.touches[0];
                  touchStart.current = event.touches.length === 1 && touch ? { x: touch.clientX, y: touch.clientY } : null;
                }}
                onTouchMove={(event) => { if (event.touches.length !== 1) touchStart.current = null; }}
                onTouchCancel={() => { touchStart.current = null; }}
                onTouchEnd={(event) => {
                  const start = touchStart.current;
                  const touch = event.changedTouches[0];
                  touchStart.current = null;
                  if (!start || !touch) return;
                  const dx = touch.clientX - start.x;
                  const dy = touch.clientY - start.y;
                  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) movePhoto(dx < 0 ? 1 : -1);
                }}
              >
                <PropertyImage key={opened.photos[photoIndex]} src={opened.photos[photoIndex]}
                  alt={`Photograph ${photoIndex + 1} of ${opened.photos.length} at ${propertyAddress(opened)}`}
                  contain
                  eager
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
                <button type="button" onClick={() => movePhoto(-1)} disabled={opened.photos.length <= 1}
                  className="min-h-11 rounded-sm border border-white/40 px-4 text-sm hover:bg-white/10 disabled:opacity-40"
                  aria-label="Previous photograph">← Previous</button>
                <p className="text-sm text-white" aria-live="polite">{photoIndex + 1} / {opened.photos.length}</p>
                <button type="button" onClick={() => movePhoto(1)} disabled={opened.photos.length <= 1}
                  className="min-h-11 rounded-sm border border-white/40 px-4 text-sm hover:bg-white/10 disabled:opacity-40"
                  aria-label="Next photograph">Next →</button>
              </div>
              {opened.photos.length > 1 && (
                <div ref={thumbnailsRef} role="group" className="relative flex gap-2 overflow-x-auto px-4 pb-5 sm:px-6" aria-label="Select photograph">
                  {opened.photos.map((src, i) => (
                    <button key={src} type="button" aria-pressed={i === photoIndex}
                      aria-label={`Show photograph ${i + 1}`}
                      onClick={() => setPhotoIndex(i)}
                      className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-sm border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${i === photoIndex ? 'border-jufaja-gold-400' : 'border-transparent'}`}>
                      <PropertyImage src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
              {opened.photoNote && <p className="px-4 pb-4 text-xs leading-5 text-white/70 sm:px-6">{opened.photoNote}</p>}
              {opened.photoCredit && <p className="px-4 pb-5 text-xs text-white/70 sm:px-6">Image credit: {opened.photoCredit}</p>}
            </div>
          ) : (
            <p id="property-dialog-title" className="p-6">Property photographs</p>
          )}
        </dialog>
      </div>
    </section>
  );
}
