import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../contexts/ContactModalContext';
import styles from './Services.module.css';

const SERVICES = [
  {
    id: 1, index: '01', title: 'Brand Identity',
    description: 'Identities with a point of view, built as systems that hold up everywhere they appear.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M16 24 L24 10 L32 24 L24 38 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2, index: '02', title: 'Graphic Design',
    description: 'Campaigns, social content and print that look like they belong to the same brand.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M6 18 H42" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M18 18 V42" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: 3, index: '03', title: 'Motion Design',
    description: 'Motion graphics, logo animation and video that give a brand rhythm.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 24 C10 15 20 8 24 8 C28 8 38 15 38 24 C38 33 28 40 24 40 C20 40 10 33 10 24Z" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M20 18 L32 24 L20 30 Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 4, index: '04', title: 'UI / UX Design',
    description: 'Interfaces that are easy to use and unmistakably yours.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="4" y="10" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M4 18 H44" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="10" cy="14" r="2" fill="currentColor"/>
        <circle cx="16" cy="14" r="2" fill="currentColor"/>
        <circle cx="22" cy="14" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 5, index: '05', title: 'Web Design',
    description: 'Websites designed around what visitors need to understand and do.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="40" height="30" rx="3" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M16 38 L16 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M32 38 L32 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M10 44 L38 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M4 16 H44" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: 6, index: '06', title: 'Web Development',
    description: 'Fast, accessible, production-grade builds — from marketing sites to full platforms.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <polyline points="14,18 6,24 14,30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="34,18 42,24 34,30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="28" y1="10" x2="20" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 7, index: '07', title: 'Digital Marketing',
    description: 'Data-driven campaigns that build awareness, grow audiences and drive real results.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 30 L8 18 L28 10 L28 38 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M28 20 Q38 24 38 24 Q38 24 28 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M12 30 L14 40 L20 40 L18 30" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 8, index: '08', title: 'Google & Meta Ads',
    description: 'Paid ad strategies on Google and Meta that put your brand in front of the right people.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="4" y="12" width="40" height="26" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M14 28 L14 20 L20 26 L26 18 L32 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="36" cy="24" r="3" fill="currentColor"/>
      </svg>
    ),
  },
];

function ServiceCard({ service, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`reveal ${styles.card}`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={service.title}
    >
      <span className={styles.number}>{service.index}</span>
      <div className={styles.icon}>{service.icon}</div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.description}</p>
      <Link to="/services" className={styles.cardLink}>
        View more <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default function Services() {
  const { openModal } = useContactModal();
  const headerRef = useRef(null);
  const moreRef   = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = moreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} id="services" aria-label="Our Services">
      <div className="container">

        <div className={`section-header reveal ${styles.header}`} ref={headerRef}>
          <span className="section-tag">Our Disciplines</span>
          <h2 className="section-title">
            Everything your brand<br />needs to grow.
          </h2>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={(i % 4) * 80} />
          ))}
        </div>

        {/* "And much more" strip */}
        <div className={`reveal ${styles.moreStrip}`} ref={moreRef}>
          <div className={styles.moreLeft}>
            <span className={styles.moreDots} aria-hidden="true">• • •</span>
            <p className={styles.moreLabel}>And much more — one team, endless range.</p>
          </div>

          <div className={styles.moreActions}>
            <div className={styles.actionButtons}>
              <Link to="/services" className="btn btn--red">
                View All Services →
              </Link>
              <button 
                className="btn btn--red" 
                onClick={() => {
                  console.log('Services button clicked');
                  openModal();
                }}
                type="button"
              >
                Discuss Your Project →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
