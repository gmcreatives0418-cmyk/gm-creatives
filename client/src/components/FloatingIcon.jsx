import styles from './FloatingIcon.module.css';
import instagramIcon from '../assets/icons/instagram.svg';

export default function FloatingIcon() {
  const whatsappNumber = '+919884737590';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Hi%20GM%20Creatives,%20I%20want%20to%20discuss%20a%20project`;
  const instagramUrl = 'https://instagram.com/gmcreatives0418';

  return (
    <div className={styles.floatingContainer}>
      {/* WhatsApp Icon */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingIcon}
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <img src="/icons/whatsapp.png" alt="WhatsApp" />
      </a>

      {/* Instagram Icon */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatingIcon} ${styles.instagram}`}
        aria-label="Follow us on Instagram"
        title="Follow on Instagram"
      >
        <img src={instagramIcon} alt="Instagram" />
      </a>
    </div>
  );
}
