import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const MARQUEE_ITEMS = [
  'Brand Identity', 'Web Design', 'Motion Design',
  'Google Ads', 'UI / UX', 'Digital Marketing',
  'Graphic Design', 'Web Development', 'Meta Ads',
];

export default function Hero() {
  const contentRef = useRef(null);
  const visualRef  = useRef(null);

  useEffect(() => {
    const els = [contentRef.current, visualRef.current];
    const timers = els.map((el, i) =>
      setTimeout(() => el?.classList.add('visible'), i * 180)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={styles.hero} aria-label="Hero">

      {/* ── Left: content ── */}
      <div className={`container ${styles.wrapper}`}>
        <div className={`reveal ${styles.content}`} ref={contentRef}>

          <div className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" />
            Creative Agency
          </div>

          <h1 className={styles.title}>
            We Design.<br />
            We Build.<br />
            <em className={styles.em}>We Grow</em>{' '}
            <span className={styles.outline}>Brands.</span>
          </h1>

          <p className={styles.sub}>
            Eight disciplines, one team. From brand identity to digital marketing —
            we handle every piece of your digital presence.
          </p>

          <div className={styles.actions}>
            <button className="btn btn--red" onClick={() => scrollTo('#services')}>
              See Our Services
            </button>
            <button className={styles.ghost} onClick={() => scrollTo('#contact')}>
              <span className={styles.playIcon} aria-hidden="true">↗</span>
              Start a Project
            </button>
          </div>

          {/* Social proof bar */}
          <div className={styles.proof}>
            <div className={styles.avatars} aria-hidden="true">
              {['A','B','C','D'].map((l) => (
                <span key={l} className={styles.avatar}>{l}</span>
              ))}
            </div>
            <p>
              <strong>40+ brands</strong> trust GM Creatives
            </p>
          </div>

        </div>

        {/* ── Right: visual card ── */}
        <div className={`reveal ${styles.visual}`} ref={visualRef}>

          {/* Main card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardDot} style={{ background: '#ff5f57' }} />
              <span className={styles.cardDot} style={{ background: '#febc2e' }} />
              <span className={styles.cardDot} style={{ background: '#28c840' }} />
              <span className={styles.cardLabel}>gm-creatives.studio</span>
            </div>
            <div className={styles.cardBody}>
              {/* Big red GM monogram */}
              <div className={styles.monogram} aria-hidden="true">
                <svg viewBox="0 0 120 80" fill="none">
                  <text x="0" y="70" fontSize="80" fontWeight="900"
                    fontFamily="Inter,sans-serif" fill="#A31621" letterSpacing="-4">
                    GM
                  </text>
                </svg>
              </div>
              <p className={styles.cardTag}>Design · Build · Grow</p>

              {/* Pill tags */}
              <div className={styles.pills}>
                {['Branding','Web Dev','Motion','Ads'].map((t) => (
                  <span key={t} className={styles.pill}>{t}</span>
                ))}
              </div>
            </div>

            {/* Floating stat badge */}
            <div className={styles.statBadge}>
              <span className={styles.statNum}>98%</span>
              <span className={styles.statLabel}>Client<br/>Satisfaction</span>
            </div>

            {/* Floating project badge */}
            <div className={styles.projectBadge}>
              <span className={styles.projectIcon}>✦</span>
              <span>200+ Projects</span>
            </div>
          </div>

          {/* Background blobs */}
          <div className={styles.blob1} aria-hidden="true" />
          <div className={styles.blob2} aria-hidden="true" />
        </div>
      </div>

      {/* ── Scrolling ticker at bottom ── */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item} <span className={styles.tickerDot}>✦</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
