import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { ProductType } from '@/data/products';
import { categoryHref } from '../../_categories';
import { getPanelContext } from '../../_lib';
import { PageTitle } from '../../_components/PageTitle';
import { PanelLoader } from '../../_components/PanelLoader';
import { PanelShell } from '../../_components/PanelShell';
import { ProductForm } from '../../_components/ProductForm';

// Editar qualquer item (vaso ou produto da loja)
export default function EditProductPage({
  params,
}: PageProps<'/painel/vasos/[slug]'>) {
  return (
    <Suspense fallback={<PanelLoader label="Carregando item" />}>
      <EditProduct params={params} />
    </Suspense>
  );
}

async function EditProduct({
  params,
}: Pick<PageProps<'/painel/vasos/[slug]'>, 'params'>) {
  const { slug } = await params;
  const { supabase, email, categories } = await getPanelContext();
  const { data } = await supabase
    .from('products')
    .select(
      'slug, name, type, description, stock, visible, image_url, category',
    )
    .eq('slug', slug)
    .maybeSingle();

  const category = categories.find((item) => item.slug === data?.category);
  if (!data || !category) notFound();

  return (
    <PanelShell email={email} categories={categories} active={category.slug}>
      <PageTitle
        title="Editar item"
        crumb={data.name}
        parent={{ href: categoryHref(category.slug), label: category.name }}
      />
      <ProductForm
        category={{ slug: category.slug, name: category.name }}
        product={{
          slug: data.slug,
          name: data.name,
          type: data.type as ProductType | null,
          description: data.description,
          stock: data.stock,
          visible: data.visible,
          image: data.image_url,
        }}
      />
    </PanelShell>
  );
}
