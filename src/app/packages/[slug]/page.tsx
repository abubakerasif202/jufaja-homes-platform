import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import rawPackages from '@/data/packages.json';
import { PackageListing } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Bed, Bath, Car, ArrowLeft, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import ReservePackageButton from '@/components/packages/ReservePackageButton';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const packages = rawPackages as PackageListing[];
  return packages.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const packages = rawPackages as PackageListing[];
  const pkg = packages.find((p) => p.slug === params.slug);

  if (!pkg) return { title: 'Package Not Found' };

  return {
    title: `${pkg.title} (${pkg.suburb}) | House & Land | JUFAJA Homes`,
    description: `Complete turnkey house and land package in ${pkg.suburb}. ${pkg.bedrooms} beds, ${pkg.bathrooms} baths, ${pkg.garages} car. Fixed site costs and premium finishes for ${formatCurrency(pkg.price)}.`,
  };
}

export default function SinglePackagePage({ params }: Props) {
  const packages = rawPackages as PackageListing[];
  const pkg = packages.find((p) => p.slug === params.slug);

  if (!pkg) notFound();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 font-bold text-brand-navy hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Packages</span>
          </Link>
          <div className="text-slate-500 font-medium hidden sm:block">
            Packages &bull; {pkg.suburb} &bull; {pkg.title}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Title Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                {pkg.status}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                {pkg.suburb}, NSW
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              {pkg.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Paired with the {pkg.designName} &bull; Lot Size: {pkg.lotSizeSqm} m²
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
              100% Fixed Turnkey Price
            </span>
            <span className="text-3xl sm:text-4xl font-black text-brand-navy">
              {formatCurrency(pkg.price)}
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Visual & Inclusions */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-[360px] sm:h-[460px] w-full rounded-2xl overflow-hidden shadow-sm bg-slate-900 border border-slate-200">
              <Image
                src={pkg.facadeImage}
                alt={pkg.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Turnkey Inclusions Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Turnkey Package Inclusions</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700">
                {pkg.keyInclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Specs */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-brand-navy pb-3 border-b border-slate-100">
                Lot &amp; Living Specifications
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Bedrooms:</span>
                  <span className="font-bold text-brand-navy">{pkg.bedrooms} Bedrooms</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Bathrooms:</span>
                  <span className="font-bold text-brand-navy">{pkg.bathrooms} Bathrooms</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Garage Capacity:</span>
                  <span className="font-bold text-brand-navy">{pkg.garages} Car Garage</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Land Area:</span>
                  <span className="font-bold text-brand-navy">{pkg.lotSizeSqm} m²</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Fixed Site Costs:</span>
                  <span className="font-bold text-emerald-600">Guaranteed Included</span>
                </div>
              </div>

              {/* Reserve Button */}
              <ReservePackageButton 
                title={pkg.title} 
                suburb={pkg.suburb} 
                formattedPrice={formatCurrency(pkg.price)} 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
