'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Faz os blocos de cada seção aparecerem suavemente ao entrar na tela,
// tanto descendo quanto subindo a página. O efeito vai nos filhos de cada
// seção, e não na seção em si, para não mudar a posição dos links (#sobre).
const SELECTOR = 'main section:not(#inicio) > *, footer > *';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Quem pediu ao sistema menos animação vê tudo direto, sem efeito
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Entrou na tela: aparece. Saiu de vez: esconde de novo, para
          // repetir o efeito quando a pessoa voltar a ela
          entry.target.classList.toggle('reveal-in', entry.isIntersecting);
        }
      },
      // Só conta como "na tela" depois de passar um pouco da borda de baixo
      { rootMargin: '0px 0px -8% 0px' },
    );

    for (const element of elements) {
      element.classList.add('reveal');
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of elements) {
        element.classList.remove('reveal', 'reveal-in');
      }
    };
  }, [pathname]);

  return null;
}
