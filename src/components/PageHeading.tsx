import Link from 'next/link';
import styles from './PageHeading.module.css';

type PageHeadingProps = {
  title: string;
  text?: string;
  // Caminho de volta, ex: Início › Vasos
  trail: { href: string; label: string }[];
};

// Faixa verde no topo das páginas internas, com o caminho e o título
export function PageHeading({ title, text, trail }: PageHeadingProps) {
  return (
    <div className={styles.heading}>
      <div className={styles.inner}>
        <nav aria-label="Você está em">
          <ol className={styles.trail}>
            {trail.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <h1 className={styles.title}>{title}</h1>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>
  );
}
