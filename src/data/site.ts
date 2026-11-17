// Endereço do site. Quando a Biogarden tiver domínio próprio, troque só aqui
export const SITE_URL = 'https://biogarden-2.vercel.app';

// Dados de contato da Biogarden, usados no site todo
export const site = {
  name: 'Biogarden Paisagismo',
  phone: '(19) 99904-2258',
  email: 'biogardenp@gmail.com',
  address: 'Ceasa Campinas-SP, Mercado de Flores, Box S1 e S12',
  hours: 'Segunda a sexta, das 8h às 16h30',
  instagram: 'https://www.instagram.com/biogardenp/',
};

const WHATSAPP_NUMBER = '5519999042258';

// Link do WhatsApp com uma mensagem pronta
export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Começam com "/" para funcionar também nas páginas dos vasos
export const navLinks = [
  { href: '/#sobre', label: 'Sobre nós' },
  { href: '/vasos', label: 'Vasos' },
  { href: '/vasos#materiais', label: 'Materiais e cores' },
  { href: '/#servicos', label: 'Serviços' },
];
