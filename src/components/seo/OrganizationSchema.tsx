import React from 'react';
import { siteConfig } from '@/config/site';

export const OrganizationSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NonProfitOrganization',
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    name: siteConfig.name,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'Customer Service',
        email: siteConfig.contact.email,
      },
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.youtube, siteConfig.social.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
