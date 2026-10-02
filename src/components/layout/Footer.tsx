import TextReveal from '@/components/motion/TextReveal';
import Link from 'next/link';
import ButtonLink from '@/components/ui/ButtonLink';
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
      <div aria-hidden="true" className="bg-blueprint-dark pointer-events-none absolute inset-0 opacity-50" />
      <svg aria-hidden="true" viewBox="0 0 800 400" fill="none" className="pointer-events-none absolute -right-20 -top-10 hidden h-[26rem] text-jufaja-gold-500 opacity-20 md:block">
        <path d="M20 380 L400 40 L780 380" stroke="currentColor" strokeWidth="1" />
        <path d="M110 380 L400 120 L690 380" stroke="currentColor" strokeWidth="0.6" />
        <path d="M0 380 H800" stroke="currentColor" strokeWidth="0.6" strokeDasharray="6 8" />
      </svg>
      <div className="footer-statement"><p className="eyebrow eyebrow--light">Your future starts here</p><h2><TextReveal text="Let’s build your next chapter." /></h2><ButtonLink href="/contact" variant="gold">Start a conversation</ButtonLink></div>
      <div aria-hidden="true" className="footer-wordmark">JUFAJA</div>
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="JUFAJA Constructions home" className="inline-block rounded-sm">
              <JufajaLogo theme="dark" size="lg" className="logo-glow" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-jufaja-ivory/75">
              Home designs, building information and ways to start a conversation about your plans.
            </p>
            <ButtonLink href="/contact" variant="gold" className="mt-7">Contact JUFAJA</ButtonLink>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="eyebrow eyebrow--light">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="hover-gold-sweep rounded-sm text-sm text-jufaja-ivory/75 transition-colors hover:text-white">{label}</Link>
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
