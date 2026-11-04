import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './AboutPage.module.css';

const TEAM_VALUES = [
  {
    icon: '🎯',
    title: 'Design Excellence',
    description: 'We believe in creating work that looks beautiful and performs flawlessly. Every pixel, every line of code, every decision matters.',
  },
  {
    icon: '🤝',
    title: 'Partnership',
    description: 'We don\'t just take briefs—we become an extension of your team. Your success is our success, and we\'re invested in the long term.',
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'We stay ahead of trends and technologies. Always learning, always exploring new ways to solve problems and exceed expectations.',
  },
  {
    icon: '💡',
    title: 'Strategy First',
    description: 'Beautiful design without strategy is art. We ground every project in research, data, and clear business objectives.',
  },
];

const TEAM_STATS = [
  { number: '50+', label: 'Projects Completed' },
  { number: '8', label: 'Disciplines' },
  { number: '100%', label: 'Client Satisfaction' },
  { number: '24hr', label: 'Response Time' },
];

function ValueCard({ value, index }) {
  const ref = useScrollReveal({ rootMargin: '0px 0px -100px 0px' });

  return (
    <div
      ref={ref}
      className={`reveal ${styles.valueCard}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={styles.valueIcon}>{value.icon}</div>
      <h3 className={styles.valueTitle}>{value.title}</h3>
      <p className={styles.valueDesc}>{value.description}</p>
    </div>
  );
}

function StatBox({ stat, index }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${styles.statBox}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.statNumber}>{stat.number}</div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useScrollReveal();
  const storyRef = useScrollReveal();
  const valuesRef = useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={`reveal ${styles.heroContent}`} ref={heroRef}>
            <span className="section-tag">About Us</span>
            <h1 className={styles.heroTitle}>
              Design. Build. Grow.<br />
              <span className="text-red-stroke">Eight Disciplines, One Vision.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              We're a creative team obsessed with delivering exceptional work that drives real business results.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={`reveal ${styles.storyText}`} ref={storyRef}>
              <span className="section-tag">Our Story</span>
              <h2 className={styles.storyTitle}>
                Born from a passion for<br />
                <span className={styles.redText}>creative excellence</span>
              </h2>
              <p className={styles.storyPara}>
                GM Creatives was founded on a simple belief: great design and development should work together seamlessly. We saw too many projects fail because teams weren't communicating, and disciplines weren't integrated.
              </p>
              <p className={styles.storyPara}>
                We decided to build something different. A studio where brand strategists, designers, developers, and marketers sit at the same table. Where every project benefits from eight combined perspectives and disciplines.
              </p>
              <p className={styles.storyPara}>
                Today, we partner with ambitious brands to create cohesive digital experiences that don't just look beautiful—they drive growth.
              </p>
            </div>

            <div className={styles.statsGrid}>
              {TEAM_STATS.map((stat, i) => (
                <StatBox key={i} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className="container">
          <div className={`reveal ${styles.valuesHeader}`} ref={valuesRef}>
            <span className="section-tag">Our Values</span>
            <h2 className={styles.valuesTitle}>
              What drives everything we do
            </h2>
          </div>

          <div className={styles.valuesGrid}>
            {TEAM_VALUES.map((value, i) => (
              <ValueCard key={i} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChoose}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={`reveal ${styles.whyContent}`}>
              <span className="section-tag">Why Work With Us</span>
              <h2 className={styles.whyTitle}>
                We deliver more than<br />
                <span className={styles.redText}>just design</span>
              </h2>
              <ul className={styles.whyList}>
                <li>Integrated team approach across all 8 disciplines</li>
                <li>Custom solutions tailored to your business goals</li>
                <li>Data-driven decision making on every project</li>
                <li>Transparent communication & regular updates</li>
                <li>Fast turnaround without compromising quality</li>
                <li>Long-term partnership mentality</li>
              </ul>
            </div>

            <div className={`reveal ${styles.whyVisual}`}>
              <div className={styles.featureBox}>
                <div className={styles.featureCircle1} />
                <div className={styles.featureCircle2} />
                <div className={styles.featureText}>
                  <span className={styles.featureNumber}>8</span>
                  <span className={styles.featureLabel}>Disciplines</span>
                  <span className={styles.featureSub}>One Unified Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to work with us?</h2>
            <p>Let's discuss your project and how we can help your brand grow.</p>
            <a href="#contact" className="btn btn--white" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              Start a Conversation →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
