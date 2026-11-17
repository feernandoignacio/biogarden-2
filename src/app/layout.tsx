import type { Metadata } from 'next';
import localFont from 'next/font/local';
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
  title: 'Biogarden Paisagismo | Vasos e paisagismo em Campinas',
  description:
    'Vasos decorativos, montagem e paisagismo personalizado. Loja no Ceasa Campinas, Mercado de Flores.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      className={`${marcellus.variable} ${marcellusSc.variable} ${roboto.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
