import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './WorkPage.module.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Brand Identity System',
    category: 'Brand Identity',
    description: 'Complete visual identity redesign for a tech startup including logo, color system, typography, and brand guidelines.',
    image: '🎨',
    tags: ['Logo Design', 'Brand Guidelines', 'Color System'],
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce Platform Redesign',
    category: 'Web Design & Development',
    description: 'Full-stack redesign of e-commerce platform with improved UX, 40% faster load times, and 35% increase in conversions.',
    image: '🛍️',
    tags: ['Web Design', 'Frontend Dev', 'UX Optimization'],
    featured: true,
  },
  {
    id: 3,
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    description: 'Strategic social media campaign that generated 250K impressions and 15K engaged followers across platforms.',
    image: '📱',
    tags: ['Social Media', 'Content Strategy', 'Design'],
    featured: false,
  },
  {
    id: 4,
    title: 'Motion Graphics Series',
    category: 'Motion Design',
    description: 'Animated explainer videos and motion graphics for product launches, increasing engagement by 60%.',
    image: '🎬',
    tags: ['Animation', 'Video Production', 'Explainers'],
    featured: true,
  },
  {
    id: 5,
    title: 'SaaS Dashboard UI',
    category: 'UI / UX Design',
    description: 'Modern dashboard interface for financial software with real-time data visualization and intuitive controls.',
    image: '📊',
    tags: ['UI Design', 'UX Research', 'Dashboard'],
    featured: false,
  },
  {
    id: 6,
    title: 'Google Ads Campaign',
    category: 'Google & Meta Ads',
    description: 'High-performing Google Ads campaign with 3.5X ROAS and 250% increase in qualified leads.',
    image: '📈',
    tags: ['PPC', 'Google Ads', 'Lead Generation'],
    featured: false,
  },
];

const CATEGORIES = ['All Work', ...new Set(PROJECTS.map(p => p.category))];

function ProjectCard({ project, index }) {
  const ref = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`reveal ${styles.projectCard} ${project.featured ? styles.featured : ''}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className={styles.projectImage}>{project.image}</div>
      <div className={styles.projectContent}>
        <span className={styles.category}>{project.category}</span>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <a href="#contact" className={styles.projectLink}>
          View Case Study <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All Work');
  const headerRef = useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeCategory === 'All Work'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={`reveal ${styles.heroContent}`} ref={headerRef}>
            <span className="section-tag">Our Work</span>
            <h1 className={styles.heroTitle}>
              Crafted with precision.<br />
              <span className="text-red-stroke">Delivered with impact.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Explore a selection of our recent projects spanning all eight disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={`reveal ${styles.filterContainer}`}>
            <div className={styles.filters}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projectsSection}>
        <div className="container">
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={`reveal ${styles.statCard}`}>
              <div className={styles.statIcon}>✓</div>
              <h3>50+</h3>
              <p>Projects Successfully Delivered</p>
            </div>
            <div className={`reveal ${styles.statCard}`} style={{ transitionDelay: '100ms' }}>
              <div className={styles.statIcon}>🎯</div>
              <h3>100%</h3>
              <p>Client Satisfaction Rate</p>
            </div>
            <div className={`reveal ${styles.statCard}`} style={{ transitionDelay: '200ms' }}>
              <div className={styles.statIcon}>📈</div>
              <h3>3.5X</h3>
              <p>Average ROI for Clients</p>
            </div>
            <div className={`reveal ${styles.statCard}`} style={{ transitionDelay: '300ms' }}>
              <div className={styles.statIcon}>⭐</div>
              <h3>8</h3>
              <p>Disciplines Under One Roof</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to create something amazing?</h2>
            <p>Let's start your next project and add it to our portfolio.</p>
            <a href="#contact" className="btn btn--white" onClick={scrollToContact}>
              Start Your Project →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
