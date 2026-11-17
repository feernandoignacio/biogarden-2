import Link from 'next/link';
import { findProduct, products, type Product } from '@/data/products';
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

export function ProductsPreview() {
  const featured = FEATURED.map(findProduct).filter(
    (product): product is Product => product !== undefined,
  );

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
