import { whatsappLink } from '@/data/site';
import { WhatsappIcon } from './Icons';
import styles from './WhatsappFloat.module.css';

// Botão fixo no canto, para chamar no WhatsApp de qualquer parte do site
export function WhatsappFloat() {
  return (
    <a
      href={whatsappLink('Olá! Vim pelo site e quero conhecer os produtos.')}
      target="_blank"
      rel="noreferrer"
      className={styles.button}
      aria-label="Conversar no WhatsApp"
    >
      <WhatsappIcon size={28} />
    </a>
  );
}
