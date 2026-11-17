'use client';

import Image from 'next/image';
import { useState } from 'react';
import { glazes, materials, type Finish } from '@/data/finishes';
import { whatsappLink } from '@/data/site';
import { WhatsappIcon } from './Icons';
import styles from './Finishes.module.css';

const TABS = [
  { id: 'esmaltes', label: 'Esmaltes', items: glazes },
  { id: 'materiais', label: 'Materiais', items: materials },
] as const;

type TabId = (typeof TABS)[number]['id'];

// Esmaltes e materiais em abas, para não mostrar 31 quadros de uma vez
export function Finishes() {
  const [tab, setTab] = useState<TabId>('esmaltes');
  const current = TABS.find((item) => item.id === tab) ?? TABS[0];

  return (
    <section id="materiais" className={styles.finishes}>
      <div className={styles.top}>
        <div>
          <p className={styles.kicker}>Materiais e cores</p>
          <h2 className={styles.title}>O acabamento muda o ambiente</h2>
          <p className={styles.intro}>
            Um acabamento rústico deixa o espaço acolhedor; um esmalte brilhante
            traz um ar moderno. Escolha a cor ou o material e montamos o vaso do
            jeito que você imaginou.
          </p>
        </div>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Tipo de acabamento"
        >
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`aba-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls="painel-acabamentos"
              className={styles.tab}
              onClick={() => setTab(item.id)}
            >
              {item.label} <span>{item.items.length}</span>
            </button>
          ))}
        </div>
      </div>

      <ul
        id="painel-acabamentos"
        role="tabpanel"
        aria-labelledby={`aba-${tab}`}
        className={styles.grid}
      >
        {current.items.map((finish: Finish) => (
          <li key={finish.slug} className={styles.item}>
            <div className={styles.swatch}>
              <Image
                src={`/images/${tab}/${finish.slug}.webp`}
                alt={`Acabamento ${finish.name}`}
                fill
                sizes="(max-width: 640px) 33vw, 160px"
              />
            </div>
            <p>{finish.name}</p>
          </li>
        ))}
      </ul>

      <div className={styles.note}>
        <p>
          As cores podem variar um pouco de peça para peça, porque cada esmalte
          é feito à mão.
        </p>
        <a
          href={whatsappLink(
            'Olá! Vim pelo site e quero saber quais vasos têm a cor que eu gostei.',
          )}
          target="_blank"
          rel="noreferrer"
          className={styles.noteLink}
        >
          <WhatsappIcon size={18} />
          Perguntar sobre uma cor
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
