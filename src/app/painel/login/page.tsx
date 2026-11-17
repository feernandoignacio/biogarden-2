import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from './LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Image
          src="/images/logo.png"
          alt=""
          width={56}
          height={56}
          className={styles.logo}
        />
        <h1 className={styles.title}>Painel Biogarden</h1>
        <p className={styles.text}>Entre para cuidar dos vasos do site.</p>
        <LoginForm />
      </div>
      <Link href="/" className={styles.back}>
        Voltar para o site
      </Link>
    </main>
  );
}
