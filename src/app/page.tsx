import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Location } from '@/components/Location';
import { WhatsappFloat } from '@/components/WhatsappFloat';

// Produtos, materiais e serviços entram nas próximas partes, entre o Sobre e o mapa
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Location />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
