'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { navLinks, whatsappLink } from '@/data/site';
import styles from './Header.module.css';

export function Header() {
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

  const headerClass = [
    styles.header,
    isScrolled || isMenuOpen ? styles.solid : '',
  ].join(' ');

  return (
    <header className={headerClass}>
      <div className={styles.inner}>
        <a href="#inicio" className={styles.brand} aria-label="Início">
          <Image src="/images/logo.png" alt="" width={38} height={38} />
          <span>Biogarden</span>
        </a>

        <nav
          id="menu"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Menu principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
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
