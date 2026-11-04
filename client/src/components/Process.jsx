import { useRef, useEffect } from 'react';
import styles from './Process.module.css';

const STEPS = [
  { num: '01', title: 'Discover',   desc: 'Understand the business, the audience and the objective.' },
  { num: '02', title: 'Strategize', desc: 'Define the creative and digital direction.' },
  { num: '03', title: 'Design',     desc: 'Build the visual language and the experience.' },
  { num: '04', title: 'Build',      desc: 'Turn the design into a working digital product.' },
  { num: '05', title: 'Optimise',   desc: 'Refine performance, test results and improve continuously.' },
  { num: '06', title: 'Launch',     desc: 'Deploy, test and refine.' },
];

function ProcessStep({ step, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.15, rootMargin: '0px 0px -32px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${styles.step}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className={styles.stepNum} aria-hidden="true">{step.num}</div>
      <div className={styles.stepBody}>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    </div>
  );
}

export default function Process() {
  const headerRef = useRef(null);

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

  return (
    <section className={styles.section} id="process" aria-label="Our Process">
      <div className="container">

        <div className={`reveal ${styles.header}`} ref={headerRef}>
          <div className={styles.tag}>
            <span className={styles.tagNum}>02</span>
            <span>Process</span>
          </div>
          <h2 className="section-title">How we work.</h2>
          <p className={styles.sub}>
            Six stages, one team. Every project moves through them, scaled to its size.
          </p>
        </div>

        <div className={styles.steps} role="list">
          {STEPS.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
