'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { changePassword, type PasswordState } from '../actions';
import styles from '../_components/ProductForm.module.css';
import own from './page.module.css';

export function PasswordForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState<PasswordState, FormData>(
    changePassword,
    { error: null },
  );

  return (
    <form action={action} className={`${styles.card} ${own.card}`}>
      <p className={own.intro}>
        Conta: <strong>{email}</strong>
      </p>

      {/* Ajuda o gerenciador de senhas do navegador a salvar a nova */}
      <input
        type="email"
        name="username"
        value={email}
        autoComplete="username"
        readOnly
        hidden
      />

      <label className={styles.field}>
        Senha atual
        <input
          type="password"
          name="current"
          autoComplete="current-password"
          required
        />
      </label>

      <label className={styles.field}>
        Senha nova
        <input
          type="password"
          name="next"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <span className={styles.hint}>
          Pelo menos 8 caracteres. Misture letras e números.
        </span>
      </label>

      <label className={styles.field}>
        Confirmar senha nova
        <input
          type="password"
          name="confirm"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </label>

      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <div className={styles.actions}>
        <Link href="/painel" className={styles.secondary}>
          Cancelar
        </Link>
        <button type="submit" className={styles.primary} disabled={pending}>
          {pending ? 'Salvando...' : 'Trocar senha'}
        </button>
      </div>
    </form>
  );
}
