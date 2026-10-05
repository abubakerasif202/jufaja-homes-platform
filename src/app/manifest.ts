import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'JUFAJA Constructions',
    short_name: 'JUFAJA',
    description: 'Home designs and building enquiries with JUFAJA Constructions.',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#f8f6f0',
    theme_color: '#163d2b',
    lang: 'en-AU',
    icons: [{ src: '/brand/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
