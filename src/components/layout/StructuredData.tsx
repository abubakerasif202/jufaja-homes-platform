import React from 'react';

export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'JUFAJA Homes',
    description: 'Premier specialist home builder in Sydney. Specialising in single and double storey homes, knockdown rebuilds, custom homes, duplexes, and turnkey packages.',
    url: 'https://jufajahomes.com.au',
    telephone: '+61 2 8783 8800',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Avalli Road',
      addressLocality: 'Prestons',
      addressRegion: 'NSW',
      postalCode: '2170',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.9336659,
      longitude: 150.877286
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '17:00'
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
