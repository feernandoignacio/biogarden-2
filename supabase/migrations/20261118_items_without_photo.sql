-- Itens novos podem ser cadastrados pelo painel sem foto (só para o
-- controle da loja). Sem foto, o item não pode aparecer no site.

alter table public.products
  alter column image_url drop not null,
  alter column image_width drop not null,
  alter column image_height drop not null;

alter table public.products
  add constraint products_visible_needs_photo check (
    not visible
    or (image_url is not null and image_width is not null and image_height is not null)
  );
