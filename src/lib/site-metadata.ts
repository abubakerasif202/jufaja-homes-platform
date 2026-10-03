import type { Metadata } from 'next';

export const SITE_URL = 'https://jufaja-homes-platform.vercel.app';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} | JUFAJA Constructions`;
  return {
    title, description, alternates: { canonical: path },
    openGraph: {
      title: socialTitle, description, url: `${SITE_URL}${path}`,
      type: 'website', siteName: 'JUFAJA Constructions', locale: 'en_AU',
      images: [{ url: '/brand/jufaja-logo.png', width: 768, height: 512, alt: 'JUFAJA Constructions Pty Ltd logo' }],
    },
    twitter: { card: 'summary', title: socialTitle, description, images: ['/brand/jufaja-logo.png'] },
  };
}
