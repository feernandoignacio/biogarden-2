import { signOut } from '../actions';
import { PanelNav } from './PanelNav';
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
        <PanelNav total={total} />

        <div className={styles.footer}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className={styles.siteLink}
          >
            <span className={styles.longLabel}>Ver o site no ar</span>
            <span className={styles.shortLabel}>Ver site</span>
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
