import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';
import LeadershipSection from '@/components/home/LeadershipSection';
import Reveal from '@/components/motion/Reveal';

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
          <p className="eyebrow">JUFAJA Constructions</p>
          <h1 className="type-h1 mt-4 max-w-3xl text-jufaja-forest">A clearer way to begin planning your home.</h1>
          <p className="type-lead mt-7 max-w-2xl text-jufaja-muted">
            JUFAJA Constructions shares home designs and building information to help you consider what may suit your plans. Every site and brief is different, so project details are best discussed directly.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/designs">Explore home designs</ButtonLink>
            <ButtonLink href="/contact" variant="outline" arrow={false}>Contact JUFAJA</ButtonLink>
          </div>
        </div>
      </section>

      <LeadershipSection variant="about" />

      <section className="border-y border-jufaja-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow">Explore the options</p>
            <h2 className="type-h2 mt-3 text-jufaja-forest">Choose a place to start.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((route, index) => (
              <Reveal key={route.href} delay={index * 0.08} className="h-full"><Link href={route.href} className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-sm border border-jufaja-border bg-jufaja-cream p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-jufaja-gold-500 hover:shadow-jufaja-card">
                <span className="text-xs font-semibold tabular-nums text-jufaja-gold-600">0{index + 1}</span>
                <h3 className="type-h3 mt-5 text-jufaja-forest">{route.title}</h3>
                <p className="mt-2 text-sm leading-6 text-jufaja-muted">{route.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-jufaja-forest">Explore <ArrowRight aria-hidden="true" className="h-4 w-4 text-jufaja-gold-600 transition-transform group-hover:translate-x-1" /></span>
              </Link></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
