import { notFound } from 'next/navigation';
import type { ProductType } from '@/data/products';
import { getPanelContext } from '../_lib';
import { PanelShell } from './PanelShell';
import { ProductTable, type PanelProduct } from './ProductTable';
import styles from './CategoryList.module.css';

type Notice = {
  salvo?: string | string[];
  apagado?: string | string[];
  senha?: string | string[];
};

// Lista de itens de uma categoria (Vasos, Adubos, Jardim...)
export async function CategoryList({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams: Promise<Notice>;
}) {
  const { supabase, email, categories } = await getPanelContext();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const [{ salvo, apagado, senha }, { data, error }] = await Promise.all([
    searchParams,
    supabase
      .from('products')
      .select('slug, name, type, image_url, visible, stock, updated_at')
      .eq('category', slug)
      .order('position'),
  ]);

  const products: PanelProduct[] = (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    type: row.type as ProductType | null,
    image: row.image_url,
    visible: row.visible,
    stock: row.stock,
    updated: relativeDay(row.updated_at),
  }));

  return (
    <PanelShell email={email} categories={categories} active={slug}>
      {error ? (
        <p className={styles.error}>
          Não foi possível carregar os itens. Atualize a página.
        </p>
      ) : (
        <ProductTable
          category={{ slug: category.slug, name: category.name }}
          products={products}
          notice={
            typeof salvo === 'string'
              ? `"${salvo}" foi salvo.`
              : typeof apagado === 'string'
                ? `"${apagado}" foi apagado.`
                : senha
                  ? 'Senha trocada. Use a nova no próximo login.'
                  : null
          }
        />
      )}
    </PanelShell>
  );
}

// "Hoje", "Ontem", "Há 3 dias"... contando no horário de Brasília
function relativeDay(iso: string) {
  const day = (date: Date) =>
    new Date(
      date.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }),
    ).getTime();
  const days = Math.round((day(new Date()) - day(new Date(iso))) / 86_400_000);

  if (days <= 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  if (days < 7) return `Há ${days} dias`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? 'Há 1 semana' : `Há ${weeks} semanas`;
  }
  const months = Math.floor(days / 30);
  return months === 1 ? 'Há 1 mês' : `Há ${months} meses`;
}
