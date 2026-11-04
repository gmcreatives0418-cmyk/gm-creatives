import { Link } from 'react-router-dom';
import footerLogo from '../assets/images/footer-logo.png';
import styles from './Footer.module.css';

const SERVICES_COL = ['Brand Identity', 'Graphic Design', 'Motion Design', 'UI / UX Design'];
const MORE_COL     = ['Web Design', 'Web Development', 'Digital Marketing', 'Google & Meta Ads'];
const COMPANY_COL  = [
  { label: 'About Us',  to: '/about'    },
  { label: 'Our Work',  to: '/work'     },
  { label: 'Process',   to: '#process'  },
  { label: 'Contact',   to: '/contact'  },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  const handleAnchor = (e, to) => {
    if (!to.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(to);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>

          {/* Brand column */}
          <div className={styles.brand}>
            <img src={footerLogo} alt="GM Creatives" className={styles.footerLogo} />
            <p>Design. Build. Grow.<br />Eight disciplines, one team.</p>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className={styles.instaButton}>
                <InstagramIcon />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className={styles.cols}>
            <div className={styles.col}>
              <h4>Services</h4>
              <ul>
                {SERVICES_COL.map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className={styles.col}>
              <h4>More Services</h4>
              <ul>
                {MORE_COL.map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className={styles.col}>
              <h4>Company</h4>
              <ul>
                {COMPANY_COL.map(({ label, to }) => (
                  <li key={label}>
                    {to.startsWith('#') ? (
                      <a href={to} onClick={(e) => handleAnchor(e, to)}>{label}</a>
                    ) : (
                      <Link to={to}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} GM Creatives. All rights reserved.</p>
          <p>
            <a href="#">Privacy Policy</a>
            {' · '}
            <a href="#">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
