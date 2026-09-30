import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jufaja-homes-platform.vercel.app';
  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/designs`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/knockdown-rebuild`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/custom-homes`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/inclusions`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/display-homes`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return staticRoutes;
}
