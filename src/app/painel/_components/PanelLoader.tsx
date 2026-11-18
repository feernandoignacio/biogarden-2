import Image from 'next/image';
import styles from './PanelLoader.module.css';

// Tela de carregamento do painel: logo pulsando dentro de um anel que gira
export function PanelLoader({ label = 'Carregando' }: { label?: string }) {
  return (
    <div className={styles.screen} role="status" aria-live="polite">
      <div className={styles.mark}>
        <span className={styles.ring} aria-hidden="true" />
        <span className={styles.badge}>
          <Image
            src="/images/logo.png"
            alt=""
            width={46}
            height={46}
            priority
          />
        </span>
      </div>
      <p className={styles.name}>Biogarden</p>
      <p className={styles.label}>
        {label}
        <span className={styles.dots} aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
}
