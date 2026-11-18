'use client';

import { useState, useTransition } from 'react';
import { deleteDraft } from '../actions';
import styles from './ProductForm.module.css';

// Botão de apagar com confirmação em dois passos, só para itens provisórios
export function DeleteDraft({ slug, name }: { slug: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        type="button"
        className={styles.danger}
        onClick={() => setConfirming(true)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 7h16" />
          <path d="M9 7V4h6v3" />
          <path d="M6 7l1 13h10l1-13" />
          <path d="M10 11v6M14 11v6" />
        </svg>
        Apagar item provisório
      </button>
    );
  }

  return (
    <div className={styles.confirm} role="alertdialog" aria-live="polite">
      <p>
        Apagar <strong>{name}</strong>? Isso não pode ser desfeito.
      </p>
      {error && <p className={styles.confirmError}>{error}</p>}
      <div className={styles.confirmActions}>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => setConfirming(false)}
          disabled={pending}
        >
          Não, manter
        </button>
        <button
          type="button"
          className={styles.dangerSolid}
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const result = await deleteDraft(slug);
              if (result?.error) setError(result.error);
            })
          }
        >
          {pending ? 'Apagando...' : 'Sim, apagar'}
        </button>
      </div>
    </div>
  );
}
