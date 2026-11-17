import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Location } from '@/components/Location';
import { ProductsPreview } from '@/components/ProductsPreview';
import { WhatsappFloat } from '@/components/WhatsappFloat';

// Materiais e serviços entram nas próximas partes, antes do mapa
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ProductsPreview />
        <Location />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
