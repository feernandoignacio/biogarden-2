import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

// Libera o site todo para o Google e indica onde está a lista de páginas
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
