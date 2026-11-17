import styles from './template.module.css';

// O template é recriado a cada troca de página, então o efeito de entrada
// roda sempre que o visitante muda de página
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
