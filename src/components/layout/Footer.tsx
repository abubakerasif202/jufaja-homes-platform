import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JufajaLogo from '@/components/brand/JufajaLogo';

const columns = [
  {
    title: 'Explore',
    links: [
      ['Home Designs', '/designs'],
      ['House & Land', '/packages'],
      ['Display Homes', '/display-homes'],
      ['Design Inspiration', '/projects'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['Custom Homes', '/custom-homes'],
      ['Knockdown Rebuild', '/knockdown-rebuild'],
      ['Inclusions', '/inclusions'],
    ],
  },
  {
    title: 'JUFAJA',
    links: [
      ['About', '/about-us'],
      ['Contact', '/contact'],
      ['Sitemap', '/sitemap.xml'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-jufaja-gold/30 bg-jufaja-forest-950 text-jufaja-ivory">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="JUFAJA Constructions home" className="inline-block rounded-sm">
              <JufajaLogo theme="dark" size="lg" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-jufaja-ivory/75">
              Home designs, building information and ways to start a conversation about your plans.
            </p>
            <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm bg-jufaja-gold-500 px-5 py-3 text-xs font-semibold text-jufaja-forest-950 transition-colors hover:bg-jufaja-gold-400">
              Contact JUFAJA <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-jufaja-gold-400">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="rounded-sm text-sm text-jufaja-ivory/75 transition-colors hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-jufaja-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} JUFAJA Constructions Pty Ltd.</p>
          <p className="pr-44 sm:pr-48 sm:text-right">Website information is a starting point; confirm project details directly before relying on them.</p>
        </div>
      </div>
    </footer>
  );
}
