import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import rawPackages from '@/data/packages.json';
import type { PackageListing } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return (rawPackages as PackageListing[]).map(({ slug }) => ({ slug }));
}

export function generateMetadata(): Metadata {
  return {
    title: 'House and Land Details',
    robots: { index: false, follow: true },
  };
}

export default async function PackageDetailsPage({ params }: Props) {
  const { slug } = await params;
  const packageExists = (rawPackages as PackageListing[]).some((listing) => listing.slug === slug);
  if (!packageExists) return <main className="mx-auto max-w-3xl px-4 py-24 text-center"><h1 className="font-serif text-4xl text-jufaja-forest">Package not found</h1><Link className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-jufaja-forest" href="/packages"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Return to house and land information</Link></main>;

  return (
    <main className="flex min-h-[65vh] items-center bg-jufaja-cream py-16">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">House &amp; land</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-jufaja-forest sm:text-5xl">Please confirm the latest package details.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-jufaja-muted sm:text-base">
          Availability, pricing, land details and inclusions can change. Contact JUFAJA directly for current information about house and land options.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact?interest=House%20%26%20Land" className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white hover:bg-jufaja-forest-800">Ask about current options <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" /></Link>
          <Link href="/packages" className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-jufaja-border bg-white px-6 py-3 text-sm font-semibold text-jufaja-forest">Back to house &amp; land</Link>
        </div>
      </div>
    </main>
  );
}
