import Link from 'next/link';
import { getProducts } from '@/data/catalog';
import { ProductCard } from './ProductCard';
import styles from './ProductsPreview.module.css';

// Modelos em destaque na página inicial, um pouco de cada tipo
const FEATURED = [
  'toscano',
  'bacia-japonesa',
  'cachepot-esfera',
  'marrocos',
  'continental',
  'fonte-tunes',
  'lisboa',
  'jardineira-cuia',
];

export async function ProductsPreview() {
  const products = await getProducts();
  // Se algum destaque sair do catálogo, completa com os próximos da lista
  const featured = [
    ...products.filter((product) => FEATURED.includes(product.slug)),
    ...products.filter((product) => !FEATURED.includes(product.slug)),
  ].slice(0, FEATURED.length);

  return (
    <section id="vasos" className={styles.preview}>
      <div className={styles.top}>
        <div>
          <p className={styles.kicker}>Vasos</p>
          <h2 className={styles.title}>Um vaso para cada espaço</h2>
        </div>
        <Link href="/vasos" className={styles.all}>
          Ver os {products.length} modelos
        </Link>
      </div>

      <ul className={styles.grid}>
        {featured.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
