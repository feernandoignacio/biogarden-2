import Link from 'next/link';
import styles from './not-found.module.css';

// Página de endereço errado, com a cara da Biogarden
export default function NotFound() {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Essa página não brotou</h1>
      <p className={styles.text}>
        O endereço pode ter mudado ou o vaso não está mais no catálogo.
      </p>
      <div className={styles.actions}>
        <Link href="/vasos" className={styles.primary}>
          Ver os vasos
        </Link>
        <Link href="/" className={styles.secondary}>
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
