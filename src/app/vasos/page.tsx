import type { Metadata } from 'next';
import { Catalog } from '@/components/Catalog';
import { Finishes } from '@/components/Finishes';
import { PageHeading } from '@/components/PageHeading';
import { getProducts } from '@/data/catalog';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Vasos decorativos | Biogarden Paisagismo',
  description:
    'Catálogo de vasos, bacias, cachepôs e fontes da Biogarden, no Ceasa Campinas.',
};

export default async function VasesPage() {
  const products = await getProducts();

  return (
    <main>
      <PageHeading
        title="Nossos vasos"
        text="Escolha o modelo e peça um orçamento pelo WhatsApp. Todos podem ser montados com a planta na hora, na nossa loja."
        trail={[{ href: '/', label: 'Início' }]}
      />
      <section className={styles.content}>
        <Catalog products={products} />
      </section>
      {/* Depois de escolher o modelo, a pessoa vê as cores e os materiais */}
      <Finishes />
    </main>
  );
}
