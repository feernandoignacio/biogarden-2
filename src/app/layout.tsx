import { Suspense } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PageFade } from '@/components/PageFade';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SiteOnly } from '@/components/SiteOnly';
import { VisitTracker } from '@/components/VisitTracker';
import { WhatsappFloat } from '@/components/WhatsappFloat';
import { SITE_URL } from '@/data/site';
import './globals.css';

// Fontes do site original, guardadas no projeto (não dependem do Google)
const marcellus = localFont({
  variable: '--font-title',
  src: '../fonts/marcellus-latin-400-normal.woff2',
  weight: '400',
});

const marcellusSc = localFont({
  variable: '--font-brand',
  src: '../fonts/marcellus-sc-latin-400-normal.woff2',
  weight: '400',
});

const roboto = localFont({
  variable: '--font-body',
  src: [
    { path: '../fonts/roboto-latin-400-normal.woff2', weight: '400' },
    { path: '../fonts/roboto-latin-500-normal.woff2', weight: '500' },
  ],
});

export const metadata: Metadata = {
  // Base para os links completos das prévias (WhatsApp, Instagram, Google)
  metadataBase: new URL(SITE_URL),
  title: 'Biogarden Paisagismo | Vasos e paisagismo em Campinas',
  description:
    'Vasos decorativos, montagem e paisagismo personalizado. Loja no Ceasa Campinas, Mercado de Flores.',
  openGraph: {
    siteName: 'Biogarden Paisagismo',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      // Troca de página vai direto ao topo; links de seção na mesma página rolam suave
      data-scroll-behavior="smooth"
      className={`${marcellus.variable} ${marcellusSc.variable} ${roboto.variable}`}
    >
      <body>
        {/* Cabeçalho, rodapé e botão do WhatsApp ficam aqui, iguais em todas as páginas do site (no painel não aparecem) */}
        {/* Suspense: em páginas do painel com endereço variável, o caminho
            só é conhecido na hora do acesso */}
        <Suspense>
          <SiteOnly>
            <Header />
          </SiteOnly>
          <PageFade>{children}</PageFade>
          <SiteOnly>
            <Footer />
            <WhatsappFloat />
            <ScrollReveal />
            <VisitTracker />
          </SiteOnly>
        </Suspense>
      </body>
    </html>
  );
}
