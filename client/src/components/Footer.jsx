import { Link } from 'react-router-dom';
import footerLogo from '../assets/images/footer-logo.png';
import styles from './Footer.module.css';

const SERVICES_COL = ['Brand Identity', 'Graphic Design', 'Motion Design', 'UI / UX Design'];
const MORE_COL     = ['Web Design', 'Web Development', 'Digital Marketing', 'Google & Meta Ads'];
const COMPANY_COL  = [
  { label: 'About Us',  to: '#' },
  { label: 'Our Work',  to: '#' },
  { label: 'Process',   to: '#process' },
  { label: 'Contact',   to: '#contact' },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46 10.53 4.4 10 5.67 10 7v3H7v4h3v8h4v-8h3l1-4h-4V7c0-.27.1-.52.29-.71.18-.18.43-.29.71-.29H18V2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8"/>
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
            <p>Design. Build. Automate.<br />Eight disciplines, one team.</p>
            <div className={styles.socials}>
              {[
                { Icon: InstagramIcon, label: 'Instagram', href: '#' },
                { Icon: FacebookIcon,  label: 'Facebook',  href: '#' },
                { Icon: LinkedInIcon,  label: 'LinkedIn',  href: '#' },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className={styles.socialLink}>
                  <Icon />
                </a>
              ))}
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
