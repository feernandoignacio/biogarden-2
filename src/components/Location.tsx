import { site, whatsappLink } from '@/data/site';
import styles from './Location.module.css';

// Mapa do Mercado de Flores, o mesmo do site antigo
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2186.2732824399313!2d-47.09956790908681!3d-22.844715464196586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c720319aa64d%3A0x1f6ea963fe13b586!2sMercado%20de%20Flores!5e0!3m2!1spt-BR!2sbr!4v1721096974064!5m2!1spt-BR!2sbr';

const DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=Mercado+de+Flores+Ceasa+Campinas';

export function Location() {
  return (
    <section id="onde-estamos" className={styles.location}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <p className={styles.kicker}>Onde estamos</p>
          <h2 className={styles.title}>Venha conhecer a loja</h2>

          <dl className={styles.info}>
            <div>
              <dt>Endereço</dt>
              <dd>{site.address}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{site.hours}</dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>{site.phone}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className={styles.primary}
            >
              Como chegar
            </a>
            <a
              href={whatsappLink(
                'Olá! Quero visitar a loja, vocês estão abertos hoje?',
              )}
              target="_blank"
              rel="noreferrer"
              className={styles.secondary}
            >
              Avisar que vou
            </a>
          </div>
        </div>

        <iframe
          className={styles.map}
          src={MAP_EMBED}
          title="Mapa do Mercado de Flores, Ceasa Campinas"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
