import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContactModal } from '../contexts/ContactModalContext';
import styles from './Navbar.module.css';
import navLogo from '../assets/images/nav-logo.png';

const NAV_LINKS = [
  { label: 'Home',     to: '/'         },
  { label: 'Services', to: '/services' },
  { label: 'Work',     to: '/work'     },
  { label: 'About',    to: '/about'    },
  { label: 'Contact',  to: '/contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { pathname }              = useLocation();
  const { openModal }             = useContactModal();

  const handleLetsTalk = () => {
    // On contact page, scroll to form instead of opening modal
    if (pathname === '/contact') {
      const formSection = document.querySelector('[data-section="contact-form"]');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // On other pages, open modal
      openModal();
    }
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const handleAnchor = (e, to) => {
    if (!to.startsWith('#')) return;
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(to);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Main navigation">
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="GM Creatives home">
          <img src={navLogo} alt="GM Creatives" className={styles.logoImg} />
        </Link>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              {to.startsWith('#') ? (
                <a
                  href={to}
                  onClick={(e) => handleAnchor(e, to)}
                  className={styles.link}
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={to}
                  className={`${styles.link} ${pathname === to ? styles.active : ''}`}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <button 
          className="btn btn--nav" 
          onClick={handleLetsTalk}
          type="button"
          aria-label="Open contact form"
        >
          Let's Talk
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobile} role="dialog" aria-label="Mobile menu">
          <ul role="list">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                {to.startsWith('#') ? (
                  <a href={to} onClick={(e) => handleAnchor(e, to)} className={styles.mobileLink}>
                    {label}
                  </a>
                ) : (
                  <Link to={to} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button 
            className={styles.mobileCtaButton}
            onClick={() => {
              handleLetsTalk();
              setMenuOpen(false);
            }}
            type="button"
            aria-label="Open contact form"
          >
            Let's Talk
          </button>
        </div>
      )}
    </nav>
  );
}
