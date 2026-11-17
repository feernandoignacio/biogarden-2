import { createClient } from '@supabase/supabase-js';
import { cacheLife, cacheTag } from 'next/cache';
import { SUPABASE_KEY, SUPABASE_URL } from '@/lib/supabase/config';
import type { Product, ProductType } from './products';

// Nome da etiqueta do cache: quando o dono salva algo no painel, o site
// descarta essa cópia e busca os vasos de novo no banco
export const PRODUCTS_TAG = 'products';

type ProductRow = {
  slug: string;
  name: string;
  type: ProductType;
  description: string;
  image_url: string;
  image_width: number;
  image_height: number;
  measure_url: string | null;
};

export function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    type: row.type,
    description: row.description,
    image: row.image_url,
    measure: row.measure_url,
    size: { width: row.image_width, height: row.image_height },
  };
}

// Vasos visíveis, na ordem do catálogo. Fica guardado em cache, então o
// banco só é consultado de novo quando o dono muda alguma coisa.
export async function getProducts(): Promise<Product[]> {
  'use cache';
  cacheTag(PRODUCTS_TAG);
  cacheLife('max');

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });
  const { data, error } = await supabase
    .from('products')
    .select(
      'slug, name, type, description, image_url, image_width, image_height, measure_url',
    )
    .eq('visible', true)
    .order('position');

  if (error) throw new Error(`Erro ao buscar os vasos: ${error.message}`);
  return data.map(toProduct);
}

export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}
