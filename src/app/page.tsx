import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhatsappFloat } from '@/components/WhatsappFloat';

// As outras seções (sobre, produtos, materiais e serviços) entram nas próximas partes
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
