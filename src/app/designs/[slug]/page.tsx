import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import rawDesigns from '@/data/designs.json';
import type { HomeDesign } from '@/types';
import { formatSquares } from '@/lib/utils';
import { Bed, Bath, Car, ArrowLeft } from 'lucide-react';
import FloorplanViewer from '@/components/designs/FloorplanViewer';
import DimensionTable from '@/components/designs/DimensionTable';
import FacadeGallery from '@/components/designs/FacadeGallery';
import DesignCard from '@/components/catalogue/DesignCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const designs = rawDesigns as HomeDesign[];
  return designs.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const designs = rawDesigns as HomeDesign[];
  const design = designs.find((d) => d.slug === slug);

  if (!design) return { title: 'Design Not Found' };

  return {
    title: `${design.name} | Home Design Catalogue`,
    description: `View the listed information for the ${design.name} home design. Confirm the current plan, dimensions and inclusions with JUFAJA Constructions.`,
    alternates: { canonical: `/designs/${design.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title: `${design.name} | Home Design Catalogue`,
      description: 'An indicative design listing. Confirm current plans and specifications directly with JUFAJA Constructions.',
    },
  };
}

export default async function SingleDesignPage({ params }: Props) {
  const { slug } = await params;
  const designs = rawDesigns as HomeDesign[];
  const design = designs.find((d) => d.slug === slug);

  if (!design) notFound();

  const relatedDesigns = designs
    .filter((d) => d.dwellingType === design.dwellingType && d.id !== design.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-jufaja-cream pb-20">
      
      {/* Top Breadcrumb Header Bar */}
      <div className="border-b border-jufaja-border bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
          <Link
            href="/designs"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold text-jufaja-forest transition-colors hover:text-jufaja-forest-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Designs</span>
          </Link>
          <div className="hidden text-xs font-medium text-jufaja-muted sm:block">
            Home Designs &bull; {design.dwellingType.toUpperCase()} &bull; {design.name}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Design Header Summary */}
        <div className="flex flex-col items-start justify-between gap-6 border border-jufaja-border bg-white p-6 shadow-jufaja-soft sm:p-8 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="rounded-sm bg-jufaja-forest-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {formatSquares(design.houseSizeSquares)}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-jufaja-muted">
                {design.dwellingType.replace('single', 'Single Storey').replace('double', 'Double Storey').replace('duplex', 'Duplex')}
              </span>
            </div>
            <h1 className="font-serif text-4xl tracking-tight text-jufaja-forest sm:text-5xl">
              {design.name}
            </h1>
            <p className="mt-2 text-xs font-medium text-jufaja-muted sm:text-sm">
                {design.series} design · listed details require confirmation
            </p>
          </div>

          {/* Core Specs Badge Cluster & Tour CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-3 border border-jufaja-border bg-jufaja-cream px-4 py-3 text-sm font-medium text-jufaja-forest sm:gap-4 sm:px-5">
              <div className="flex items-center gap-1.5"><Bed aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" />
                <span>{design.bedrooms} Beds</span>
              </div>
              <span className="text-slate-300">&bull;</span>
              <div className="flex items-center gap-1.5">
                <Bath aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" />
                <span>{design.bathrooms} Baths</span>
              </div>
              <span className="text-slate-300">&bull;</span>
              <div className="flex items-center gap-1.5">
                <Car aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600" />
                <span>{design.garages} Car</span>
              </div>
            </div>

          </div>
        </div>

        {/* 2-Column Showcase: Façades & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Facade Viewer */}
          <div className="lg:col-span-2">
            <FacadeGallery facades={design.facades} designName={design.name} />
          </div>

          {/* Right 1 Col: Highlights & Quick Enquiry */}
          <div className="space-y-6">
            <div className="border border-jufaja-border bg-white p-6 shadow-jufaja-soft">
              <h3 className="text-lg font-bold text-jufaja-forest mb-4">
                Listed specifications
              </h3>
              <p className="text-sm leading-6 text-jufaja-muted">The catalogue lists {design.bedrooms} bedrooms, {design.bathrooms} bathrooms and {design.garages} garage spaces. Confirm the current plan and specifications with JUFAJA.</p>
            </div>

            {/* Quote Action Box */}
            <div className="space-y-4 rounded-sm border border-jufaja-border bg-jufaja-cream p-6 text-center">
              <h2 className="font-serif text-2xl text-jufaja-forest">Interested in this design?</h2>
              <p className="text-sm leading-6 text-jufaja-muted">Ask about current plans, site fit and available options.</p>
              <Link href={`/contact?design=${encodeURIComponent(design.name)}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-jufaja-forest px-5 text-sm font-semibold text-white hover:bg-jufaja-forest-800">Ask JUFAJA <ArrowLeft aria-hidden="true" className="h-4 w-4 rotate-180 text-jufaja-gold-400" /></Link>
            </div>
          </div>

        </div>

        {/* Plan availability and listed dimensions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FloorplanViewer designName={design.name} />
          </div>
          <div>
            <DimensionTable design={design} />
          </div>
        </div>

        {/* Related Designs Section */}
        {relatedDesigns.length > 0 && (
          <div className="border-t border-jufaja-border pt-12">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-jufaja-gold-600">
                  Similar listings
                </span>
                <h3 className="mt-1 font-serif text-3xl text-jufaja-forest">
                  More {design.dwellingType === 'single' ? 'single storey' : design.dwellingType === 'double' ? 'double storey' : design.dwellingType} designs
                </h3>
              </div>
              <Link href="/designs" className="inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-semibold text-jufaja-forest hover:text-jufaja-forest-700">
                View All Designs &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDesigns.map((rel) => (
                <DesignCard key={rel.id} design={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
