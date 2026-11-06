import { useEffect, useRef, useState } from 'react';
import { useContactModal } from '../contexts/ContactModalContext';
import styles from './Stats.module.css';

const STATS = [
  { value: 40,  suffix: '+', label: 'Brands Served',      desc: 'Across retail, food, tech, education and more' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', desc: 'Measured across every completed project'       },
  { value: 10,   suffix: '+', label: 'Years Experience',    desc: 'Delivering brand and digital excellence'       },
  { value: 200, suffix: '+', label: 'Projects Delivered',  desc: 'From logos to full digital platforms'          },
];

/** Animates a number from 0 → target when active */
function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let rafId;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, duration]);

  return count;
}

function StatItem({ stat, active, index }) {
  const count = useCounter(stat.value, 1600, active);
  const ref   = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${styles.item}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={styles.value}>
        {count}<span className={styles.suffix}>{stat.suffix}</span>
      </div>
      <div className={styles.label}>{stat.label}</div>
      <p className={styles.desc}>{stat.desc}</p>
    </div>
  );
}

export default function Stats() {
  const { openModal } = useContactModal();
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);

  const handleClick = () => {
    console.log('Stats button clicked');
    openModal();
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} aria-label="Our numbers">
      <div className="container">

        <div className={styles.inner}>
          {/* Left — heading */}
          <div className={styles.heading}>
            <span className="section-tag">By The Numbers</span>
            <h2 className={styles.title}>
              Results that<br />speak for themselves.
            </h2>
            <p className={styles.sub}>
              We measure success by the growth of the brands we work with —
              not just the work we deliver.
            </p>
            <button
              className="btn btn--red"
              onClick={handleClick}
              type="button"
            >
              Start Your Project →
            </button>
          </div>

          <div className={styles.grid}>
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} active={active} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
