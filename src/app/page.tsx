import { About } from '@/components/About';
import { Hero } from '@/components/Hero';
import { Location } from '@/components/Location';
import { ProductsPreview } from '@/components/ProductsPreview';

// Materiais e serviços entram nas próximas partes, antes do mapa
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ProductsPreview />
      <Location />
    </main>
  );
}
