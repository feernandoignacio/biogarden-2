'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { PRODUCTS_TAG } from '@/data/catalog';
import { createSupabaseServer } from '@/lib/supabase/server';

export type LoginState = { error: string | null; email: string };

export async function signIn(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'Preencha o e-mail e a senha.', email };
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const message =
      error.code === 'invalid_credentials'
        ? 'E-mail ou senha incorretos.'
        : error.status === 429
          ? 'Muitas tentativas. Espere alguns minutos e tente de novo.'
          : 'Não foi possível entrar agora. Tente de novo em instantes.';
    return { error: message, email };
  }

  redirect('/painel');
}

export async function signOut() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect('/painel/login');
}

// Liga ou desliga um vaso no site, sem apagar
export async function setVisibility(slug: string, visible: boolean) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('products')
    .update({ visible })
    .eq('slug', slug);

  if (error) return { ok: false };

  // O site descarta a lista guardada e busca de novo no banco
  updateTag(PRODUCTS_TAG);
  return { ok: true };
}
