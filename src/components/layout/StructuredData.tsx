export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JUFAJA Constructions Pty Ltd',
    url: 'https://jufaja-homes-platform.vercel.app/',
    logo: 'https://jufaja-homes-platform.vercel.app/brand/jufaja-logo.png',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
