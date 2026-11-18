import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { SITE_CATEGORY } from '../_categories';
import { CategoryList } from '../_components/CategoryList';
import { PanelLoader } from '../_components/PanelLoader';

// Lista de uma categoria da loja (adubos, terra e substratos, jardim...)
export default function CategoryPage({
  params,
  searchParams,
}: PageProps<'/painel/[categoria]'>) {
  return (
    <Suspense fallback={<PanelLoader label="Carregando itens" />}>
      <Category params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Category({
  params,
  searchParams,
}: Pick<PageProps<'/painel/[categoria]'>, 'params' | 'searchParams'>) {
  const { categoria } = await params;
  if (categoria === SITE_CATEGORY) redirect('/painel');
  return <CategoryList slug={categoria} searchParams={searchParams} />;
}
