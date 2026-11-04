import { useRef, useEffect } from 'react';
import styles from './Brands.module.css';

const BRANDS = [
  'Retail Co.', 'FoodBrand', 'EduCore', 'FaithLife',
  'EventPro', 'TechNova', 'StyleHouse', 'GreenEats',
  'BuildRight', 'MindSpace', 'ArtHive', 'SportsPeak',
];

// Duplicate for seamless infinite scroll
const TRACK_ITEMS = [...BRANDS, ...BRANDS];

export default function Brands() {
  const headerRef = useRef(null);
  const trackRef  = useRef(null);

  // Reveal header
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Pause marquee on hover
  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  return (
    <section className={styles.section} aria-label="Brands we've worked with">
      <div className="container">
        <div className={`reveal ${styles.header}`} ref={headerRef}>
          <div className={styles.tag}>
            <span className={styles.tagNum}>01</span>
            <span>Trust</span>
          </div>
          <h2 className={styles.title}>
            Brands we've<br />worked with.{' '}
            <span className="text-red">(40+)</span>
          </h2>
          <p className={styles.sub}>
            A selection of the 40+ brands we've worked with, across retail,
            food, education, faith, events and technology.
          </p>
        </div>
      </div>

      {/* Full-width marquee (outside container for edge-to-edge) */}
      <div className={styles.marqueeWrap}>
        <div
          className={styles.track}
          ref={trackRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          aria-hidden="true"
        >
          {TRACK_ITEMS.map((name, i) => (
            <div key={`${name}-${i}`} className={styles.pill}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
