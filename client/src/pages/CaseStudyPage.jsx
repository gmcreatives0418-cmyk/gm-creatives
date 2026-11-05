import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styles from './CaseStudyPage.module.css';

const CASE_STUDIES = {
  'brand-identity': {
    id: 1,
    title: 'Brand Identity System',
    category: 'Brand Identity',
    description: 'Complete visual identity redesign for a tech startup',
    fullDescription: 'We completely redesigned the visual identity for a growing tech startup, creating a cohesive system that works across all touchpoints.',
    overview: 'A tech startup was struggling with an outdated brand identity that didn\'t reflect their innovative nature. They needed a complete visual system that could scale across all platforms and communicate professionalism to enterprise clients.',
    challenge: 'The startup had outgrown their initial branding. Their current identity looked dated, was inconsistently applied, and didn\'t communicate their innovative approach. They needed something that would stand out in a competitive market.',
    solution: 'We conducted extensive brand research and competitor analysis. We created a modern, versatile logo system, developed a carefully chosen color palette, established typography hierarchy, and created comprehensive 50-page brand guidelines.',
    approach: [
      'Research: Market analysis, competitor benchmarking, audience research',
      'Strategy: Brand positioning, messaging framework, visual direction',
      'Design: Logo development, color system, typography, iconography',
      'Documentation: 50-page brand guidelines with usage examples'
    ],
    results: [
      'Increased brand recognition by 45% in their target market',
      'Successfully implemented across 20+ platforms and touchpoints',
      'Improved customer perception with 78% saying they look "more professional"',
      'New brand used in successful Series A fundraising presentation'
    ],
    tags: ['Logo Design', 'Brand Guidelines', 'Color System', 'Typography'],
    testimonial: '"Their brand identity has completely transformed how we\'re perceived in the market. Clients immediately notice the professionalism. It\'s been instrumental in our growth."',
    testimonialAuthor: 'CEO, Tech Startup',
  },
  'ecommerce-redesign': {
    id: 2,
    title: 'E-Commerce Platform Redesign',
    category: 'Web Design & Development',
    description: 'Full-stack redesign of e-commerce platform',
    fullDescription: 'Complete redesign and development of an e-commerce platform, improving UX, performance, and conversion rates.',
    overview: 'An established e-commerce store was losing customers due to a slow, outdated platform with poor user experience. Their checkout abandonment rate was critically high at 68%, and mobile performance was particularly poor.',
    challenge: 'The existing platform was built on legacy technology, resulting in slow load times (average 8 seconds). The checkout process was confusing with 7+ steps, and the design wasn\'t mobile-friendly. Customers were leaving at every stage of the funnel.',
    solution: 'We completely redesigned the platform with modern UX principles and rebuilt the backend for performance. We streamlined checkout to 3 steps, optimized all images, implemented lazy loading, and ensured mobile-first design.',
    approach: [
      'Audit: Analyzed current performance, identified pain points, analyzed user behavior',
      'Design: Created wireframes, prototypes, user flows for improved checkout',
      'Development: Built responsive frontend, optimized backend, integrated payment systems',
      'Testing: Conducted A/B testing, load testing, and user acceptance testing'
    ],
    results: [
      '40% faster average load times (from 8s to 4.8s)',
      '35% increase in conversion rates (5% → 6.75%)',
      '52% reduction in bounce rate across all pages',
      '68% → 28% checkout abandonment improvement'
    ],
    tags: ['Web Design', 'Frontend Dev', 'Backend Development', 'UX Optimization'],
    testimonial: '"Not only does our store look and perform better, but we\'re making significantly more sales. The ROI was recovered in just 3 months."',
    testimonialAuthor: 'Founder, E-Commerce Store',
  },
  'social-media-campaign': {
    id: 3,
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    description: 'Strategic social media campaign for product launch',
    fullDescription: 'Strategic social media campaign that generated significant engagement and brand awareness for a product launch.',
    overview: 'A SaaS company was launching a new product into a crowded market. They needed to create buzz, generate awareness, and drive early adoption among their target audience.',
    challenge: 'The product launch was in a highly competitive space with low organic reach. The company had limited marketing budget and needed to maximize impact quickly.',
    solution: 'We created a multi-platform strategy combining organic content, influencer partnerships, paid ads, and community engagement. We produced daily content and secured 5 micro-influencer partnerships.',
    approach: [
      'Strategy: Audience research, competitor analysis, content calendar planning',
      'Content: Created 90+ pieces of social media content across 4 platforms',
      'Partnerships: Identified and partnered with 5 relevant micro-influencers',
      'Campaigns: Ran targeted paid ads with continuous optimization'
    ],
    results: [
      '250K impressions in the first month',
      '15K engaged followers acquired (2,500+ per week)',
      '8.5% engagement rate (industry average: 3%)',
      '32K website clicks and 8,000+ qualified leads'
    ],
    tags: ['Social Media', 'Content Strategy', 'Design', 'Campaign Management'],
    testimonial: '"The campaign exceeded all our expectations. We reached our quarterly lead goals in the first month."',
    testimonialAuthor: 'Marketing Manager, SaaS Company',
  },
  'motion-graphics': {
    id: 4,
    title: 'Motion Graphics Series',
    category: 'Motion Design',
    description: 'Animated explainer videos for product launches',
    fullDescription: 'Series of professional animated explainer videos and motion graphics for multiple product launches.',
    overview: 'A B2B software company had complex technical products that were difficult for customers to understand. They needed engaging video content to explain features.',
    challenge: 'Complex technical products with 20+ features needed to be explained in a format that held attention. Traditional documentation wasn\'t working.',
    solution: 'We created a series of 5 professional explainer videos with custom animations, professional voiceovers, and clear messaging.',
    approach: [
      'Scripting: Created clear, concise scripts explaining complex features',
      'Storyboarding: Developed visual storyboards for each scene',
      'Animation: Created custom 2D animations with smooth transitions',
      'Sound: Added professional voiceover and background music'
    ],
    results: [
      '60% increase in viewer engagement with product pages',
      '2.5M total video views across all platforms',
      '89% video completion rate (significantly above industry average)',
      'Integrated into product documentation, website, and onboarding'
    ],
    tags: ['Animation', 'Video Production', 'Motion Graphics', 'Explainer Videos'],
    testimonial: '"The videos perfectly capture what our product does. Customers are much happier with onboarding."',
    testimonialAuthor: 'Product Lead, B2B Software',
  },
  'saas-dashboard': {
    id: 5,
    title: 'SaaS Dashboard UI',
    category: 'UI / UX Design',
    description: 'Modern dashboard interface for financial software',
    fullDescription: 'Designed a comprehensive dashboard for a SaaS financial application with real-time data visualization.',
    overview: 'A financial services company needed a modern dashboard that could display complex financial data in an intuitive way. Users spent hours learning the existing interface.',
    challenge: 'Complex financial data needed visualization without sacrificing information density. The interface needed to be powerful for experts yet accessible for new users.',
    solution: 'We designed a clean, modular dashboard with customizable widgets, real-time charts, and intuitive navigation with a custom dashboard builder.',
    approach: [
      'Research: Conducted user interviews with 20+ users, analyzed usage patterns',
      'Design: Created wireframes, prototypes, and design systems',
      'User Testing: Conducted 5 rounds of user testing with iterations',
      'Implementation: Worked with developers on integration and performance'
    ],
    results: [
      'User satisfaction score: 4.8/5 (previous: 2.1/5)',
      '40% reduction in time to complete typical tasks',
      'Zero critical UX issues reported in first year',
      'Used as industry reference case for dashboard design'
    ],
    tags: ['UI Design', 'UX Research', 'Dashboard', 'Data Visualization'],
    testimonial: '"Your dashboard is the most intuitive financial interface I\'ve used. My team loves it."',
    testimonialAuthor: 'CFO, Financial Services',
  },
  'google-ads': {
    id: 6,
    title: 'Google Ads Campaign',
    category: 'Google & Meta Ads',
    description: 'High-performing Google Ads campaign',
    fullDescription: 'Strategic Google Ads campaign that delivered exceptional ROI and lead generation.',
    overview: 'A B2B agency wanted to increase qualified leads but was struggling with rising ad costs and poor campaign performance. Previous campaigns generated low-quality leads.',
    challenge: 'High competition meant rising CPC. Previous campaigns had CPA over $150 with low-quality leads. They needed to reduce CPA while improving quality.',
    solution: 'We performed comprehensive keyword research identifying 200+ high-intent keywords. We created benefit-focused ad copy, built optimized landing pages, and implemented sophisticated bid strategies.',
    approach: [
      'Research: Keyword analysis, competitor analysis, audience research',
      'Strategy: Bid strategy development, audience segmentation',
      'Creation: 24 ad variations, 12 landing pages, continuous testing',
      'Optimization: Weekly optimization based on performance data'
    ],
    results: [
      '3.5X ROAS (return on ad spend)',
      '250% increase in qualified leads (from 50 to 175 per month)',
      '62% reduction in cost per acquisition (from $150 to $57)',
      'Scaled to 6-figure monthly budget with consistent 3.5X ROAS'
    ],
    tags: ['PPC', 'Google Ads', 'Lead Generation', 'Conversion Optimization'],
    testimonial: '"Finally, an agency that understands how to run profitable ads. Our CEO is very happy."',
    testimonialAuthor: 'Marketing Director, B2B Agency',
  },
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const caseStudy = CASE_STUDIES[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!caseStudy) {
    return (
      <section className={styles.notFound}>
        <div className="container">
          <h1>Case Study Not Found</h1>
          <p>The case study you're looking for doesn't exist.</p>
          <button className="btn btn--red" onClick={() => navigate('/work')}>
            Back to Work
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={`reveal ${styles.heroContent}`} ref={headerRef}>
            <span className="section-tag">{caseStudy.category}</span>
            <h1 className={styles.heroTitle}>{caseStudy.title}</h1>
            <p className={styles.heroSubtitle}>{caseStudy.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.overviewSection}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <div className={`reveal ${styles.overviewContent}`}>
              <h2>The Overview</h2>
              <p className={styles.overviewText}>{caseStudy.overview}</p>
            </div>
            <div className={`reveal ${styles.overviewStats}`} style={{ transitionDelay: '100ms' }}>
              <div className={styles.statGroup}>
                <span className={styles.statLabel}>Category</span>
                <p className={styles.statValue}>{caseStudy.category}</p>
              </div>
              <div className={styles.statGroup}>
                <span className={styles.statLabel}>Services</span>
                <p className={styles.statValue}>{caseStudy.tags.slice(0, 2).join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className={styles.challengeSection}>
        <div className="container">
          <div className={`reveal ${styles.sectionContent}`}>
            <div className={styles.sectionIcon}>❌</div>
            <h2>The Challenge</h2>
            <p className={styles.sectionDescription}>{caseStudy.challenge}</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.solutionSection}>
        <div className="container">
          <div className={`reveal ${styles.sectionContent}`}>
            <div className={styles.sectionIcon}>✨</div>
            <h2>Our Solution</h2>
            <p className={styles.sectionDescription}>{caseStudy.solution}</p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className={styles.approachSection}>
        <div className="container">
          <div className={`reveal ${styles.approachHeader}`}>
            <h2>Our Approach</h2>
            <p>Here's how we tackled this project, step by step.</p>
          </div>
          <div className={styles.approachList}>
            {caseStudy.approach.map((step, i) => (
              <div key={i} className={`reveal ${styles.approachItem}`} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className={styles.approachNumber}>{i + 1}</div>
                <p className={styles.approachText}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className={styles.resultsSection}>
        <div className="container">
          <div className={`reveal ${styles.resultsHeader}`}>
            <h2>The Results</h2>
            <p>Measurable impact and real outcomes.</p>
          </div>
          <div className={styles.resultsList}>
            {caseStudy.results.map((result, i) => (
              <div key={i} className={`reveal ${styles.resultItem}`} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className={styles.resultIcon}>📊</div>
                <p>{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <div className={`reveal ${styles.testimonialBox}`}>
            <p className={styles.testimonialText}>{caseStudy.testimonial}</p>
            <p className={styles.testimonialAuthor}>— {caseStudy.testimonialAuthor}</p>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className={styles.tagsSection}>
        <div className="container">
          <div className={`reveal ${styles.tagsBox}`}>
            <h3>Services Used</h3>
            <div className={styles.tags}>
              {caseStudy.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to work on your project?</h2>
            <p>Let's create something amazing together.</p>
            <button className="btn btn--white" onClick={() => navigate('/contact')}>
              Start a Project →
            </button>
          </div>
        </div>
      </section>

      {/* Back to Work */}
      <section className={styles.backSection}>
        <div className="container">
          <button className={styles.backBtn} onClick={() => navigate('/work')}>
            ← Back to All Work
          </button>
        </div>
      </section>
    </>
  );
}
