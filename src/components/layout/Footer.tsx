import Link from 'next/link';
import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';
import JufajaLogo from '@/components/brand/JufajaLogo';
import BusinessContactDetails from '@/components/contact/BusinessContactDetails';

const columns = [
  {
    title: 'Explore',
    links: [
      ['Home Designs', '/designs'],
      ['House & Land Enquiries', '/packages'],
      ['Display Home Enquiries', '/display-homes'],
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
      ['Enquiry Privacy', '/privacy'],
      ['Sitemap', '/sitemap.xml'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer cv-footer">
      <Link href="/" aria-label="JUFAJA Constructions home" className="cv-footer__logo">
        <JufajaLogo theme="dark" size="md" />
      </Link>

      <div className="cv-footer__links">
        {columns.map((column) => (
          <nav key={column.title} aria-label={`Footer ${column.title}`}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="cv-footer__contact">
        <p>Home designs, building information and ways to start a conversation about your plans.</p>
        <BusinessContactDetails dark />
        <ButtonLink href="/contact" variant="gold">Contact JUFAJA</ButtonLink>
      </div>

      <div className="cv-footer__legal">
        <p>© {new Date().getFullYear()} JUFAJA Constructions Pty Ltd.</p>
        <p>Website information is a starting point; confirm project details directly before relying on them.</p>
        <a
          href="https://abwebstudio.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="cv-footer__attribution"
        >
          <span>Designed &amp; Developed by</span>
          <Image
            src="/ab-web-studio-logo.webp"
            alt="AB Web Studio"
            width={672}
            height={309}
            sizes="148px"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
