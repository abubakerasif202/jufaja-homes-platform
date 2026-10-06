import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickEnquiryDrawer from '@/components/layout/QuickEnquiryDrawer';
import StructuredData from '@/components/layout/StructuredData';
import { SITE_URL } from '@/lib/site-metadata';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'JUFAJA Constructions | Home Designs & Building Enquiries',
    template: '%s | JUFAJA Constructions',
  },
  description: 'Explore JUFAJA Constructions home designs, custom home enquiries, knockdown rebuild information and house and land enquiries.',
  keywords: [
    'Australian home designs',
    'JUFAJA homes',
    'single storey designs',
    'double storey designs',
    'knockdown rebuild information',
    'house and land packages',
  ],
  openGraph: {
    title: 'JUFAJA Constructions | Home Designs & Building Enquiries',
    description: 'Explore home designs, custom home enquiries, knockdown rebuild information and house and land enquiries.',
    url: `${SITE_URL}/`,
    siteName: 'JUFAJA Constructions',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: '/brand/jufaja-logo.png', width: 768, height: 512, alt: 'JUFAJA Constructions Pty Ltd logo' }],
  },
  twitter: {
    card: 'summary',
    images: ['/brand/jufaja-logo.png'],
    title: 'JUFAJA Constructions | Home Designs & Building Enquiries',
    description: 'Explore home designs, custom home enquiries, knockdown rebuild information and house and land enquiries.',
  },
  icons: { icon: '/brand/favicon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <noscript><style>{`.jufaja-intro { display: none !important; } body:has(.jufaja-intro) { overflow: visible !important; } [data-reveal] { opacity: 1 !important; transform: none !important; } [data-reveal-curtain] { display: none !important; } [data-text-reveal-word] { transform: none !important; }`}</style></noscript>
        <Script
          id="jufaja-intro-session"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "try { if (sessionStorage.getItem('jufaja_intro_viewed') === 'true') document.documentElement.classList.add('jufaja-intro-seen'); } catch {}",
          }}
        />
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-white text-jufaja-charcoal selection:bg-jufaja-gold selection:text-jufaja-forest font-sans">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          {children}
        </main>
        <Footer />
        <QuickEnquiryDrawer />
      </body>
    </html>
  );
}
