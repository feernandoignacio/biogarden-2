'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Faz os blocos de cada seção aparecerem suavemente ao entrar na tela,
// tanto descendo quanto subindo a página. O efeito vai nos filhos de cada
// seção, e não na seção em si, para não mudar a posição dos links (#sobre).
// Itens de listas (cards dos vasos, cores, serviços) aparecem um a um.
const SELECTOR = [
  'main section:not(#inicio) > *',
  'main section:not(#inicio) ul > li',
  'footer > *',
].join(', ');

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Quem pediu ao sistema menos animação vê tudo direto, sem efeito
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

    function watchNew() {
      const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
      for (const element of elements) {
        if (element.classList.contains('reveal')) continue;
        // Cards lado a lado entram com um pequeno atraso entre eles
        if (element.tagName === 'LI') {
          const index = Array.from(element.parentElement!.children).indexOf(
            element,
          );
          element.style.transitionDelay = `${(index % 4) * 80}ms`;
        }
        element.classList.add('reveal');
        observer.observe(element);
      }
    }

    watchNew();

    // Filtros e abas trocam os cards na tela: os novos também ganham o efeito
    const mutations = new MutationObserver(watchNew);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      for (const element of document.querySelectorAll<HTMLElement>('.reveal')) {
        element.classList.remove('reveal', 'reveal-in');
        element.style.transitionDelay = '';
      }
    };
  }, [pathname]);

  return null;
}
