'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { SUPABASE_KEY, SUPABASE_URL } from '@/lib/supabase/config';

// Conta visitas e cliques no WhatsApp para as estatísticas do painel.
// Não usa cookies nem guarda nada sobre a pessoa: só soma 1 na página.
function track(path: string, kind: 'view' | 'whatsapp') {
  // Robôs e testes automáticos não contam
  if (navigator.webdriver) return;
  fetch(`${SUPABASE_URL}/rest/v1/rpc/track_visit`, {
    method: 'POST',
    keepalive: true,
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_path: path, p_kind: kind }),
  }).catch(() => {
    // Se falhar, a visita só não é contada
  });
}

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    track(pathname, 'view');
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement).closest('a');
      if (link?.href.includes('wa.me')) track(location.pathname, 'whatsapp');
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
