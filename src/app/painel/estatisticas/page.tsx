import { Suspense } from 'react';
import { PanelLoader } from '../_components/PanelLoader';
import { PanelShell } from '../_components/PanelShell';
import { getPanelContext } from '../_lib';
import styles from './page.module.css';

const DAYS = 30;

export default function StatsPage() {
  return (
    <Suspense fallback={<PanelLoader label="Carregando estatísticas" />}>
      <Stats />
    </Suspense>
  );
}

// Data no horário de Brasília, no formato do banco (2026-11-18)
function spDate(date: Date) {
  return date.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
}

async function Stats() {
  const { supabase, email, categories } = await getPanelContext();

  const now = new Date();
  const days = Array.from({ length: DAYS }, (_, index) =>
    spDate(new Date(now.getTime() - (DAYS - 1 - index) * 86_400_000)),
  );
  const [{ data: rows }, { data: products }] = await Promise.all([
    supabase
      .from('page_views')
      .select('day, path, kind, count')
      .gte('day', days[0]),
    supabase.from('products').select('slug, name'),
  ]);

  const names = new Map((products ?? []).map((item) => [item.slug, item.name]));
  const views = new Map<string, number>();
  const clicks = new Map<string, number>();
  const pageViews = new Map<string, number>();
  const pageClicks = new Map<string, number>();

  for (const row of rows ?? []) {
    if (row.kind === 'view') {
      views.set(row.day, (views.get(row.day) ?? 0) + row.count);
      pageViews.set(row.path, (pageViews.get(row.path) ?? 0) + row.count);
    } else {
      clicks.set(row.day, (clicks.get(row.day) ?? 0) + row.count);
      pageClicks.set(row.path, (pageClicks.get(row.path) ?? 0) + row.count);
    }
  }

  const sum = (map: Map<string, number>, list: string[]) =>
    list.reduce((total, day) => total + (map.get(day) ?? 0), 0);
  const last7 = days.slice(-7);
  const today = days[DAYS - 1];
  const series = days.map((day) => ({ day, value: views.get(day) ?? 0 }));
  const max = Math.max(1, ...series.map((point) => point.value));

  // "/vasos/toscano" vira "Toscano"; "/" vira "Página inicial"
  function label(path: string) {
    if (path === '/') return 'Página inicial';
    if (path === '/vasos') return 'Catálogo de vasos';
    const slug = path.match(/^\/vasos\/([a-z0-9-]+)$/)?.[1];
    if (slug) return names.get(slug) ?? slug;
    return path;
  }
  const top = (map: Map<string, number>, limit: number) =>
    [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([path, count]) => ({ path, name: label(path), count }));

  const topPages = top(pageViews, 10);
  const topClicks = top(pageClicks, 5);
  const hasData = (rows ?? []).length > 0;

  return (
    <PanelShell email={email} categories={categories} active="estatisticas">
      <div className={styles.heading}>
        <h1 className={styles.title}>Estatísticas</h1>
        <p className={styles.summary}>
          Visitas no site nos últimos 30 dias. Só você vê estes números.
        </p>
      </div>

      <div className={styles.cards}>
        <Stat label="Visitas hoje" value={views.get(today) ?? 0} />
        <Stat label="Últimos 7 dias" value={sum(views, last7)} />
        <Stat label="Últimos 30 dias" value={sum(views, days)} />
        <Stat
          label="Cliques no WhatsApp (30 dias)"
          value={sum(clicks, days)}
          highlight
        />
      </div>

      {!hasData ? (
        <p className={styles.empty}>
          Ainda não há visitas registradas. Os números começam a aparecer
          conforme as pessoas visitam o site.
        </p>
      ) : (
        <>
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Visitas por dia</h2>
            <div className={styles.chart} role="list">
              {series.map((point, index) => (
                <div
                  key={point.day}
                  role="listitem"
                  className={styles.column}
                  title={`${formatDay(point.day)}: ${point.value} ${point.value === 1 ? 'visita' : 'visitas'}`}
                  aria-label={`${formatDay(point.day)}: ${point.value} ${point.value === 1 ? 'visita' : 'visitas'}`}
                >
                  <span
                    className={styles.bar}
                    style={{ height: `${(point.value / max) * 100}%` }}
                    data-today={index === DAYS - 1}
                  />
                </div>
              ))}
            </div>
            <div className={styles.axis} aria-hidden="true">
              <span>{formatDay(days[0])}</span>
              <span>{formatDay(days[14])}</span>
              <span>Hoje</span>
            </div>
          </section>

          <div className={styles.columns}>
            <Ranking
              title="Páginas mais vistas"
              items={topPages}
              unit={['visita', 'visitas']}
            />
            <Ranking
              title="Onde clicaram no WhatsApp"
              items={topClicks}
              unit={['clique', 'cliques']}
              empty="Nenhum clique no WhatsApp ainda."
            />
          </div>
        </>
      )}
    </PanelShell>
  );
}

function formatDay(day: string) {
  const [, month, date] = day.split('-');
  return `${date}/${month}`;
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className={styles.stat} data-highlight={highlight}>
      <span className={styles.statValue}>{value.toLocaleString('pt-BR')}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function Ranking({
  title,
  items,
  unit,
  empty,
}: {
  title: string;
  items: { path: string; name: string; count: number }[];
  unit: [string, string];
  empty?: string;
}) {
  const max = Math.max(1, ...items.map((item) => item.count));
  return (
    <section className={styles.panel}>
      <h2 className={styles.panelTitle}>{title}</h2>
      {items.length === 0 ? (
        <p className={styles.muted}>{empty}</p>
      ) : (
        <ol className={styles.ranking}>
          {items.map((item) => (
            <li key={item.path}>
              <span className={styles.rankName}>{item.name}</span>
              <span className={styles.rankCount}>
                {item.count.toLocaleString('pt-BR')}{' '}
                {item.count === 1 ? unit[0] : unit[1]}
              </span>
              <span
                className={styles.rankBar}
                style={{ width: `${(item.count / max) * 100}%` }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
