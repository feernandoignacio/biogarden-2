import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeading } from '@/components/PageHeading';
import { ProductCard } from '@/components/ProductCard';
import { getProduct, getProducts } from '@/data/catalog';
import { shareImage, typeLabel } from '@/data/products';
import { whatsappLink } from '@/data/site';
import styles from './page.module.css';

// Uma página pronta para cada vaso, gerada no build. Vasos criados depois
// no painel ganham a página na primeira visita.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/vasos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  const title = `Vaso ${product.name} | Biogarden Paisagismo`;
  // Imagem que aparece ao compartilhar o link (WhatsApp, redes sociais)
  const image = { ...shareImage(product), alt: `Vaso ${product.name}` };
  return {
    title,
    description: product.description,
    alternates: { canonical: `/vasos/${product.slug}` },
    openGraph: {
      title,
      description: product.description,
      url: `/vasos/${product.slug}`,
      images: [image],
    },
    twitter: { images: [image.url] },
  };
}

export default async function ProductPage({
  params,
}: PageProps<'/vasos/[slug]'>) {
  const { slug } = await params;
  const product = await getProduct(slug);
  // Endereço de vaso que não existe vai para a página 404
  if (!product) notFound();

  // Outros modelos do mesmo tipo, para continuar navegando
  const related = (await getProducts())
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
            src={product.image}
            alt={`Vaso ${product.name}`}
            width={product.size.width}
            height={product.size.height}
            priority
          />
        </div>

        <div className={styles.details}>
          <p className={styles.type}>{typeLabel(product.type)}</p>
          <p className={styles.description}>{product.description}</p>

          {product.measure && (
            <div className={styles.measure}>
              <Image
                src={product.measure}
                alt={`Silhueta do ${product.name} ao lado de uma referência de tamanho`}
                width={446}
                height={300}
              />
              <p>
                Tamanho de referência. Para as medidas exatas, fale com a gente.
              </p>
            </div>
          )}

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
