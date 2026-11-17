import type { MetadataRoute } from 'next';
import { getProducts } from '@/data/catalog';
import { SITE_URL } from '@/data/site';

// Lista de páginas para o Google: início, catálogo e cada vaso
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/vasos`, changeFrequency: 'weekly', priority: 0.9 },
    ...products.map((product) => ({
      url: `${SITE_URL}/vasos/${product.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
