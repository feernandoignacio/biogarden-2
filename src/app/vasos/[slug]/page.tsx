import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeading } from '@/components/PageHeading';
import { ProductCard } from '@/components/ProductCard';
import {
  findProduct,
  measureImage,
  productImage,
  products,
  typeLabel,
} from '@/data/products';
import { whatsappLink } from '@/data/site';
import styles from './page.module.css';

// Uma página pronta para cada vaso, gerada no build
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/vasos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return {
    title: `Vaso ${product.name} | Biogarden Paisagismo`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<'/vasos/[slug]'>) {
  const { slug } = await params;
  const product = findProduct(slug);
  // Endereço de vaso que não existe vai para a página 404
  if (!product) notFound();

  // Outros modelos do mesmo tipo, para continuar navegando
  const related = products
    .filter((item) => item.type === product.type && item.slug !== product.slug)
    .slice(0, 4);

  return (
    <main>
      <PageHeading
        title={product.name}
        trail={[
          { href: '/', label: 'Início' },
          { href: '/vasos', label: 'Vasos' },
        ]}
      />

      <section className={styles.product}>
        <div className={styles.photo}>
          <Image
            src={productImage(product)}
            alt={`Vaso ${product.name}`}
            width={product.size.width}
            height={product.size.height}
            priority
          />
        </div>

        <div className={styles.details}>
          <p className={styles.type}>{typeLabel(product.type)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.measure}>
            <Image
              src={measureImage(product)}
              alt={`Silhueta do ${product.name} ao lado de uma referência de tamanho`}
              width={446}
              height={300}
            />
            <p>
              Tamanho de referência. Para as medidas exatas, fale com a gente.
            </p>
          </div>

          <div className={styles.actions}>
            <a
              href={whatsappLink(
                `Olá! Vim pelo site e quero um orçamento do vaso ${product.name}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className={styles.primary}
            >
              Pedir orçamento deste vaso
            </a>
            <Link href="/vasos" className={styles.secondary}>
              Ver todos os vasos
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <h2>Outros modelos de {typeLabel(product.type).toLowerCase()}</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
