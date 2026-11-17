'use client';

import { usePathname } from 'next/navigation';

// Esconde partes do site (cabeçalho, rodapé, botão do WhatsApp) no painel
export function SiteOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/painel')) return null;
  return children;
}
