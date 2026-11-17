import { SITE_URL, site } from '@/data/site';

// Dados da loja no formato que o Google entende (endereço, horário e telefone).
// Ajuda a Biogarden a aparecer em buscas como "vasos Ceasa Campinas".
const STORE = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: site.name,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  telephone: '+55-19-99904-2258',
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ceasa Campinas, Mercado de Flores, Box S1 e S12',
    addressLocality: 'Campinas',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -22.8447,
    longitude: -47.0996,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '16:30',
    },
  ],
  sameAs: [site.instagram],
};

export function StoreInfo() {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é fixo, vindo do próprio código, então é seguro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(STORE) }}
    />
  );
}
