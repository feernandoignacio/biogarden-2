'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { PRODUCT_TYPES, typeLabel, type ProductType } from '@/data/products';
import { saveProduct, type ProductFormState } from '../actions';
import { DeleteDraft } from './DeleteDraft';
import styles from './ProductForm.module.css';

export type EditableProduct = {
  slug: string;
  name: string;
  type: ProductType;
  description: string;
  stock: number;
  visible: boolean;
  image: string | null;
};

const EMPTY: EditableProduct = {
  slug: '',
  name: '',
  type: 'vasos',
  description: '',
  stock: 0,
  visible: false,
  image: null,
};

// Formulário de editar e de cadastrar. A foto não é trocada aqui: quem
// coloca é o desenvolvedor, para manter o padrão do catálogo.
export function ProductForm({ product }: { product?: EditableProduct }) {
  const isNew = !product;
  const initial = product ?? EMPTY;
  const [state, action, pending] = useActionState<ProductFormState, FormData>(
    saveProduct.bind(null, product?.slug ?? null),
    { error: null },
  );
  const [name, setName] = useState(initial.name);
  const [type, setType] = useState<ProductType>(initial.type);
  const values = state.fields;

  return (
    <div className={styles.layout}>
      <form action={action} className={styles.card}>
        <div className={styles.photoBlock}>
          <span className={styles.label}>Foto</span>
          <div className={styles.photoRow}>
            <div className={styles.photo}>
              {initial.image ? (
                <Image
                  src={initial.image}
                  alt={`Foto atual de ${initial.name}`}
                  fill
                  sizes="150px"
                />
              ) : (
                <NoPhotoIcon />
              )}
            </div>
            <p className={styles.photoNote}>
              {initial.image
                ? 'Para trocar a foto, envie a nova para o desenvolvedor do site. Ele deixa no mesmo padrão das outras peças do catálogo.'
                : 'Este item ainda não tem foto, por isso não aparece no site. Envie a foto para o desenvolvedor do site: ele coloca no padrão do catálogo e libera o item.'}
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.field}>
            Nome
            <input
              name="name"
              required
              maxLength={80}
              defaultValue={values?.name ?? initial.name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Vaso Toscano, Terra adubada 5 kg"
            />
          </label>
          <label className={styles.field}>
            Tipo
            <select
              name="type"
              defaultValue={values?.type ?? initial.type}
              onChange={(event) => setType(event.target.value as ProductType)}
            >
              {PRODUCT_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className={styles.field}>
          Descrição
          <textarea
            name="description"
            rows={3}
            maxLength={600}
            defaultValue={values?.description ?? initial.description}
            placeholder="Aparece na página do item no site"
          />
        </label>

        <div className={styles.row}>
          <label className={styles.field}>
            Estoque na loja
            <input
              name="stock"
              type="number"
              inputMode="numeric"
              min={0}
              max={99999}
              defaultValue={values?.stock ?? initial.stock}
            />
            <span className={styles.hint}>Não aparece no site.</span>
          </label>

          {!isNew && (
            <label
              className={styles.check}
              data-disabled={!initial.image}
              title={
                initial.image
                  ? undefined
                  : 'Precisa de foto para aparecer no site'
              }
            >
              <input
                type="checkbox"
                name="visible"
                disabled={!initial.image}
                defaultChecked={
                  values ? values.visible === 'on' : initial.visible
                }
              />
              <span>
                <span className={styles.checkTitle}>Aparece no site</span>
                <span className={styles.hint}>
                  {initial.image
                    ? 'Desmarque para esconder sem apagar'
                    : 'Liberado depois que a foto for colocada'}
                </span>
              </span>
            </label>
          )}
        </div>

        {state.error && (
          <p className={styles.error} role="alert">
            {state.error}
          </p>
        )}

        <div className={styles.actions}>
          {!isNew && !initial.image && (
            <DeleteDraft slug={initial.slug} name={initial.name} />
          )}
          <Link href="/painel" className={styles.secondary}>
            Cancelar
          </Link>
          <button type="submit" className={styles.primary} disabled={pending}>
            {pending
              ? 'Salvando...'
              : isNew
                ? 'Cadastrar item'
                : 'Salvar alterações'}
          </button>
        </div>
      </form>

      <aside className={styles.preview}>
        <h2 className={styles.previewTitle}>Como fica no site</h2>
        <div className={styles.previewCard}>
          <div className={styles.previewPhoto}>
            {initial.image ? (
              <Image src={initial.image} alt="" fill sizes="300px" />
            ) : (
              <NoPhotoIcon />
            )}
          </div>
          <span className={styles.previewType}>{typeLabel(type)}</span>
          <span className={styles.previewName}>{name || 'Nome do item'}</span>
        </div>
        {!initial.image && (
          <p className={styles.previewNote}>
            Sem foto, o item fica só no controle da loja.
          </p>
        )}
      </aside>
    </div>
  );
}

function NoPhotoIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="no-photo"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m3 17 5-5 4 4 3-3 6 6" />
    </svg>
  );
}
