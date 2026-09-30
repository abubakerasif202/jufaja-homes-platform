import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickEnquiryDrawer from '@/components/layout/QuickEnquiryDrawer';
import StructuredData from '@/components/layout/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://jufajahomes.com.au'),
  title: {
    default: 'Specialist Home Builders Sydney | JUFAJA Homes',
    template: '%s | JUFAJA Homes Sydney',
  },
  description: 'JUFAJA Homes are quality specialist builders in Sydney. Master catalogue of 63 single & double storey home designs, knockdown rebuilds, duplexes, and turnkey packages.',
  keywords: [
    'Sydney home builders',
    'JUFAJA homes',
    'single storey designs',
    'double storey designs',
    'knockdown rebuild Sydney',
    'house and land packages',
    'custom builder Prestons'
  ],
  openGraph: {
    title: 'Specialist Home Builders Sydney | JUFAJA Homes',
    description: 'Explore 63 architectural home designs, interactive floorplans, and turnkey house & land packages across Sydney.',
    siteName: 'JUFAJA Homes',
    locale: 'en_AU',
    type: 'website',
  },
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
      <body className="min-h-screen flex flex-col antialiased bg-white selection:bg-brand-orange selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <QuickEnquiryDrawer />
      </body>
    </html>
  );
}
