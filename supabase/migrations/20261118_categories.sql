-- Categorias do painel. Vasos é a única que aparece no site; as outras
-- são só para o controle da loja. Novas categorias são criadas pelo
-- desenvolvedor (um insert nesta tabela).

create table public.categories (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  position integer not null default 0
);

alter table public.categories enable row level security;
revoke all on public.categories from anon;

create policy "Dono le categorias" on public.categories
for select to authenticated using (true);

insert into public.categories (slug, name, position) values
  ('vasos', 'Vasos', 10),
  ('adubos', 'Adubos', 20),
  ('terra-e-substratos', 'Terra e substratos', 30),
  ('pragas-e-cuidados', 'Pragas e cuidados', 40),
  ('jardim', 'Jardim', 50);

-- Cada item pertence a uma categoria (os atuais são todos vasos)
alter table public.products
  add column category text not null default 'vasos'
  references public.categories (slug) on update cascade;

-- O "tipo" (vaso, bacia, cachepô...) só vale para a categoria Vasos
alter table public.products alter column type drop not null;

alter table public.products
  add constraint products_type_only_for_vasos check (
    (category = 'vasos') = (type is not null)
  ),
  add constraint products_site_only_vasos check (
    category = 'vasos' or not visible
  );

create index products_category_idx on public.products (category);
