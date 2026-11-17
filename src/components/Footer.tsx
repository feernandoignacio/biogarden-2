import Image from 'next/image';
import { site, whatsappLink } from '@/data/site';
import { InstagramIcon, WhatsappIcon } from './Icons';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="contato" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image src="/images/logo.png" alt="" width={48} height={48} />
          <p className={styles.name}>Biogarden</p>
          <p className={styles.tagline}>
            Transforme seu ambiente com muito verde.
          </p>
        </div>

        <div>
          <h2 className={styles.title}>Contato</h2>
          <ul className={styles.list}>
            <li>{site.address}</li>
            <li>WhatsApp: {site.phone}</li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <h2 className={styles.title}>Redes</h2>
          <div className={styles.icons}>
            <a
              href={whatsappLink(
                'Olá! Vim pelo site e quero conhecer os produtos.',
              )}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsappIcon />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <p className={styles.credits}>
        © Biogarden Paisagismo · Vasos e paisagismo em Campinas
      </p>
    </footer>
  );
}
