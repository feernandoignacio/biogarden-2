import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

// Libera o site para o Google (menos o painel) e indica onde está a lista de páginas
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/painel' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
