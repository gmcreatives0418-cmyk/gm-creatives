import { useState, useEffect, useRef } from 'react';
import styles from './Services.module.css';

// Service images
import imgBrand     from '../assets/images/brand-identity.png';
import imgGraphic   from '../assets/images/graphic.png';
import imgMotion    from '../assets/images/motion.png';
import imgUiUx      from '../assets/images/ui-ux.png';
import imgWebDesign from '../assets/images/web-design.png';
import imgWebDev    from '../assets/images/web-development.png';
import imgMarketing from '../assets/images/digital.png';
import imgAds       from '../assets/images/ads.png';

const SERVICES = [
  { id: 1, index: '01', title: 'Brand Identity',    description: 'Identities with a point of view, built as systems that hold up everywhere they appear.',   img: imgBrand     },
  { id: 2, index: '02', title: 'Graphic Design',    description: 'Campaigns, social content and print that look like they belong to the same brand.',        img: imgGraphic   },
  { id: 3, index: '03', title: 'Motion Design',     description: 'Motion graphics, logo animation and video that give a brand rhythm.',                      img: imgMotion    },
  { id: 4, index: '04', title: 'UI / UX Design',    description: 'Interfaces that are easy to use and unmistakably yours.',                                  img: imgUiUx      },
  { id: 5, index: '05', title: 'Web Design',        description: 'Websites designed around what visitors need to understand and do.',                        img: imgWebDesign },
  { id: 6, index: '06', title: 'Web Development',   description: 'Fast, accessible, production-grade builds — from marketing sites to full platforms.',      img: imgWebDev    },
  { id: 7, index: '07', title: 'Digital Marketing', description: 'Data-driven campaigns that build awareness, grow audiences and drive real results.',        img: imgMarketing },
  { id: 8, index: '08', title: 'Google & Meta Ads', description: 'Paid ad strategies on Google and Meta that put your brand in front of the right people.',  img: imgAds       },
];

const MORE_TAGS = [
  'SEO Optimisation', 'Email Marketing', 'Content Strategy',
  'Photography', 'Copywriting', 'Social Media Management',
  'eCommerce Design', 'Brand Consulting',
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

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <article
      ref={ref}
      className={`reveal ${styles.card}`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={service.title}
    >
      {/* Image banner */}
      <div className={styles.imgWrap}>
        <img src={service.img} alt={service.title} className={styles.cardImg} loading="lazy" />
        <span className={styles.number}>{service.index}</span>
      </div>

      {/* Content */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDesc}>{service.description}</p>
        <a href="#contact" className={styles.cardLink} onClick={scrollToContact}>
          Get Started <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export default function Services() {
  const [expanded, setExpanded] = useState(false);
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

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

          <div className={`${styles.moreTags} ${expanded ? styles.expanded : ''}`} aria-live="polite">
            {MORE_TAGS.map((tag) => (
              <span key={tag} className={styles.moreTag}>{tag}</span>
            ))}
          </div>

          <div className={styles.moreActions}>
            <button
              className={styles.toggleBtn}
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? 'Show Less ↑' : 'See More Services ↓'}
            </button>
            <a href="#contact" className="btn btn--red" onClick={scrollToContact}>
              Discuss Your Project →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
