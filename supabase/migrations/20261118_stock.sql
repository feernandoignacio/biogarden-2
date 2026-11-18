-- Estoque da loja física: só o dono (logado) vê e altera.
-- O site (visitante anônimo) continua lendo os vasos, mas não esta coluna.

alter table public.products
  add column stock integer not null default 0 check (stock >= 0);

-- Visitante só pode ler as colunas que aparecem no site
revoke select on public.products from anon;
grant select (
  id, slug, name, type, description, image_url, image_width, image_height,
  measure_url, visible, position, created_at, updated_at
) on public.products to anon;
