import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Trigger reveal on mount
    requestAnimationFrame(() => el.classList.add('visible'));
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.bgText} aria-hidden="true">SERVICES</div>

      <div className={`container reveal ${styles.content}`} ref={containerRef}>
        <div className={styles.label}>What We Do</div>

        <h1 className={styles.title}>
          Design.<br />
          Build.<br />
          <span className={styles.titleRed}>Automate.</span>
        </h1>

        <p className={styles.sub}>
          Eight disciplines, one team. Hire us for a single piece or for the whole
          journey — from idea to brand, website, digital experience and automation.
        </p>

        <button
          className="btn btn--red"
          onClick={() => scrollTo('#services')}
          aria-label="Explore our services"
        >
          Explore Services
        </button>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
