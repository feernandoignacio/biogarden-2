'use server';

import { refresh, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { PRODUCTS_TAG } from '@/data/catalog';
import { PRODUCT_TYPES, type ProductType } from '@/data/products';
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

// Quantidade na loja física. Não aparece no site, então não precisa
// atualizar o cache das páginas.
export async function setStock(slug: string, stock: number) {
  if (!Number.isInteger(stock) || stock < 0 || stock > 99_999) {
    return { ok: false };
  }
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('products')
    .update({ stock })
    .eq('slug', slug);

  if (error) return { ok: false };
  // Recarrega os dados do painel para o número novo ficar na tela
  refresh();
  return { ok: true };
}

export type ProductFormState = {
  error: string | null;
  fields?: Record<string, string>;
};

const TYPES = PRODUCT_TYPES.map((item) => item.value);

// Cria ou edita um item. Sem slug = item novo, que entra escondido do site
// até receber a foto (a foto é colocada pelo desenvolvedor, no padrão do
// catálogo).
export async function saveProduct(
  slug: string | null,
  _previous: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const fields = {
    name: String(formData.get('name') ?? '').trim(),
    type: String(formData.get('type') ?? ''),
    description: String(formData.get('description') ?? '').trim(),
    stock: String(formData.get('stock') ?? '0').trim(),
    visible: formData.get('visible') === 'on' ? 'on' : '',
  };
  const stock = Number(fields.stock);

  if (fields.name.length < 2 || fields.name.length > 80) {
    return { error: 'O nome precisa ter entre 2 e 80 letras.', fields };
  }
  if (!TYPES.includes(fields.type as ProductType)) {
    return { error: 'Escolha um tipo.', fields };
  }
  if (fields.description.length > 600) {
    return { error: 'A descrição pode ter até 600 letras.', fields };
  }
  if (!Number.isInteger(stock) || stock < 0 || stock > 99_999) {
    return {
      error: 'O estoque precisa ser um número inteiro, 0 ou mais.',
      fields,
    };
  }

  const supabase = await createSupabaseServer();
  const values = {
    name: fields.name,
    type: fields.type,
    description: fields.description,
    stock,
  };

  if (slug) {
    const { data: current } = await supabase
      .from('products')
      .select('image_url')
      .eq('slug', slug)
      .maybeSingle();
    if (!current) return { error: 'Esse item não existe mais.', fields };

    const { error } = await supabase
      .from('products')
      .update({
        ...values,
        // Sem foto, o item continua fora do site
        visible: current.image_url ? fields.visible === 'on' : false,
      })
      .eq('slug', slug);
    if (error)
      return { error: 'Não foi possível salvar. Tente de novo.', fields };
  } else {
    const { data: existing } = await supabase
      .from('products')
      .select('slug, position');
    const taken = new Set((existing ?? []).map((row) => row.slug));
    const lastPosition = Math.max(
      0,
      ...(existing ?? []).map((row) => row.position),
    );

    const { error } = await supabase.from('products').insert({
      ...values,
      slug: uniqueSlug(fields.name, taken),
      visible: false,
      position: lastPosition + 10,
    });
    if (error)
      return { error: 'Não foi possível cadastrar. Tente de novo.', fields };
  }

  updateTag(PRODUCTS_TAG);
  redirect(`/painel?salvo=${encodeURIComponent(fields.name)}`);
}

// "São Marino com Alça" vira "sao-marino-com-alca"; se já existir, ganha -2
function uniqueSlug(name: string, taken: Set<string>) {
  const base =
    name
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'item';
  // "novo" é o endereço da tela de cadastro
  let slug = base === 'novo' ? 'novo-item' : base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}

// Apaga um item provisório (sem foto, que ainda não passou pelo
// desenvolvedor). Itens com foto não podem ser apagados: o banco recusa.
export async function deleteDraft(slug: string) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('slug', slug)
    .is('image_url', null)
    .select('name');

  if (error || !data?.length) {
    return { error: 'Não foi possível apagar este item.' };
  }

  updateTag(PRODUCTS_TAG);
  redirect(`/painel?apagado=${encodeURIComponent(data[0].name)}`);
}
