import { Suspense } from 'react';
import type { ProductType } from '@/data/products';
import { getPanelContext } from './_lib';
import { PanelLoader } from './_components/PanelLoader';
import { PanelShell } from './_components/PanelShell';
import { ProductTable, type PanelProduct } from './_components/ProductTable';
import styles from './page.module.css';

export default function PanelPage({ searchParams }: PageProps<'/painel'>) {
  return (
    <Suspense fallback={<PanelLoader label="Carregando vasos" />}>
      <PanelHome searchParams={searchParams} />
    </Suspense>
  );
}

async function PanelHome({
  searchParams,
}: {
  searchParams: PageProps<'/painel'>['searchParams'];
}) {
  const { supabase, email } = await getPanelContext();
  const [{ salvo }, { data, error }] = await Promise.all([
    searchParams,
    supabase
      .from('products')
      .select('slug, name, type, image_url, visible, stock, updated_at')
      .order('position'),
  ]);

  const products: PanelProduct[] = (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    type: row.type as ProductType,
    image: row.image_url,
    visible: row.visible,
    stock: row.stock,
    updated: relativeDay(row.updated_at),
  }));

  return (
    <PanelShell email={email} total={products.length}>
      {error ? (
        <p className={styles.loading}>
          Não foi possível carregar os vasos. Atualize a página.
        </p>
      ) : (
        <ProductTable
          products={products}
          saved={typeof salvo === 'string' ? salvo : null}
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
