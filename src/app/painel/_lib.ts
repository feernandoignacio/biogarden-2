import { connection } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';
import type { PanelCategory } from './_categories';

// Dados que toda tela do painel usa: o cliente do banco com a sessão do
// dono, o e-mail dele e as categorias com quantos itens cada uma tem
export async function getPanelContext() {
  // Sempre na hora: depende de quem está logado
  await connection();
  const supabase = await createSupabaseServer();
  const [{ data: auth }, { data: categoryRows }, { data: itemRows }] =
    await Promise.all([
      supabase.auth.getUser(),
      supabase.from('categories').select('slug, name').order('position'),
      supabase.from('products').select('category'),
    ]);

  const counts = new Map<string, number>();
  for (const row of itemRows ?? []) {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1);
  }
  const categories: PanelCategory[] = (categoryRows ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    count: counts.get(row.slug) ?? 0,
  }));

  return { supabase, email: auth.user?.email ?? '', categories };
}
