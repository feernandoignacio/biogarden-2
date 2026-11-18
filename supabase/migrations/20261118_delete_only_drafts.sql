-- O dono só pode apagar itens provisórios: os que ainda não têm foto
-- (não passaram pelo desenvolvedor). Itens com foto só podem ser escondidos.

drop policy "Dono remove vasos" on public.products;

create policy "Dono remove itens provisorios" on public.products
for delete to authenticated using (image_url is null);
