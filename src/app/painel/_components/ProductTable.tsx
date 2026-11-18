'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useOptimistic, useState, useTransition } from 'react';
import { PRODUCT_TYPES, typeLabel, type ProductType } from '@/data/products';
import { setVisibility } from '../actions';
import styles from './ProductTable.module.css';

export type PanelProduct = {
  slug: string;
  name: string;
  type: ProductType;
  image: string;
  visible: boolean;
  updated: string;
};

// Busca sem diferenciar acento e maiúscula ("sao" acha "São Marino")
function normalize(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function ProductTable({ products }: { products: PanelProduct[] }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ProductType | 'todos'>('todos');
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // A chave muda na hora; se o banco recusar, volta ao que era
  const [items, setOptimistic] = useOptimistic(
    products,
    (current, change: { slug: string; visible: boolean }) =>
      current.map((item) =>
        item.slug === change.slug ? { ...item, visible: change.visible } : item,
      ),
  );

  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    return items.filter(
      (item) =>
        (type === 'todos' || item.type === type) &&
        normalize(item.name).includes(term),
    );
  }, [items, search, type]);

  const visibleCount = items.filter((item) => item.visible).length;

  function toggle(item: PanelProduct) {
    setError(null);
    startTransition(async () => {
      setOptimistic({ slug: item.slug, visible: !item.visible });
      const result = await setVisibility(item.slug, !item.visible);
      if (!result.ok) {
        setError(`Não foi possível mudar o ${item.name}. Tente de novo.`);
      }
    });
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Vasos</h1>
          <p className={styles.summary}>
            {items.length} modelos no catálogo · {visibleCount} aparecendo no
            site
          </p>
        </div>
        <Link href="/painel/vasos/novo" className={styles.primary}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Novo vaso
        </Link>
      </div>

      <div className={styles.tools}>
        <label className={styles.search}>
          <span className={styles.srOnly}>Buscar vaso</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Buscar pelo nome"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <div
          className={styles.chips}
          role="group"
          aria-label="Filtrar por tipo"
        >
          {[{ value: 'todos' as const, label: 'Todos' }, ...PRODUCT_TYPES].map(
            (option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={type === option.value}
                className={styles.chip}
                onClick={() => setType(option.value)}
              >
                {option.label}
              </button>
            ),
          )}
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Vaso</th>
              <th scope="col">Tipo</th>
              <th scope="col">Aparece no site</th>
              <th scope="col">Última mudança</th>
              <th scope="col" className={styles.right}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.slug} data-hidden={!item.visible}>
                <td>
                  <div className={styles.product}>
                    <div className={styles.thumb}>
                      <Image src={item.image} alt="" fill sizes="56px" />
                    </div>
                    <span className={styles.name}>{item.name}</span>
                  </div>
                </td>
                <td className={styles.muted}>{typeLabel(item.type)}</td>
                <td>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={item.visible}
                    aria-label={`Mostrar ${item.name} no site`}
                    className={styles.switch}
                    onClick={() => toggle(item)}
                  >
                    <span className={styles.track}>
                      <span className={styles.knob} />
                    </span>
                    <span>{item.visible ? 'Sim' : 'Oculto'}</span>
                  </button>
                </td>
                <td className={styles.muted}>{item.updated}</td>
                <td className={styles.right}>
                  <Link
                    href={`/painel/vasos/${item.slug}`}
                    className={styles.secondary}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className={styles.empty}>
            Nenhum vaso encontrado com esse filtro.
          </p>
        )}
      </div>

      <p className={styles.note}>
        Mostrando {filtered.length} de {items.length} vasos. Desligar
        &quot;Aparece no site&quot; esconde o vaso sem apagar.
      </p>
    </>
  );
}
