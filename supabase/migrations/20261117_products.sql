-- Biogarden: tabela de vasos, regras de acesso e pasta de fotos

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(name) between 1 and 80),
  type text not null check (type in ('vasos', 'bacias', 'cachepos', 'fontes', 'acessorios')),
  description text not null default '',
  image_url text not null,
  image_width integer not null check (image_width > 0),
  image_height integer not null check (image_height > 0),
  measure_url text,
  visible boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_position_idx on public.products (position);

create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at before update on public.products
for each row execute function public.set_updated_at();

alter table public.products enable row level security;

-- Visitantes veem só os vasos visíveis
create policy "Vasos visiveis sao publicos" on public.products
for select to anon using (visible);

-- O dono (único usuário com login) pode tudo
create policy "Dono le todos os vasos" on public.products
for select to authenticated using (true);
create policy "Dono cria vasos" on public.products
for insert to authenticated with check (true);
create policy "Dono edita vasos" on public.products
for update to authenticated using (true) with check (true);
create policy "Dono remove vasos" on public.products
for delete to authenticated using (true);

-- Pasta pública de fotos (até 5 MB, só imagens)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('vasos', 'vasos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']);

create policy "Dono envia fotos" on storage.objects
for insert to authenticated with check (bucket_id = 'vasos');
create policy "Dono troca fotos" on storage.objects
for update to authenticated using (bucket_id = 'vasos');
create policy "Dono apaga fotos" on storage.objects
for delete to authenticated using (bucket_id = 'vasos');

-- Os 49 vasos que já estavam no site
insert into public.products
  (slug, name, type, description, image_url, image_width, image_height, measure_url, position)
values
  ('bacia-adenium', 'Bacia Adenium', 'bacias', 'Um toque de sofisticação minimalista. Ideal para realçar a beleza de Adeniums e suculentas, com formato que valoriza a simetria natural das plantas.', '/images/vasos/bacia-adenium.webp', 257, 161, '/images/medidas/bacia-adenium.webp', 10),
  ('bacia-japonesa', 'Bacia Japonesa', 'bacias', 'Inspirada na tradicional arte ceramista do oriente, esta peça traz serenidade e elegância para o cultivo de bonsais ou arranjos delicados.', '/images/vasos/bacia-japonesa.webp', 248, 211, '/images/medidas/bacia-japonesa.webp', 20),
  ('jardineira-cuia', 'Jardineira Cuia', 'bacias', 'Com curvas suaves e um design acolhedor, é perfeita para composições florais em ambientes internos, proporcionando charme e leveza.', '/images/vasos/jardineira-cuia.webp', 310, 253, '/images/medidas/jardineira-cuia.webp', 30),
  ('gominha', 'Gominha', 'vasos', 'Pequena no tamanho, mas grande no estilo. Ideal para destacar mini suculentas ou servir de toque decorativo sutil em mesas e estantes.', '/images/vasos/gominha.webp', 265, 350, '/images/medidas/gominha.webp', 40),
  ('cachepot-americano', 'Cachepot Americano', 'cachepos', 'Clássico e atemporal, combina perfeitamente com ambientes modernos e sofisticados, valorizando qualquer composição.', '/images/vasos/cachepot-americano.webp', 189, 183, '/images/medidas/cachepot-americano.webp', 50),
  ('palla', 'Palla', 'vasos', 'Sua forma esférica transmite equilíbrio e requinte. Ideal como peça central, destacando o charme natural das plantas.', '/images/vasos/palla.webp', 193, 198, '/images/medidas/palla.webp', 60),
  ('trivial', 'Trivial', 'vasos', 'Simples, funcional e indispensável. Um modelo coringa para o dia a dia com um toque de praticidade.', '/images/vasos/trivial.webp', 151, 154, '/images/medidas/trivial.webp', 70),
  ('pezinho', 'Pezinho', 'acessorios', 'Com base elevada, oferece drenagem eficiente e um visual leve e elevado, ideal para interiores iluminados.', '/images/vasos/pezinho.webp', 161, 147, '/images/medidas/pezinho.webp', 80),
  ('cachepot-bally', 'Cachepot Bally', 'cachepos', 'Linhas suaves e modernas definem este cachepot, ideal para composições discretas e elegantes.', '/images/vasos/cachepot-bally.webp', 157, 156, '/images/medidas/cachepot-bally.webp', 90),
  ('cachepot-bola', 'Cachepot Bola', 'cachepos', 'Seu formato arredondado traz suavidade e movimento, ideal para decorações leves e descontraídas.', '/images/vasos/cachepot-bola.webp', 368, 224, '/images/medidas/cachepot-bola.webp', 100),
  ('cachepot-esfera', 'Cachepot Esfera', 'cachepos', 'Design simétrico e refinado que se integra com facilidade a espaços contemporâneos e minimalistas.', '/images/vasos/cachepot-esfera.webp', 224, 150, '/images/medidas/cachepot-esfera.webp', 110),
  ('cilindro-baixo', 'Cilindro Baixo', 'vasos', 'Estável e robusto, é ideal para plantas volumosas ou composições densas, com um toque de sofisticação.', '/images/vasos/cilindro-baixo.webp', 178, 162, '/images/medidas/cilindro-baixo.webp', 120),
  ('cilindro-alto', 'Cilindro Alto', 'vasos', 'Verticalidade imponente que valoriza arranjos altos e sofisticados, ideal para ambientes elegantes.', '/images/vasos/cilindro-alto.webp', 171, 202, '/images/medidas/cilindro-alto.webp', 130),
  ('cilindro-esfera', 'Cilindro Esfera', 'vasos', 'Fusão entre formas cilíndricas e curvas esféricas, trazendo equilíbrio e presença marcante.', '/images/vasos/cilindro-esfera.webp', 210, 214, '/images/medidas/cilindro-esfera.webp', 140),
  ('cantil', 'Cantil', 'vasos', 'Com visual inspirado em recipientes antigos, é uma peça charmosa para composições rústicas ou retrôs.', '/images/vasos/cantil.webp', 184, 222, '/images/medidas/cantil.webp', 150),
  ('continental', 'Continental', 'vasos', 'Elegância europeia traduzida em cerâmica. Versátil, combina com os mais diversos estilos de decoração.', '/images/vasos/continental.webp', 192, 255, '/images/medidas/continental.webp', 160),
  ('espiral', 'Espiral', 'vasos', 'Textura envolvente que remete ao movimento da natureza. Um convite à contemplação e sofisticação.', '/images/vasos/espiral.webp', 158, 195, '/images/medidas/espiral.webp', 170),
  ('garrafa', 'Garrafa', 'vasos', 'Formato alongado e delicado, ideal para flores com hastes finas ou composições verticais elegantes.', '/images/vasos/garrafa.webp', 222, 325, '/images/medidas/garrafa.webp', 180),
  ('jarro', 'Jarro', 'vasos', 'Tradicional e acolhedor, remete aos lares de antigamente com um toque de carinho e rusticidade.', '/images/vasos/jarro.webp', 170, 297, '/images/medidas/jarro.webp', 190),
  ('spa', 'Spa', 'vasos', 'Design suave e relaxante, perfeito para ambientes de bem-estar e composições que inspiram calma.', '/images/vasos/spa.webp', 203, 220, '/images/medidas/spa.webp', 200),
  ('torre', 'Torre', 'vasos', 'Verticalidade moderna em uma peça compacta. Ideal para espaços pequenos que pedem estilo.', '/images/vasos/torre.webp', 163, 201, '/images/medidas/torre.webp', 210),
  ('pote', 'Pote', 'vasos', 'Funcional e versátil, perfeito para uso em ambientes internos e externos, sempre com charme.', '/images/vasos/pote.webp', 167, 203, '/images/medidas/pote.webp', 220),
  ('seat-garden', 'Seat Garden', 'acessorios', 'Peça multifuncional: pode ser usada como vaso, assento ou destaque decorativo.', '/images/vasos/seat-garden.webp', 163, 256, '/images/medidas/seat-garden.webp', 230),
  ('bacia-bergamo', 'Bacia Bérgamo', 'bacias', 'Curvas italianas e acabamento refinado fazem desta peça uma verdadeira obra de arte.', '/images/vasos/bacia-bergamo.webp', 197, 163, '/images/medidas/bacia-bergamo.webp', 240),
  ('belga', 'Belga', 'vasos', 'Elegância clássica com influência europeia. Ideal para composições delicadas e sofisticadas.', '/images/vasos/belga.webp', 211, 193, '/images/medidas/belga.webp', 250),
  ('prato', 'Prato', 'acessorios', 'Elemento complementar essencial, com acabamento refinado que evita respingos ao regar.', '/images/vasos/prato.webp', 166, 180, '/images/medidas/prato.webp', 260),
  ('bacia-especial', 'Bacia Especial', 'bacias', 'Acabamento diferenciado e presença marcante tornam esta bacia única e cheia de personalidade.', '/images/vasos/bacia-especial.webp', 277, 179, '/images/medidas/bacia-especial.webp', 270),
  ('bacia-etiopia', 'Bacia Etiópia', 'bacias', 'Inspirada no artesanato africano, esta peça exala autenticidade e beleza étnica.', '/images/vasos/bacia-etiopia.webp', 261, 206, '/images/medidas/bacia-etiopia.webp', 280),
  ('egito', 'Egito', 'vasos', 'Design imponente com detalhes que evocam o esplendor das civilizações antigas.', '/images/vasos/egito.webp', 198, 231, '/images/medidas/egito.webp', 290),
  ('toscano', 'Toscano', 'vasos', 'Rusticidade charmosa inspirada nas paisagens campestres da Toscana italiana.', '/images/vasos/toscano.webp', 194, 281, '/images/medidas/toscano.webp', 300),
  ('espanhol', 'Espanhol', 'vasos', 'Traços elegantes e tradicionais que remetem à nobreza da cerâmica ibérica.', '/images/vasos/espanhol.webp', 167, 276, '/images/medidas/espanhol.webp', 310),
  ('marrocos', 'Marrocos', 'vasos', 'Detalhes ricos e traços étnicos fazem desta peça uma celebração da arte marroquina.', '/images/vasos/marrocos.webp', 194, 236, '/images/medidas/marrocos.webp', 320),
  ('italia', 'Itália', 'vasos', 'Estilo mediterrâneo clássico com acabamento que valoriza qualquer composição floral.', '/images/vasos/italia.webp', 210, 190, '/images/medidas/italia.webp', 330),
  ('sao-marino', 'São Marino', 'vasos', 'Sutileza e nobreza se encontram nesta peça com influência europeia refinada.', '/images/vasos/sao-marino.webp', 210, 262, '/images/medidas/sao-marino.webp', 340),
  ('toscano-esfera', 'Toscano Esfera', 'vasos', 'Mistura entre rusticidade toscana e a simetria envolvente das formas esféricas.', '/images/vasos/toscano-esfera.webp', 181, 234, '/images/medidas/toscano-esfera.webp', 350),
  ('tunes', 'Tunes', 'vasos', 'Estilo árabe com detalhes ornamentais delicados, perfeito para decorações ousadas e artísticas.', '/images/vasos/tunes.webp', 199, 323, '/images/medidas/tunes.webp', 360),
  ('egito-esfera', 'Egito Esfera', 'vasos', 'Fusão entre a imponência egípcia e o design esférico contemporâneo.', '/images/vasos/egito-esfera.webp', 240, 280, '/images/medidas/egito-esfera.webp', 370),
  ('bally', 'Bally', 'vasos', 'Design minimalista e moderno que se adapta com leveza a qualquer ambiente claro.', '/images/vasos/bally.webp', 180, 335, '/images/medidas/bally.webp', 380),
  ('montreal', 'Montreal', 'vasos', 'Inspirado no urbanismo canadense, esta peça traz modernidade com um toque cosmopolita.', '/images/vasos/montreal.webp', 232, 322, '/images/medidas/montreal.webp', 390),
  ('lisboa', 'Lisboa', 'vasos', 'Linhas suaves e toque nostálgico homenageiam a tradição ceramista portuguesa.', '/images/vasos/lisboa.webp', 188, 260, '/images/medidas/lisboa.webp', 400),
  ('provenca', 'Provença', 'vasos', 'Romântica e delicada, como os campos floridos do sul da França.', '/images/vasos/provenca.webp', 233, 271, '/images/medidas/provenca.webp', 410),
  ('real', 'Real', 'vasos', 'Presença clássica e imponente. Ideal para ambientes que pedem elegância duradoura.', '/images/vasos/real.webp', 190, 296, '/images/medidas/real.webp', 420),
  ('sao-marino-com-alca', 'São Marino com Alça', 'vasos', 'Alças decorativas acrescentam charme e funcionalidade a esta peça de inspiração europeia.', '/images/vasos/sao-marino-com-alca.webp', 251, 441, '/images/medidas/sao-marino-com-alca.webp', 430),
  ('medelim', 'Medelim', 'vasos', 'Elegância discreta com forte influência lusitana. Um toque de tradição com frescor moderno.', '/images/vasos/medelim.webp', 214, 313, '/images/medidas/medelim.webp', 440),
  ('atlanta', 'Atlanta', 'vasos', 'Versatilidade urbana com linhas modernas, ideal para composições contemporâneas.', '/images/vasos/atlanta.webp', 172, 313, '/images/medidas/atlanta.webp', 450),
  ('atlanta-com-alca', 'Atlanta com alça', 'vasos', 'Combina estilo e praticidade em uma peça funcional e decorativa.', '/images/vasos/atlanta-com-alca.webp', 184, 313, '/images/medidas/atlanta-com-alca.webp', 460),
  ('fonte-atlanta', 'Fonte Atlanta', 'fontes', 'Elemento decorativo e funcional que proporciona som e movimento com estilo moderno.', '/images/vasos/fonte-atlanta.webp', 192, 369, '/images/medidas/fonte-atlanta.webp', 470),
  ('fonte-tunes', 'Fonte Tunes', 'fontes', 'Riqueza de detalhes artesanais inspirados nas fontes tradicionais do norte da África.', '/images/vasos/fonte-tunes.webp', 225, 372, '/images/medidas/fonte-tunes.webp', 480),
  ('cuba', 'Cuba', 'bacias', 'Peça ampla e rasa, perfeita para arranjos criativos com visual orgânico e expressivo.', '/images/vasos/cuba.webp', 388, 206, '/images/medidas/cuba.webp', 490);
