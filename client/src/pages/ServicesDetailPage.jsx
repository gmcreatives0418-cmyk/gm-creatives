import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContactModal } from '../contexts/ContactModalContext';
import styles from './ServicesDetailPage.module.css';

const SERVICES_DETAIL = [
  {
    id: 1,
    index: '01',
    title: 'Brand Identity',
    tagline: 'Visual Language That Lasts',
    description: 'We create complete brand identities that tell your story across every touchpoint. From logo and color systems to typography and guidelines, we build visual systems that hold up everywhere.',
    benefits: [
      'Consistent brand presence across all channels',
      'Memorable visual identity that stands out',
      'Professional brand guidelines for scaling',
      'Emotional connection with your audience',
    ],
    deliverables: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Icon Sets', 'Pattern Library'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M16 24 L24 10 L32 24 L24 38 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    index: '02',
    title: 'Graphic Design',
    tagline: 'Design That Communicates',
    description: 'Strategic, beautiful design work that brings your message to life. From social campaigns to print materials, we create visuals that engage, inspire, and convert.',
    benefits: [
      'Eye-catching social media content',
      'Professional print collateral',
      'Consistent visual storytelling',
      'Increased audience engagement',
    ],
    deliverables: ['Social Graphics', 'Print Design', 'Posters', 'Brochures', 'Packaging', 'Illustrations'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M6 18 H42" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M18 18 V42" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: 3,
    index: '03',
    title: 'Motion Design',
    tagline: 'Movement That Matters',
    description: 'Animated sequences that capture attention and drive engagement. From logo animations to full video productions, we bring dynamism to your brand story.',
    benefits: [
      'Higher engagement rates with video content',
      'Professional brand animations',
      'Memorable storytelling through motion',
      'Competitive edge in saturated markets',
    ],
    deliverables: ['Logo Animation', 'Motion Graphics', 'Explainer Videos', 'Social Animations', 'Video Editing', '3D Motion'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 24 C10 15 20 8 24 8 C28 8 38 15 38 24 C38 33 28 40 24 40 C20 40 10 33 10 24Z" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M20 18 L32 24 L20 30 Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 4,
    index: '04',
    title: 'UI / UX Design',
    tagline: 'Design Built for Users',
    description: 'User-centered interfaces that are intuitive, beautiful, and effective. We design digital experiences that users love and businesses measure by results.',
    benefits: [
      'Increased user satisfaction and retention',
      'Higher conversion rates',
      'Reduced bounce rates and errors',
      'Scalable design systems',
    ],
    deliverables: ['Wireframes', 'Prototypes', 'User Research', 'Usability Testing', 'Design Systems', 'Accessibility Audit'],
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
    id: 5,
    index: '05',
    title: 'Web Design',
    tagline: 'Beautiful Web Experiences',
    description: 'Stunning, functional websites that convert visitors into customers. We design for both aesthetics and performance, ensuring every pixel serves a purpose.',
    benefits: [
      'Increased lead generation',
      'Better SEO performance',
      'Mobile-first responsive design',
      'Fast, optimized loading times',
    ],
    deliverables: ['Website Design', 'Landing Pages', 'eCommerce Design', 'CMS Integration', 'Mobile Design', 'Performance Optimization'],
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
    id: 6,
    index: '06',
    title: 'Web Development',
    tagline: 'Code Built to Last',
    description: 'Production-grade web development that scales with your business. From marketing sites to complex platforms, we build fast, secure, and maintainable code.',
    benefits: [
      'Fast, scalable applications',
      'Secure and maintainable codebase',
      'Future-proof technology stack',
      'Seamless integrations and APIs',
    ],
    deliverables: ['Frontend Development', 'Backend Development', 'API Integration', 'Database Design', 'Testing & QA', 'DevOps & Deployment'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <polyline points="14,18 6,24 14,30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="34,18 42,24 34,30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="28" y1="10" x2="20" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 7,
    index: '07',
    title: 'Digital Marketing',
    tagline: 'Growth Through Strategy',
    description: 'Data-driven marketing campaigns that grow your audience and drive real results. We combine strategy, creativity, and analytics to maximize your ROI.',
    benefits: [
      'Increased brand awareness and reach',
      'Higher quality leads and customers',
      'Measurable ROI and analytics',
      'Scalable marketing systems',
    ],
    deliverables: ['Strategy & Planning', 'Content Calendar', 'Social Media Management', 'Email Campaigns', 'Analytics & Reporting', 'Growth Optimization'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 30 L8 18 L28 10 L28 38 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M28 20 Q38 24 38 24 Q38 24 28 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M12 30 L14 40 L20 40 L18 30" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 8,
    index: '08',
    title: 'Google & Meta Ads',
    tagline: 'Paid Advertising That Works',
    description: 'Targeted paid advertising campaigns that reach the right audience at the right time. We optimize every dollar spent for maximum impact and ROI.',
    benefits: [
      'Immediate visibility and traffic',
      'Highly targeted audience reach',
      'Continuous optimization and testing',
      'Clear ROI tracking and reporting',
    ],
    deliverables: ['Campaign Strategy', 'Ad Creative', 'Audience Targeting', 'Bid Optimization', 'A/B Testing', 'Performance Reports'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="4" y="12" width="40" height="26" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M14 28 L14 20 L20 26 L26 18 L32 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="36" cy="24" r="3" fill="currentColor"/>
      </svg>
    ),
  },
];

function ServiceDetail({ service, index }) {
  const ref = useScrollReveal();

  const isEven = index % 2 === 0;

  return (
    <article
      ref={ref}
      className={`reveal ${styles.serviceRow}`}
      style={{ flexDirection: isEven ? 'row' : 'row-reverse' }}
    >
      <div className={styles.serviceVisual}>
        <div className={styles.iconBox}>{service.icon}</div>
      </div>

      <div className={styles.serviceContent}>
        <span className={styles.serviceNumber}>{service.index}</span>
        <h2 className={styles.serviceTitle}>{service.title}</h2>
        <p className={styles.serviceTagline}>{service.tagline}</p>
        <p className={styles.serviceDesc}>{service.description}</p>

        <div className={styles.benefitsSection}>
          <h3 className={styles.sectionTitle}>Key Benefits</h3>
          <ul className={styles.benefitsList}>
            {service.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className={styles.deliverablesSection}>
          <h3 className={styles.sectionTitle}>What You Get</h3>
          <div className={styles.deliverablesTags}>
            {service.deliverables.map((item, i) => (
              <span key={i} className={styles.deliverableTag}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesDetailPage() {
  const { openModal } = useContactModal();
  const headerRef = useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={`reveal ${styles.heroContent}`} ref={headerRef}>
            <span className="section-tag">All Services</span>
            <h1 className={styles.heroTitle}>
              Explore Our Complete<br />Service Offering
            </h1>
            <p className={styles.heroSubtitle}>
              Eight disciplines working as one unified team to grow your brand and business.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.servicesGrid}>
        <div className="container">
          {SERVICES_DETAIL.map((service, i) => (
            <ServiceDetail key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to get started?</h2>
            <p>Let's discuss which services are right for your project and how we can help you grow.</p>
            <a href="#contact" className="btn btn--white" onClick={(e) => {
              e.preventDefault();
              openModal();
            }}>
              Start Your Project →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
