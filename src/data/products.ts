// Catálogo de vasos, vindo do site antigo.
// Na fase 2 esta lista passa a vir do banco de dados, editada pelo painel.

export type ProductType =
  'vasos' | 'bacias' | 'cachepos' | 'fontes' | 'acessorios';

export type Product = {
  slug: string;
  name: string;
  type: ProductType;
  description: string;
  // Tamanho da foto, para o Next reservar o espaço antes de carregar
  size: { width: number; height: number };
};

export const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'vasos', label: 'Vasos' },
  { value: 'bacias', label: 'Bacias e cuias' },
  { value: 'cachepos', label: 'Cachepôs' },
  { value: 'fontes', label: 'Fontes' },
  { value: 'acessorios', label: 'Acessórios' },
];

export const products: Product[] = [
  {
    slug: 'bacia-adenium',
    name: 'Bacia Adenium',
    type: 'bacias',
    description:
      'Um toque de sofisticação minimalista. Ideal para realçar a beleza de Adeniums e suculentas, com formato que valoriza a simetria natural das plantas.',
    size: { width: 257, height: 161 },
  },
  {
    slug: 'bacia-japonesa',
    name: 'Bacia Japonesa',
    type: 'bacias',
    description:
      'Inspirada na tradicional arte ceramista do oriente, esta peça traz serenidade e elegância para o cultivo de bonsais ou arranjos delicados.',
    size: { width: 248, height: 211 },
  },
  {
    slug: 'jardineira-cuia',
    name: 'Jardineira Cuia',
    type: 'bacias',
    description:
      'Com curvas suaves e um design acolhedor, é perfeita para composições florais em ambientes internos, proporcionando charme e leveza.',
    size: { width: 310, height: 253 },
  },
  {
    slug: 'gominha',
    name: 'Gominha',
    type: 'vasos',
    description:
      'Pequena no tamanho, mas grande no estilo. Ideal para destacar mini suculentas ou servir de toque decorativo sutil em mesas e estantes.',
    size: { width: 265, height: 350 },
  },
  {
    slug: 'cachepot-americano',
    name: 'Cachepot Americano',
    type: 'cachepos',
    description:
      'Clássico e atemporal, combina perfeitamente com ambientes modernos e sofisticados, valorizando qualquer composição.',
    size: { width: 189, height: 183 },
  },
  {
    slug: 'palla',
    name: 'Palla',
    type: 'vasos',
    description:
      'Sua forma esférica transmite equilíbrio e requinte. Ideal como peça central, destacando o charme natural das plantas.',
    size: { width: 193, height: 198 },
  },
  {
    slug: 'trivial',
    name: 'Trivial',
    type: 'vasos',
    description:
      'Simples, funcional e indispensável. Um modelo coringa para o dia a dia com um toque de praticidade.',
    size: { width: 151, height: 154 },
  },
  {
    slug: 'pezinho',
    name: 'Pezinho',
    type: 'acessorios',
    description:
      'Com base elevada, oferece drenagem eficiente e um visual leve e elevado, ideal para interiores iluminados.',
    size: { width: 161, height: 147 },
  },
  {
    slug: 'cachepot-bally',
    name: 'Cachepot Bally',
    type: 'cachepos',
    description:
      'Linhas suaves e modernas definem este cachepot, ideal para composições discretas e elegantes.',
    size: { width: 157, height: 156 },
  },
  {
    slug: 'cachepot-bola',
    name: 'Cachepot Bola',
    type: 'cachepos',
    description:
      'Seu formato arredondado traz suavidade e movimento, ideal para decorações leves e descontraídas.',
    size: { width: 368, height: 224 },
  },
  {
    slug: 'cachepot-esfera',
    name: 'Cachepot Esfera',
    type: 'cachepos',
    description:
      'Design simétrico e refinado que se integra com facilidade a espaços contemporâneos e minimalistas.',
    size: { width: 224, height: 150 },
  },
  {
    slug: 'cilindro-baixo',
    name: 'Cilindro Baixo',
    type: 'vasos',
    description:
      'Estável e robusto, é ideal para plantas volumosas ou composições densas, com um toque de sofisticação.',
    size: { width: 178, height: 162 },
  },
  {
    slug: 'cilindro-alto',
    name: 'Cilindro Alto',
    type: 'vasos',
    description:
      'Verticalidade imponente que valoriza arranjos altos e sofisticados, ideal para ambientes elegantes.',
    size: { width: 171, height: 202 },
  },
  {
    slug: 'cilindro-esfera',
    name: 'Cilindro Esfera',
    type: 'vasos',
    description:
      'Fusão entre formas cilíndricas e curvas esféricas, trazendo equilíbrio e presença marcante.',
    size: { width: 210, height: 214 },
  },
  {
    slug: 'cantil',
    name: 'Cantil',
    type: 'vasos',
    description:
      'Com visual inspirado em recipientes antigos, é uma peça charmosa para composições rústicas ou retrôs.',
    size: { width: 184, height: 222 },
  },
  {
    slug: 'continental',
    name: 'Continental',
    type: 'vasos',
    description:
      'Elegância europeia traduzida em cerâmica. Versátil, combina com os mais diversos estilos de decoração.',
    size: { width: 192, height: 255 },
  },
  {
    slug: 'espiral',
    name: 'Espiral',
    type: 'vasos',
    description:
      'Textura envolvente que remete ao movimento da natureza. Um convite à contemplação e sofisticação.',
    size: { width: 158, height: 195 },
  },
  {
    slug: 'garrafa',
    name: 'Garrafa',
    type: 'vasos',
    description:
      'Formato alongado e delicado, ideal para flores com hastes finas ou composições verticais elegantes.',
    size: { width: 222, height: 325 },
  },
  {
    slug: 'jarro',
    name: 'Jarro',
    type: 'vasos',
    description:
      'Tradicional e acolhedor, remete aos lares de antigamente com um toque de carinho e rusticidade.',
    size: { width: 170, height: 297 },
  },
  {
    slug: 'spa',
    name: 'Spa',
    type: 'vasos',
    description:
      'Design suave e relaxante, perfeito para ambientes de bem-estar e composições que inspiram calma.',
    size: { width: 203, height: 220 },
  },
  {
    slug: 'torre',
    name: 'Torre',
    type: 'vasos',
    description:
      'Verticalidade moderna em uma peça compacta. Ideal para espaços pequenos que pedem estilo.',
    size: { width: 163, height: 201 },
  },
  {
    slug: 'pote',
    name: 'Pote',
    type: 'vasos',
    description:
      'Funcional e versátil, perfeito para uso em ambientes internos e externos, sempre com charme.',
    size: { width: 167, height: 203 },
  },
  {
    slug: 'seat-garden',
    name: 'Seat Garden',
    type: 'acessorios',
    description:
      'Peça multifuncional: pode ser usada como vaso, assento ou destaque decorativo.',
    size: { width: 163, height: 256 },
  },
  {
    slug: 'bacia-bergamo',
    name: 'Bacia Bérgamo',
    type: 'bacias',
    description:
      'Curvas italianas e acabamento refinado fazem desta peça uma verdadeira obra de arte.',
    size: { width: 197, height: 163 },
  },
  {
    slug: 'belga',
    name: 'Belga',
    type: 'vasos',
    description:
      'Elegância clássica com influência europeia. Ideal para composições delicadas e sofisticadas.',
    size: { width: 211, height: 193 },
  },
  {
    slug: 'prato',
    name: 'Prato',
    type: 'acessorios',
    description:
      'Elemento complementar essencial, com acabamento refinado que evita respingos ao regar.',
    size: { width: 166, height: 180 },
  },
  {
    slug: 'bacia-especial',
    name: 'Bacia Especial',
    type: 'bacias',
    description:
      'Acabamento diferenciado e presença marcante tornam esta bacia única e cheia de personalidade.',
    size: { width: 277, height: 179 },
  },
  {
    slug: 'bacia-etiopia',
    name: 'Bacia Etiópia',
    type: 'bacias',
    description:
      'Inspirada no artesanato africano, esta peça exala autenticidade e beleza étnica.',
    size: { width: 261, height: 206 },
  },
  {
    slug: 'egito',
    name: 'Egito',
    type: 'vasos',
    description:
      'Design imponente com detalhes que evocam o esplendor das civilizações antigas.',
    size: { width: 198, height: 231 },
  },
  {
    slug: 'toscano',
    name: 'Toscano',
    type: 'vasos',
    description:
      'Rusticidade charmosa inspirada nas paisagens campestres da Toscana italiana.',
    size: { width: 194, height: 281 },
  },
  {
    slug: 'espanhol',
    name: 'Espanhol',
    type: 'vasos',
    description:
      'Traços elegantes e tradicionais que remetem à nobreza da cerâmica ibérica.',
    size: { width: 167, height: 276 },
  },
  {
    slug: 'marrocos',
    name: 'Marrocos',
    type: 'vasos',
    description:
      'Detalhes ricos e traços étnicos fazem desta peça uma celebração da arte marroquina.',
    size: { width: 194, height: 236 },
  },
  {
    slug: 'italia',
    name: 'Itália',
    type: 'vasos',
    description:
      'Estilo mediterrâneo clássico com acabamento que valoriza qualquer composição floral.',
    size: { width: 210, height: 190 },
  },
  {
    slug: 'sao-marino',
    name: 'São Marino',
    type: 'vasos',
    description:
      'Sutileza e nobreza se encontram nesta peça com influência europeia refinada.',
    size: { width: 210, height: 262 },
  },
  {
    slug: 'toscano-esfera',
    name: 'Toscano Esfera',
    type: 'vasos',
    description:
      'Mistura entre rusticidade toscana e a simetria envolvente das formas esféricas.',
    size: { width: 181, height: 234 },
  },
  {
    slug: 'tunes',
    name: 'Tunes',
    type: 'vasos',
    description:
      'Estilo árabe com detalhes ornamentais delicados, perfeito para decorações ousadas e artísticas.',
    size: { width: 199, height: 323 },
  },
  {
    slug: 'egito-esfera',
    name: 'Egito Esfera',
    type: 'vasos',
    description:
      'Fusão entre a imponência egípcia e o design esférico contemporâneo.',
    size: { width: 240, height: 280 },
  },
  {
    slug: 'bally',
    name: 'Bally',
    type: 'vasos',
    description:
      'Design minimalista e moderno que se adapta com leveza a qualquer ambiente claro.',
    size: { width: 180, height: 335 },
  },
  {
    slug: 'montreal',
    name: 'Montreal',
    type: 'vasos',
    description:
      'Inspirado no urbanismo canadense, esta peça traz modernidade com um toque cosmopolita.',
    size: { width: 232, height: 322 },
  },
  {
    slug: 'lisboa',
    name: 'Lisboa',
    type: 'vasos',
    description:
      'Linhas suaves e toque nostálgico homenageiam a tradição ceramista portuguesa.',
    size: { width: 188, height: 260 },
  },
  {
    slug: 'provenca',
    name: 'Provença',
    type: 'vasos',
    description:
      'Romântica e delicada, como os campos floridos do sul da França.',
    size: { width: 233, height: 271 },
  },
  {
    slug: 'real',
    name: 'Real',
    type: 'vasos',
    description:
      'Presença clássica e imponente. Ideal para ambientes que pedem elegância duradoura.',
    size: { width: 190, height: 296 },
  },
  {
    slug: 'sao-marino-com-alca',
    name: 'São Marino com Alça',
    type: 'vasos',
    description:
      'Alças decorativas acrescentam charme e funcionalidade a esta peça de inspiração europeia.',
    size: { width: 251, height: 441 },
  },
  {
    slug: 'medelim',
    name: 'Medelim',
    type: 'vasos',
    description:
      'Elegância discreta com forte influência lusitana. Um toque de tradição com frescor moderno.',
    size: { width: 214, height: 313 },
  },
  {
    slug: 'atlanta',
    name: 'Atlanta',
    type: 'vasos',
    description:
      'Versatilidade urbana com linhas modernas, ideal para composições contemporâneas.',
    size: { width: 172, height: 313 },
  },
  {
    slug: 'atlanta-com-alca',
    name: 'Atlanta com alça',
    type: 'vasos',
    description:
      'Combina estilo e praticidade em uma peça funcional e decorativa.',
    size: { width: 184, height: 313 },
  },
  {
    slug: 'fonte-atlanta',
    name: 'Fonte Atlanta',
    type: 'fontes',
    description:
      'Elemento decorativo e funcional que proporciona som e movimento com estilo moderno.',
    size: { width: 192, height: 369 },
  },
  {
    slug: 'fonte-tunes',
    name: 'Fonte Tunes',
    type: 'fontes',
    description:
      'Riqueza de detalhes artesanais inspirados nas fontes tradicionais do norte da África.',
    size: { width: 225, height: 372 },
  },
  {
    slug: 'cuba',
    name: 'Cuba',
    type: 'bacias',
    description:
      'Peça ampla e rasa, perfeita para arranjos criativos com visual orgânico e expressivo.',
    size: { width: 388, height: 206 },
  },
];

export function productImage(product: Product) {
  return `/images/vasos/${product.slug}.webp`;
}

// Silhueta com uma pessoa ou garrafa ao lado, para dar noção do tamanho
export function measureImage(product: Product) {
  return `/images/medidas/${product.slug}.webp`;
}

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function typeLabel(type: ProductType) {
  return PRODUCT_TYPES.find((item) => item.value === type)?.label ?? '';
}
