import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import rawDesigns from '@/data/designs.json';
import { HomeDesign } from '@/types';
import { formatSquares, formatSqm, formatCurrency } from '@/lib/utils';
import { Bed, Bath, Car, ArrowLeft, Check, Sparkles } from 'lucide-react';
import FloorplanViewer from '@/components/designs/FloorplanViewer';
import DimensionTable from '@/components/designs/DimensionTable';
import VirtualTourModal from '@/components/designs/VirtualTourModal';
import FacadeGallery from '@/components/designs/FacadeGallery';
import DesignCard from '@/components/catalogue/DesignCard';
import EnquireDesignButton from '@/components/designs/EnquireDesignButton';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const designs = rawDesigns as HomeDesign[];
  return designs.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const designs = rawDesigns as HomeDesign[];
  const design = designs.find((d) => d.slug === params.slug);

  if (!design) return { title: 'Design Not Found' };

  return {
    title: `${design.name} (${formatSquares(design.houseSizeSquares)}) | JUFAJA Homes`,
    description: `Explore the ${design.name} by JUFAJA Homes. ${design.bedrooms} bed, ${design.bathrooms} bath, ${design.garages} car floorplan layout with ${formatSquares(design.houseSizeSquares)} built area. View floorplans and 3D tours.`,
    openGraph: {
      title: `${design.name} - Architectural Plan | JUFAJA Homes`,
      description: design.description,
      images: [design.facades[0]?.image || ''],
    },
  };
}

export default function SingleDesignPage({ params }: Props) {
  const designs = rawDesigns as HomeDesign[];
  const design = designs.find((d) => d.slug === params.slug);

  if (!design) notFound();

  const relatedDesigns = designs
    .filter((d) => d.dwellingType === design.dwellingType && d.id !== design.id)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Breadcrumb Header Bar */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
          <Link
            href="/designs"
            className="inline-flex items-center gap-1.5 font-bold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 63 Designs</span>
          </Link>
          <div className="text-slate-500 font-medium hidden sm:block">
            Home Designs &bull; {design.dwellingType.toUpperCase()} &bull; {design.name}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Design Header Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand-orange text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {formatSquares(design.houseSizeSquares)}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {design.dwellingType.replace('single', 'Single Storey').replace('double', 'Double Storey').replace('duplex', 'Duplex')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
              {design.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Part of the {design.series} Architectural Master Collection
            </p>
          </div>

          {/* Core Specs Badge Cluster & Tour CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-brand-navy font-bold text-sm">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-orange" />
                <span>{design.bedrooms} Beds</span>
              </div>
              <span className="text-slate-300">&bull;</span>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-brand-orange" />
                <span>{design.bathrooms} Baths</span>
              </div>
              <span className="text-slate-300">&bull;</span>
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-brand-orange" />
                <span>{design.garages} Car</span>
              </div>
            </div>

            {/* Virtual Tour Trigger */}
            {design.virtualTourUrl && (
              <VirtualTourModal virtualTourUrl={design.virtualTourUrl} designName={design.name} />
            )}
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
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>Design Highlights</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                {design.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Action Box */}
            <div className="bg-brand-navy rounded-xl p-6 text-white text-center shadow-lg border border-brand-surface space-y-4">
              <span className="text-xs font-black text-brand-orange uppercase tracking-wider block">
                FREE SITE FEASIBILITY CHECK
              </span>
              <h4 className="text-xl font-bold">
                Does the {design.name} fit your block?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Requires minimum {design.minLotWidth}m block frontage. Our site engineers will check your council requirements for zero cost.
              </p>
              <EnquireDesignButton designName={design.name} squares={design.houseSizeSquares} />
            </div>
          </div>

        </div>

        {/* Floorplans & Dimensions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FloorplanViewer floorplans={design.floorplans} designName={design.name} />
          </div>
          <div>
            <DimensionTable design={design} />
          </div>
        </div>

        {/* Related Designs Section */}
        {relatedDesigns.length > 0 && (
          <div className="pt-12 border-t border-slate-200">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                  EXPLORE ALTERNATIVES
                </span>
                <h3 className="text-2xl font-black text-brand-navy mt-0.5">
                  Similar {design.dwellingType === 'single' ? 'Single Storey' : 'Double Storey'} Designs
                </h3>
              </div>
              <Link href="/designs" className="text-xs font-bold text-brand-orange hover:underline">
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
    </div>
  );
}
