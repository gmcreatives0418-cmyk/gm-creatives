import { useRef, useEffect } from 'react';
import styles from './Brands.module.css';

// Import brand logos
import gm from '../assets/images/logo.png';
import gmBakes from '../assets/images/GM Bakes.png';
import hyperFive from '../assets/images/Hyper Five.png';
import lovingMovies from '../assets/images/Lovin movies logo gold-01.png';
import naturolia from '../assets/images/Naturolia Logo-01.png';
import npLogo from '../assets/images/NP2-01.png';
import roadLogo from '../assets/images/Road Logo.png';
import asset1 from '../assets/images/Asset 1.png';
import asset2 from '../assets/images/Asset 1@500x.png';
import final from '../assets/images/final.png';
import logoNewBlack from '../assets/images/logo new Black.png';
import logoWithBg from '../assets/images/logo with background.png';
import logo1 from '../assets/images/logo1.png';
import untitled1 from '../assets/images/Untitled-1.png';
import whiteCloud from '../assets/images/white cloud.png';
import patialaBikers from '../assets/images/patiala-bikers.png';

const BRANDS = [
  { name: 'GM Creatives', image: gm },
  { name: 'GM Bakes', image: gmBakes },
  { name: 'Hyper Five', image: hyperFive },
  { name: 'Lovin Movies', image: lovingMovies },
  { name: 'Naturolia', image: naturolia },
  { name: 'NP', image: npLogo },
  { name: 'Road', image: roadLogo },
  { name: 'Asset', image: asset1 },
  { name: 'Asset HD', image: asset2 },
  { name: 'Final', image: final },
  { name: 'Logo Black', image: logoNewBlack },
  { name: 'Logo BG', image: logoWithBg },
  { name: 'Logo1', image: logo1 },
  { name: 'Untitled1', image: untitled1 },
  { name: 'WhiteCloud', image:whiteCloud },
  { name: 'Patiala-bikers', image:patialaBikers }
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
          {TRACK_ITEMS.map((brand, i) => (
            <button
              key={`${brand.name}-${i}`}
              className={styles.pill}
              onClick={() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
              }}
              type="button"
              aria-label={`${brand.name} - Scroll to top`}
            >
              <img src={brand.image} alt={brand.name} className={styles.brandImage} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
