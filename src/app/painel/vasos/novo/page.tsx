import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { categoryHref, SITE_CATEGORY } from '../../_categories';
import { getPanelContext } from '../../_lib';
import { PageTitle } from '../../_components/PageTitle';
import { PanelLoader } from '../../_components/PanelLoader';
import { PanelShell } from '../../_components/PanelShell';
import { ProductForm } from '../../_components/ProductForm';

// Cadastrar item. A categoria vem do endereço (?categoria=adubos);
// sem ela, o item é um vaso.
export default function NewProductPage({
  searchParams,
}: PageProps<'/painel/vasos/novo'>) {
  return (
    <Suspense fallback={<PanelLoader />}>
      <NewProduct searchParams={searchParams} />
    </Suspense>
  );
}

async function NewProduct({
  searchParams,
}: Pick<PageProps<'/painel/vasos/novo'>, 'searchParams'>) {
  const [{ categoria }, { email, categories }] = await Promise.all([
    searchParams,
    getPanelContext(),
  ]);
  const slug = typeof categoria === 'string' ? categoria : SITE_CATEGORY;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <PanelShell email={email} categories={categories} active={category.slug}>
      <PageTitle
        title={`Novo item em ${category.name}`}
        crumb="Novo item"
        parent={{ href: categoryHref(category.slug), label: category.name }}
      />
      <ProductForm category={{ slug: category.slug, name: category.name }} />
    </PanelShell>
  );
}
