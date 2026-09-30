import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About JUFAJA Constructions',
  description: 'Meet JUFAJA Constructions and explore the home design and building services available through the website.',
  alternates: { canonical: '/about-us' },
};

const routes = [
  { title: 'Home designs', href: '/designs', text: 'Browse the current online catalogue and compare the listed layouts.' },
  { title: 'Custom homes', href: '/custom-homes', text: 'Share your brief and discuss a home shaped around your site and priorities.' },
  { title: 'Knockdown rebuild', href: '/knockdown-rebuild', text: 'Explore the information available for replacing an existing home.' },
  { title: 'House and land', href: '/packages', text: 'View online listings and contact JUFAJA to confirm current details.' },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-jufaja-cream">
      <section className="relative overflow-hidden border-b border-jufaja-border bg-white py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 bg-blueprint-fine opacity-35 lg:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-jufaja-gold-600">JUFAJA Constructions</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-jufaja-forest sm:text-7xl">A clearer way to begin planning your home.</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-jufaja-muted sm:text-lg">
            JUFAJA Constructions shares home designs and building information to help you consider what may suit your plans. Every site and brief is different, so project details are best discussed directly.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/designs" className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-jufaja-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jufaja-forest-800">Explore home designs <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-400" /></Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center rounded-sm border border-jufaja-border bg-white px-6 py-3 text-sm font-semibold text-jufaja-forest transition-colors hover:border-jufaja-gold-500">Contact JUFAJA</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">An introduction</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-jufaja-forest">Javed Iqbal</h2>
          </div>
          <div className="lg:col-span-8 lg:border-l lg:border-jufaja-border lg:pl-12">
            <p className="max-w-3xl text-base leading-7 text-jufaja-muted">
              If you are weighing up a new home, a custom brief or a knockdown rebuild, start with the questions that matter to you. The team can discuss the information shown on this site and help you understand what would need to be confirmed for your project.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-jufaja-muted">
              Catalogue plans, package listings, images and indicative details are a starting point. Check availability, specifications, pricing, site conditions and approvals directly before relying on them.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-jufaja-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jufaja-gold-600">Explore the options</p>
            <h2 className="mt-3 font-serif text-4xl text-jufaja-forest">Choose a place to start.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((route, index) => (
              <Link key={route.href} href={route.href} className="group min-h-48 rounded-sm border border-jufaja-border bg-jufaja-cream p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-jufaja-gold-500 hover:shadow-jufaja-soft">
                <span className="text-xs font-semibold tabular-nums text-jufaja-gold-600">0{index + 1}</span>
                <h3 className="mt-5 font-serif text-2xl text-jufaja-forest">{route.title}</h3>
                <p className="mt-2 text-sm leading-6 text-jufaja-muted">{route.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-jufaja-forest">Explore <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
