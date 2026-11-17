// Tipos e rótulos dos vasos. A lista em si fica no banco (Supabase) e é
// editada pelo dono no painel. Ver src/data/catalog.ts.

export type ProductType =
  'vasos' | 'bacias' | 'cachepos' | 'fontes' | 'acessorios';

export type Product = {
  slug: string;
  name: string;
  type: ProductType;
  description: string;
  image: string;
  // Silhueta com uma pessoa ou garrafa ao lado, para dar noção do tamanho.
  // Vasos novos podem não ter.
  measure: string | null;
  // Tamanho da foto, para o Next reservar o espaço antes de carregar
  size: { width: number; height: number };
};

export const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'vasos', label: 'Vasos' },
  { value: 'bacias', label: 'Bacias e cuias' },
  { value: 'cachepos', label: 'Cachepôs' },
  { value: 'fontes', label: 'Fontes' },
  { value: 'acessorios', label: 'Acessórios' },
];

export function typeLabel(type: ProductType) {
  return PRODUCT_TYPES.find((item) => item.value === type)?.label ?? '';
}

// Os vasos que vieram do site antigo têm uma imagem de prévia pronta, com
// foto e nome. Os novos usam a própria foto.
export function shareImage(product: Product) {
  if (product.image.startsWith('/images/vasos/')) {
    return { url: `/og/vasos/${product.slug}.jpg`, width: 1200, height: 630 };
  }
  return { url: product.image, ...product.size };
}
