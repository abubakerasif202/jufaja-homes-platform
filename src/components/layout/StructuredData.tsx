import { SITE_URL } from '@/lib/site-metadata';

export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JUFAJA Constructions Pty Ltd',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/jufaja-logo.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
