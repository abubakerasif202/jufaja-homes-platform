import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickEnquiryDrawer from '@/components/layout/QuickEnquiryDrawer';
import StructuredData from '@/components/layout/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://jufaja-homes-platform.vercel.app'),
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
    url: 'https://jufaja-homes-platform.vercel.app/',
    siteName: 'JUFAJA Constructions',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary',
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
    <html lang="en-AU" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-white text-jufaja-charcoal selection:bg-jufaja-gold selection:text-jufaja-forest font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <QuickEnquiryDrawer />
      </body>
    </html>
  );
}
