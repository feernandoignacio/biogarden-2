import { connection } from 'next/server';
import { Suspense } from 'react';
import { typeLabel, type ProductType } from '@/data/products';
import { createSupabaseServer } from '@/lib/supabase/server';
import { signOut } from './actions';
import styles from './page.module.css';

export default function PanelPage() {
  return (
    <main className={styles.page}>
      <header className={styles.bar}>
        <p className={styles.brand}>Painel Biogarden</p>
        <form action={signOut}>
          <button type="submit" className={styles.logout}>
            Sair
          </button>
        </form>
      </header>
      <Suspense
        fallback={<p className={styles.loading}>Carregando vasos...</p>}
      >
        <ProductList />
      </Suspense>
    </main>
  );
}

// Lista provisória: a tela completa de vasos entra na próxima parte
async function ProductList() {
  // Sempre na hora: a lista depende de quem está logado
  await connection();
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('products')
    .select('slug, name, type, visible')
    .order('position');

  if (error) {
    return (
      <p className={styles.loading}>Não foi possível carregar os vasos.</p>
    );
  }

  return (
    <section className={styles.content}>
      <h1 className={styles.title}>Vasos ({data.length})</h1>
      <ul className={styles.list}>
        {data.map((product) => (
          <li key={product.slug}>
            <span>{product.name}</span>
            <span className={styles.meta}>
              {typeLabel(product.type as ProductType)}
              {!product.visible && ' · escondido'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
