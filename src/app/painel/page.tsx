import { Suspense } from 'react';
import { SITE_CATEGORY } from './_categories';
import { CategoryList } from './_components/CategoryList';
import { PanelLoader } from './_components/PanelLoader';

// Início do painel: a lista de vasos
export default function PanelPage({ searchParams }: PageProps<'/painel'>) {
  return (
    <Suspense fallback={<PanelLoader label="Carregando vasos" />}>
      <CategoryList slug={SITE_CATEGORY} searchParams={searchParams} />
    </Suspense>
  );
}
