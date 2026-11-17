import type { Metadata } from 'next';
import { Catalog } from '@/components/Catalog';
import { PageHeading } from '@/components/PageHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Vasos decorativos | Biogarden Paisagismo',
  description:
    'Catálogo de vasos, bacias, cachepôs e fontes da Biogarden, no Ceasa Campinas.',
};

export default function VasesPage() {
  return (
    <main>
      <PageHeading
        title="Nossos vasos"
        text="Escolha o modelo e peça um orçamento pelo WhatsApp. Todos podem ser montados com a planta na hora, na nossa loja."
        trail={[{ href: '/', label: 'Início' }]}
      />
      <section className={styles.content}>
        <Catalog />
      </section>
    </main>
  );
}
