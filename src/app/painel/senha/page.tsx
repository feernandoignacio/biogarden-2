import { Suspense } from 'react';
import { SITE_CATEGORY, categoryHref } from '../_categories';
import { getPanelContext } from '../_lib';
import { PageTitle } from '../_components/PageTitle';
import { PanelLoader } from '../_components/PanelLoader';
import { PanelShell } from '../_components/PanelShell';
import { PasswordForm } from './PasswordForm';

export default function PasswordPage() {
  return (
    <Suspense fallback={<PanelLoader />}>
      <Password />
    </Suspense>
  );
}

async function Password() {
  const { email, categories } = await getPanelContext();
  return (
    <PanelShell email={email} categories={categories} active="senha">
      <PageTitle
        title="Trocar senha"
        crumb="Trocar senha"
        parent={{ href: categoryHref(SITE_CATEGORY), label: 'Painel' }}
      />
      <PasswordForm email={email} />
    </PanelShell>
  );
}
