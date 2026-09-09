import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,                              priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${base}/about`,                         priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${base}/initiatives`,                   priority: 0.9,  changeFrequency: 'weekly' },
    { url: `${base}/initiatives/food-relief`,       priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${base}/initiatives/medicine-aid`,      priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${base}/initiatives/crisis-relief`,     priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${base}/transparency`,                  priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${base}/get-involved`,                  priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${base}/csr-partnerships`,              priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${base}/donate`,                        priority: 0.9,  changeFrequency: 'weekly' },
    { url: `${base}/contact`,                       priority: 0.6,  changeFrequency: 'monthly' },
  ];

  return staticRoutes;
}
