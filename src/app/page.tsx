import { About } from '@/components/About';
import { Hero } from '@/components/Hero';
import { Location } from '@/components/Location';
import { ProductsPreview } from '@/components/ProductsPreview';
import { Services } from '@/components/Services';

// Materiais e cores entra na próxima parte, antes do mapa
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
