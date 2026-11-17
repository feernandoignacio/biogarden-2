import Image from 'next/image';
import { whatsappLink } from '@/data/site';
import { TypingWord } from './TypingWord';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.background}
      />

      <div className={styles.content}>
        <p className={styles.kicker}>Ceasa Campinas · Mercado de Flores</p>
        <h1 className={styles.title}>
          Biogarden
          <span>Paisagismo</span>
        </h1>
        <p className={styles.slogan}>
          Transforme seu espaço com elegância botânica.
          <br />
          Inspiração verde em cada vaso, arte em cada <TypingWord />
        </p>

        <div className={styles.actions}>
          <a href="#produtos" className={styles.primary}>
            Ver os vasos
          </a>
          <a
            href={whatsappLink(
              'Olá! Vim pelo site e quero pedir um orçamento.',
            )}
            target="_blank"
            rel="noreferrer"
            className={styles.secondary}
          >
            Pedir orçamento
          </a>
        </div>
      </div>
    </section>
  );
}
