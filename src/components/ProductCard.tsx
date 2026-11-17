import Image from 'next/image';
import Link from 'next/link';
import { typeLabel, type Product } from '@/data/products';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/vasos/${product.slug}`} className={styles.card}>
      <div className={styles.photo}>
        <Image
          src={product.image}
          alt={`Vaso ${product.name}`}
          width={product.size.width}
          height={product.size.height}
          sizes="200px"
        />
      </div>
      <p className={styles.type}>{typeLabel(product.type)}</p>
      <h3 className={styles.name}>{product.name}</h3>
    </Link>
  );
}
