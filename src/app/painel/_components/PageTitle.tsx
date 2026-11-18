import Link from 'next/link';
import styles from './PageTitle.module.css';

// Caminho ("Vasos › Toscano") e título das telas internas do painel
export function PageTitle({
  title,
  crumb,
  parent,
}: {
  title: string;
  crumb: string;
  parent: { href: string; label: string };
}) {
  return (
    <div className={styles.heading}>
      <nav aria-label="Você está em" className={styles.trail}>
        <Link href={parent.href}>{parent.label}</Link>{' '}
        <span aria-hidden="true">›</span>{' '}
        <span aria-current="page">{crumb}</span>
      </nav>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
