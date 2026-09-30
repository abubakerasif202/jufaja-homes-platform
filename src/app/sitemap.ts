import { MetadataRoute } from 'next';
import designsData from '@/data/designs.json';
import packagesData from '@/data/packages.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jufajahomes.com.au';
  const currentDate = new Date().toISOString();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/designs`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/knockdown-rebuild`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/custom-homes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/inclusions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/display-homes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 63 Home Design Dynamic Routes
  const designRoutes: MetadataRoute.Sitemap = designsData.map((design) => ({
    url: `${baseUrl}/designs/${design.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 16 House & Land Package Dynamic Routes
  const packageRoutes: MetadataRoute.Sitemap = packagesData.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...staticRoutes, ...designRoutes, ...packageRoutes];
}
