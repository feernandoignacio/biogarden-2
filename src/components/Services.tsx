import Image from 'next/image';
import { whatsappLink } from '@/data/site';
import styles from './Services.module.css';

// Os quatro serviços do site antigo, cada um com uma foto real de projeto
const SERVICES = [
  {
    title: 'Venda de vasos',
    text: 'Modelos clássicos e modernos para casa, escritório ou área externa.',
    photo: '/images/projetos/projeto-3.webp',
    alt: 'Vaso azul esmaltado com planta em uma sala de estar',
  },
  {
    title: 'Montagem de vasos',
    text: 'Montamos o vaso com a planta certa, pensando no espaço e no cuidado que ela pede.',
    photo: '/images/projetos/projeto-9.webp',
    alt: 'Três vasos texturizados montados com espadas-de-são-jorge',
  },
  {
    title: 'Paisagismo personalizado',
    text: 'Projetos para jardim, varanda ou área externa, unindo plantas, vasos e decoração.',
    photo: '/images/projetos/projeto-5.webp',
    alt: 'Pátio externo com vários vasos e plantas organizados',
  },
  {
    title: 'Visitas técnicas',
    text: 'Acompanhamento periódico com poda, troca de vaso e orientação de cuidados.',
    photo: '/images/projetos/projeto-4.webp',
    alt: 'Vasos brancos com bambus na entrada de um prédio',
  },
];

// Mais fotos de projetos entregues, para mostrar o trabalho de verdade
const PROJECTS = [
  {
    photo: '/images/projetos/projeto-6.webp',
    alt: 'Vaso de terracota com planta em canto de madeira',
  },
  {
    photo: '/images/projetos/projeto-2.webp',
    alt: 'Dois vasos claros com plantas em ambiente interno',
  },
  {
    photo: '/images/projetos/projeto-10.webp',
    alt: 'Fileira de vasos com plantas em um escritório',
  },
  {
    photo: '/images/projetos/projeto-1.webp',
    alt: 'Planta alta em vaso claro ao lado de uma porta de vidro',
  },
  {
    photo: '/images/projetos/projeto-7.webp',
    alt: 'Vaso preto com palmeira em ambiente com parede escura',
  },
  {
    photo: '/images/projetos/projeto-8.webp',
    alt: 'Vasos com plantas em uma recepção',
  },
];

export function Services() {
  return (
    <section id="servicos" className={styles.services}>
      <div className={styles.top}>
        <p className={styles.kicker}>Serviços</p>
        <h2 className={styles.title}>Do vaso ao jardim pronto</h2>
        <p className={styles.intro}>
          Cuidamos de cada etapa: da escolha do vaso à montagem e ao
          acompanhamento das plantas depois da entrega.
        </p>
      </div>

      <ul className={styles.list}>
        {SERVICES.map((service) => (
          <li key={service.title} className={styles.service}>
            <div className={styles.photo}>
              <Image
                src={service.photo}
                alt={service.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw"
              />
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </li>
        ))}
      </ul>

      <div className={styles.projects}>
        <h3 className={styles.projectsTitle}>Alguns projetos entregues</h3>
        <ul className={styles.gallery}>
          {PROJECTS.map((project) => (
            <li key={project.photo}>
              <Image
                src={project.photo}
                alt={project.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cta}>
        <p>Quer um projeto para o seu espaço?</p>
        <a
          href={whatsappLink(
            'Olá! Vim pelo site e quero conversar sobre um projeto de paisagismo.',
          )}
          target="_blank"
          rel="noreferrer"
        >
          Conversar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}
