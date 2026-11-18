import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from './LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <aside className={styles.brand}>
        <Image src="/images/logo.png" alt="" width={64} height={64} />
        <p className={styles.name}>Biogarden</p>
        <p className={styles.tagline}>
          Cadastre vasos, troque fotos e atualize o site sem precisar chamar
          ninguém.
        </p>
      </aside>

      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Entrar no painel</h1>
            <p className={styles.text}>Acesso só para a equipe da Biogarden.</p>
          </div>
          <LoginForm />
          <Link href="/" className={styles.back}>
            Voltar para o site
          </Link>
        </div>
      </main>
    </div>
  );
}
