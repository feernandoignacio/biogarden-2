import Image from 'next/image';
import Link from 'next/link';
import { signOut } from '../actions';
import styles from './PanelShell.module.css';

type Props = {
  email: string;
  total: number;
  children: React.ReactNode;
};

// Moldura das telas do painel: menu verde à esquerda e conteúdo à direita
export function PanelShell({ email, total, children }: Props) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/painel" className={styles.brand}>
          <Image src="/images/logo.png" alt="" width={34} height={34} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>Biogarden</span>
            <span className={styles.brandSub}>Painel do site</span>
          </span>
        </Link>

        <nav aria-label="Menu do painel" className={styles.nav}>
          <Link href="/painel" aria-current="page" className={styles.navLink}>
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
            Vasos
            <span className={styles.count}>{total}</span>
          </Link>
        </nav>

        <div className={styles.footer}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className={styles.siteLink}
          >
            Ver o site no ar
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M14 4h6v6" />
              <path d="M20 4 10 14" />
              <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
          <span className={styles.user}>Conectado como {email}</span>
          <form action={signOut}>
            <button type="submit" className={styles.logout}>
              Sair
            </button>
          </form>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
