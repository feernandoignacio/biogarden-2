'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './PanelShell.module.css';

// Categorias do menu. Quando entrarem novas (adubo, terra, jardim...),
// é só acrescentar aqui que elas aparecem na lista.
const SECTIONS = [{ href: '/painel', label: 'Vasos', icon: 'vaso' as const }];

// Logo + menu de categorias. No computador o menu fica sempre aberto na
// barra lateral; no celular ele desce ao tocar na logo.
export function PanelNav({ total }: { total: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Fecha ao trocar de tela
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Fecha com Esc ou tocando fora do menu
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    function onPointer(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const brand = (
    <>
      <Image src="/images/logo.png" alt="" width={34} height={34} />
      <span className={styles.brandText}>
        <span className={styles.brandName}>Biogarden</span>
        <span className={styles.brandSub}>Painel do site</span>
      </span>
    </>
  );

  return (
    <div className={styles.navWrap} ref={wrapRef}>
      {/* Computador: a logo leva ao início do painel */}
      <Link href="/painel" className={`${styles.brand} ${styles.brandLink}`}>
        {brand}
      </Link>

      {/* Celular: a logo abre e fecha o menu */}
      <button
        type="button"
        className={`${styles.brand} ${styles.brandToggle}`}
        aria-expanded={open}
        aria-controls="menu-painel"
        aria-label="Abrir menu do painel"
        onClick={() => setOpen((value) => !value)}
      >
        {brand}
        <svg
          className={styles.chevron}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <nav
        id="menu-painel"
        aria-label="Menu do painel"
        className={styles.nav}
        data-open={open}
      >
        {SECTIONS.map((section) => {
          const current =
            pathname === section.href ||
            (section.href === '/painel' &&
              pathname.startsWith('/painel/vasos'));
          return (
            <Link
              key={section.href}
              href={section.href}
              aria-current={current ? 'page' : undefined}
              className={styles.navLink}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M6 8h12l-1.5 12h-9z" />
                <path d="M5 8h14" />
                <path d="M12 8c0-3 1-5 4-5" />
              </svg>
              {section.label}
              <span className={styles.count}>{total}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
