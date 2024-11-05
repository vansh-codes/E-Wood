import type { MetadataRoute } from 'next'
 

//* refer here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://localhost:3000',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/products',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://localhost:3000/products/:id',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://localhost:3000/orders',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://localhost:3000/orders/:id',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://localhost:3000/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://localhost:3000/cart',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://localhost:3000/orders/:id/track',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://localhost:3000/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: 'https://localhost:3000/logout',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: 'https://localhost:3000/order-confirmation',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: 'https://localhost:3000/contact',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://localhost:3000/faq',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://localhost:3000/privacy',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2,
    },
    {
      url: 'https://localhost:3000/terms',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2,
    },
    {
      url: 'https://localhost:3000/profile',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]
}