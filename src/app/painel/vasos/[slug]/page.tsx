import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { ProductType } from '@/data/products';
import { getPanelContext } from '../../_lib';
import { PageTitle } from '../../_components/PageTitle';
import { PanelLoader } from '../../_components/PanelLoader';
import { PanelShell } from '../../_components/PanelShell';
import { ProductForm } from '../../_components/ProductForm';

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
}: {
  params: PageProps<'/painel/vasos/[slug]'>['params'];
}) {
  const { slug } = await params;
  const { supabase, email, total } = await getPanelContext();
  const { data } = await supabase
    .from('products')
    .select('slug, name, type, description, stock, visible, image_url')
    .eq('slug', slug)
    .maybeSingle();

  if (!data) notFound();

  return (
    <PanelShell email={email} total={total}>
      <PageTitle title="Editar item" crumb={data.name} />
      <ProductForm
        product={{
          slug: data.slug,
          name: data.name,
          type: data.type as ProductType,
          description: data.description,
          stock: data.stock,
          visible: data.visible,
          image: data.image_url,
        }}
      />
    </PanelShell>
  );
}
