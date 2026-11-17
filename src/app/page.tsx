import { About } from '@/components/About';
import { Hero } from '@/components/Hero';
import { Location } from '@/components/Location';
import { ProductsPreview } from '@/components/ProductsPreview';
import { Services } from '@/components/Services';

// Seções na ordem do menu: sobre, vasos e serviços; o mapa fecha a página
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ProductsPreview />
      <Services />
      <Location />
    </main>
  );
}
