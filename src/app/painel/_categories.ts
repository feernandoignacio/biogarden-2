// Pode ser usado no navegador e no servidor (sem acesso ao banco aqui)

export type PanelCategory = { slug: string; name: string; count: number };

// Só a categoria Vasos aparece no site; as outras são da loja física
export const SITE_CATEGORY = 'vasos';

// Endereço da lista de uma categoria: Vasos fica no início do painel
export function categoryHref(slug: string) {
  return slug === SITE_CATEGORY ? '/painel' : `/painel/${slug}`;
}
