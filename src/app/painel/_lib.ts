import { connection } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

// Dados que toda tela do painel usa: o cliente do banco com a sessão do
// dono, o e-mail dele e quantos itens existem (para o menu)
export async function getPanelContext() {
  // Sempre na hora: depende de quem está logado
  await connection();
  const supabase = await createSupabaseServer();
  const [{ data: auth }, { count }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('products').select('*', { count: 'exact', head: true }),
  ]);
  return { supabase, email: auth.user?.email ?? '', total: count ?? 0 };
}
