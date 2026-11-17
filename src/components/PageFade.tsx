'use client';

import { usePathname } from 'next/navigation';
import styles from './PageFade.module.css';

// Esmaece a página a cada troca de endereço, inclusive entre páginas de
// vasos (/vasos -> /vasos/toscano). Usar o endereço como "key" faz o React
// recriar o bloco, o que reinicia a animação. Mudar só a seção (#sobre)
// não troca o endereço, então não esmaece.
export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className={styles.page}>
      {children}
    </div>
  );
}
