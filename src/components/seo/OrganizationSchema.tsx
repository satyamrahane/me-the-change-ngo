import React from 'react';
import { siteConfig } from '@/config/site';

export const OrganizationSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NonProfitOrganization',
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '160, Gavthan Shivaji Nagar',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411005',
      addressCountry: 'IN',
    },
    founder: {
      '@type': 'Person',
      name: 'Ganesh Chavan',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+919881098920',
        contactType: 'Helpline',
      },
    ],
    sameAs: [siteConfig.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
