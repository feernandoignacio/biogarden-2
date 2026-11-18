import { Suspense } from 'react';
import { getPanelContext } from '../../_lib';
import { PageTitle } from '../../_components/PageTitle';
import { PanelLoader } from '../../_components/PanelLoader';
import { PanelShell } from '../../_components/PanelShell';
import { ProductForm } from '../../_components/ProductForm';

export default function NewProductPage() {
  return (
    <Suspense fallback={<PanelLoader />}>
      <NewProduct />
    </Suspense>
  );
}

async function NewProduct() {
  const { email, total } = await getPanelContext();
  return (
    <PanelShell email={email} total={total}>
      <PageTitle title="Novo item" crumb="Novo item" />
      <ProductForm />
    </PanelShell>
  );
}
