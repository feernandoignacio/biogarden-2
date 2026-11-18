'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useOptimistic, useState, useTransition } from 'react';
import { PRODUCT_TYPES, typeLabel, type ProductType } from '@/data/products';
import { setStock, setVisibility } from '../actions';
import styles from './ProductTable.module.css';

export type PanelProduct = {
  slug: string;
  name: string;
  type: ProductType;
  image: string | null;
  visible: boolean;
  stock: number;
  updated: string;
};

// Busca sem diferenciar acento e maiúscula ("sao" acha "São Marino")
function normalize(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function ProductTable({
  products,
  notice,
}: {
  products: PanelProduct[];
  notice: string | null;
}) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ProductType | 'todos'>('todos');
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // A chave muda na hora; se o banco recusar, volta ao que era
  const [items, setOptimistic] = useOptimistic(
    products,
    (current, change: Partial<PanelProduct> & { slug: string }) =>
      current.map((item) =>
        item.slug === change.slug ? { ...item, ...change } : item,
      ),
  );

  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    return (
      items
        .filter(
          (item) =>
            (type === 'todos' || item.type === type) &&
            normalize(item.name).includes(term),
        )
        // Os que não aparecem no site vão para o fim da lista, mantendo a
        // ordem do catálogo entre eles
        .sort((a, b) => Number(b.visible) - Number(a.visible))
    );
  }, [items, search, type]);

  const visibleCount = items.filter((item) => item.visible).length;
  const stockTotal = items.reduce((sum, item) => sum + item.stock, 0);
  const outOfStock = items.filter((item) => item.stock === 0).length;
  const noPhoto = items.filter((item) => !item.image).length;

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

  function changeStock(item: PanelProduct, stock: number) {
    if (!Number.isInteger(stock) || stock < 0 || stock === item.stock) return;
    setError(null);
    startTransition(async () => {
      setOptimistic({ slug: item.slug, stock });
      const result = await setStock(item.slug, stock);
      if (!result.ok) {
        setError(`Não foi possível salvar o estoque do ${item.name}.`);
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
          <p className={styles.summary}>
            {stockTotal} peças na loja
            {outOfStock > 0 && (
              <span className={styles.warn}>
                {' '}
                · {outOfStock} {outOfStock === 1 ? 'modelo' : 'modelos'} sem
                estoque
              </span>
            )}
            {noPhoto > 0 && (
              <span className={styles.warn}>
                {' '}
                · {noPhoto} {noPhoto === 1 ? 'provisório' : 'provisórios'} sem
                foto
              </span>
            )}
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
          Novo item
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

      {notice && !error && (
        <p className={styles.saved} role="status">
          {notice}
        </p>
      )}

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
              <th scope="col">Estoque</th>
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
                    <Thumb item={item} />
                    <span className={styles.name}>{item.name}</span>
                  </div>
                </td>
                <td className={styles.muted}>{typeLabel(item.type)}</td>
                <td>
                  <StockStepper
                    key={item.stock}
                    name={item.name}
                    value={item.stock}
                    onChange={(stock) => changeStock(item, stock)}
                  />
                </td>
                <td>
                  <SiteSwitch item={item} onToggle={() => toggle(item)} />
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

        {/* No celular a tabela vira uma lista de cards */}
        <ul className={styles.cards}>
          {filtered.map((item) => (
            <li
              key={item.slug}
              className={styles.card}
              data-hidden={!item.visible}
            >
              <div className={styles.cardTop}>
                <Thumb item={item} />
                <div className={styles.cardText}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.cardMeta}>
                    {typeLabel(item.type)} · {item.updated}
                  </span>
                </div>
                <Link
                  href={`/painel/vasos/${item.slug}`}
                  className={styles.editIcon}
                  aria-label={`Editar ${item.name}`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M4 20h4L19 9l-4-4L4 16z" />
                  </svg>
                </Link>
              </div>
              <div className={styles.cardBottom}>
                <StockStepper
                  key={item.stock}
                  name={item.name}
                  value={item.stock}
                  onChange={(stock) => changeStock(item, stock)}
                />
                <SiteSwitch item={item} onToggle={() => toggle(item)} />
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className={styles.empty}>
            Nenhum vaso encontrado com esse filtro.
          </p>
        )}
      </div>

      <Link
        href="/painel/vasos/novo"
        className={styles.fab}
        aria-label="Novo item"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Novo item
      </Link>

      <p className={styles.note}>
        Mostrando {filtered.length} de {items.length} vasos. Desligar
        &quot;Aparece no site&quot; esconde o vaso sem apagar. O estoque é só
        para a loja: não aparece no site.
      </p>
    </>
  );
}

// Botões de − e + com o número no meio, que também pode ser digitado
function StockStepper({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  function commit() {
    const next = Number(draft);
    if (draft.trim() === '' || !Number.isInteger(next) || next < 0) {
      setDraft(String(value));
      return;
    }
    onChange(next);
  }

  return (
    <div className={styles.stepper} data-empty={value === 0}>
      <button
        type="button"
        aria-label={`Tirar 1 do estoque de ${name}`}
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        aria-label={`Estoque de ${name}`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur();
        }}
      />
      <button
        type="button"
        aria-label={`Somar 1 ao estoque de ${name}`}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}

// Foto pequena com a bolinha de estoque no canto
function Thumb({ item }: { item: PanelProduct }) {
  return (
    <div className={styles.thumb}>
      {item.image ? (
        <Image src={item.image} alt="" fill sizes="60px" />
      ) : (
        <svg
          className={styles.noPhoto}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-label="Sem foto"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m3 17 5-5 4 4 3-3 6 6" />
        </svg>
      )}
      <span
        className={styles.badge}
        data-empty={item.stock === 0}
        title={`${item.stock} na loja`}
      >
        {item.stock}
      </span>
    </div>
  );
}

// Chave "Aparece no site" (travada nos itens provisórios, sem foto)
function SiteSwitch({
  item,
  onToggle,
}: {
  item: PanelProduct;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={item.visible}
      aria-label={`Mostrar ${item.name} no site`}
      className={styles.switch}
      disabled={!item.image}
      title={item.image ? undefined : 'Aguardando foto'}
      onClick={onToggle}
    >
      <span className={styles.track}>
        <span className={styles.knob} />
      </span>
      <span>
        {!item.image
          ? 'Provisório, sem foto'
          : item.visible
            ? 'No site'
            : 'Oculto'}
      </span>
    </button>
  );
}
