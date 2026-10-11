import { SITE_URL } from '@/lib/site-metadata';
import { COMPANY_DETAILS } from '@/lib/company-details';

export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JUFAJA Constructions Pty Ltd',
    legalName: COMPANY_DETAILS.legalName,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'ACN', value: COMPANY_DETAILS.acn },
      { '@type': 'PropertyValue', propertyID: 'NSW Contractor Licence', value: COMPANY_DETAILS.contractorLicence, url: COMPANY_DETAILS.licenceRegisterUrl },
    ],
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
