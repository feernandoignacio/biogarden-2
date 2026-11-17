'use client';

import { useActionState } from 'react';
import { signIn, type LoginState } from '../actions';
import styles from './page.module.css';

const initialState: LoginState = { error: null, email: '' };

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form action={action} className={styles.form} noValidate>
      <label className={styles.field}>
        <span>E-mail</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={state.email}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Senha</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </label>

      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
