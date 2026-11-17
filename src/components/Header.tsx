'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type MouseEvent } from 'react';
import { navLinks, whatsappLink } from '@/data/site';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  // Só a página inicial tem o banner; nas outras o cabeçalho já começa verde
  const alwaysSolid = pathname !== '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fica transparente sobre o banner e verde depois de rolar
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu do celular com a tecla Esc
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMenuOpen]);

  // Link para a página em que o visitante já está (ex: "Materiais e cores"
  // estando em /vasos, ou o logo estando no início): em vez de deixar o
  // Next.js pular direto, a tela desliza até a seção ou até o topo
  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setIsMenuOpen(false);
    const [path, id] = href.split('#');
    if (path !== pathname) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const behavior = reduceMotion ? 'auto' : 'smooth';
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView({ behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
    // Atualiza o endereço sem recarregar, para o voltar do navegador funcionar
    window.history.pushState(null, '', href);
  }

  const headerClass = [
    styles.header,
    alwaysSolid || isScrolled || isMenuOpen ? styles.solid : '',
  ].join(' ');

  return (
    <header className={headerClass}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Início"
          onClick={(event) => handleLinkClick(event, '/')}
        >
          <Image src="/images/logo.png" alt="" width={38} height={38} />
          <span>Biogarden</span>
        </Link>

        <nav
          id="menu"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Menu principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
              onClick={(event) => handleLinkClick(event, link.href)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink(
              'Olá! Vim pelo site e quero conhecer os produtos.',
            )}
            target="_blank"
            rel="noreferrer"
            className={styles.contact}
          >
            Fale conosco
          </a>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
