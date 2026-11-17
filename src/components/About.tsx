import Image from 'next/image';
import styles from './About.module.css';

// Os três motivos para escolher a Biogarden, resumindo o texto do site antigo
const VALUES = [
  {
    title: 'Qualidade em cada peça',
    text: 'Vasos duráveis, de materiais selecionados, para durar dentro e fora de casa.',
  },
  {
    title: 'Atendimento de perto',
    text: 'Ajudamos a escolher o vaso e a planta certos e acompanhamos depois da compra.',
  },
  {
    title: 'Direto do Mercado de Flores',
    text: 'No Ceasa Campinas, com variedade de plantas para montar o vaso na hora e entrega ágil.',
  },
];

export function About() {
  return (
    <section id="sobre" className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.kicker}>Sobre nós</p>
          <h2 className={styles.title}>
            Decoração botânica que deixa o espaço mais vivo
          </h2>
          <p className={styles.lead}>
            Fundada em 2022, a Biogarden nasceu para transformar ambientes com a
            beleza e a serenidade das plantas.
          </p>
          <p>
            Mais do que vender vasos, cuidamos de cada cliente com um
            atendimento personalizado, do primeiro contato até depois da
            entrega. Acreditamos que cada detalhe importa e ajudamos você a
            criar ambientes que reflitam a sua personalidade e o seu estilo.
          </p>
        </div>

        <figure className={styles.photo}>
          <Image
            src="/images/loja-box.webp"
            alt="Fachada do box da Biogarden no Mercado de Flores, com vasos e plantas"
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          <figcaption>Nosso box no Ceasa Campinas</figcaption>
        </figure>
      </div>

      <ul className={styles.values}>
        {VALUES.map((value, index) => (
          <li key={value.title} className={styles.value}>
            <span className={styles.number}>0{index + 1}</span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
