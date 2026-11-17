'use client';

import { useEffect, useState } from 'react';
import styles from './TypingWord.module.css';

// As mesmas palavras do site original
const WORDS = ['momento', 'ambiente', 'espaço', 'projeto', 'lar'];

// Escreve e apaga cada palavra, como alguém digitando
export function TypingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(WORDS[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Quem prefere menos movimento vê só a primeira palavra, parada
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const word = WORDS[wordIndex];
    let delay = isDeleting ? 60 : 110;
    if (!isDeleting && length === word.length) delay = 1800;

    const timer = window.setTimeout(() => {
      if (!isDeleting && length === word.length) {
        setIsDeleting(true);
      } else if (isDeleting && length === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % WORDS.length);
      } else {
        setLength(length + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [wordIndex, length, isDeleting]);

  return (
    <span className={styles.word}>
      {/* Leitores de tela leem só "momento", sem a animação */}
      <span className={styles.srOnly}>momento.</span>
      <span aria-hidden="true">{WORDS[wordIndex].slice(0, length)}</span>
      <span className={styles.cursor} aria-hidden="true" />
    </span>
  );
}
