import type { Metadata } from 'next';

// O painel não aparece no Google
export const metadata: Metadata = {
  title: 'Painel | Biogarden',
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: LayoutProps<'/painel'>) {
  return children;
}
