-- Contagem de visitas do site (sem cookies e sem dados pessoais).
-- Guarda só quantas vezes cada página foi vista por dia e quantos cliques
-- no WhatsApp ela gerou. Só o dono (logado) consegue ler.

create table public.page_views (
  day date not null,
  path text not null check (length(path) <= 200),
  kind text not null check (kind in ('view', 'whatsapp')),
  count integer not null default 0,
  primary key (day, path, kind)
);

alter table public.page_views enable row level security;
revoke all on public.page_views from anon;

create policy "Dono le estatisticas" on public.page_views
for select to authenticated using (true);

-- O site chama esta função a cada visita. Ela só soma 1; não deixa ler
-- nem apagar nada.
create function public.track_visit(p_path text, p_kind text default 'view')
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_path is null
    or length(p_path) > 200
    or p_path !~ '^/[a-z0-9/-]*$'
    or p_path like '/painel%'
    or p_kind not in ('view', 'whatsapp') then
    return;
  end if;

  insert into public.page_views (day, path, kind, count)
  values ((now() at time zone 'America/Sao_Paulo')::date, p_path, p_kind, 1)
  on conflict (day, path, kind)
  do update set count = public.page_views.count + 1;
end;
$$;

revoke all on function public.track_visit(text, text) from public;
grant execute on function public.track_visit(text, text) to anon, authenticated;
