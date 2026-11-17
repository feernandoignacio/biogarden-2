'use client';

import { useMemo, useState } from 'react';
import { PRODUCT_TYPES, products, type ProductType } from '@/data/products';
import { ProductCard } from './ProductCard';
import styles from './Catalog.module.css';

// Ignora acentos e maiúsculas na busca: "italia" acha "Itália"
function normalize(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function Catalog() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ProductType | 'todos'>('todos');

  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    return products.filter(
      (product) =>
        (type === 'todos' || product.type === type) &&
        normalize(product.name).includes(term),
    );
  }, [search, type]);

  // Quantos modelos tem em cada tipo, para mostrar no filtro
  function countOf(value: ProductType) {
    return products.filter((product) => product.type === value).length;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.toolbar}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filtrar por tipo"
        >
          <button
            type="button"
            className={styles.chip}
            aria-pressed={type === 'todos'}
            onClick={() => setType('todos')}
          >
            Todos <span>{products.length}</span>
          </button>
          {PRODUCT_TYPES.map((item) => (
            <button
              key={item.value}
              type="button"
              className={styles.chip}
              aria-pressed={type === item.value}
              onClick={() => setType(item.value)}
            >
              {item.label} <span>{countOf(item.value)}</span>
            </button>
          ))}
        </div>

        <label className={styles.search}>
          <span className={styles.srOnly}>Buscar vaso pelo nome</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar pelo nome"
          />
        </label>
      </div>

      <p className={styles.count} aria-live="polite">
        {filtered.length === 1 ? '1 modelo' : `${filtered.length} modelos`}
      </p>

      {filtered.length > 0 ? (
        <ul className={styles.grid}>
          {filtered.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p>Nenhum vaso encontrado com esse nome.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setType('todos');
            }}
          >
            Ver todos os vasos
          </button>
        </div>
      )}
    </div>
  );
}
