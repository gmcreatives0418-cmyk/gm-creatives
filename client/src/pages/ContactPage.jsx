import { useState, useRef, useEffect } from 'react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ContactPage.module.css';

const SERVICES = [
  'Brand Identity',
  'Graphic Design',
  'Motion Design',
  'UI / UX Design',
  'Web Design',
  'Web Development',
  'Digital Marketing',
  'Google & Meta Ads',
  'Full Package',
  'Other',
];

const BUDGET_RANGES = [
  'Under ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000 - ₹5,00,000',
  '₹5,00,000+',
];

const CONTACT_INFO = [
  {
    icon: '📧',
    label: 'Email',
    value: 'gmcreatives0418@gmail.com',
    link: 'mailto:gmcreatives0418@gmail.com',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+91 884 737 8590',
    link: 'tel:+15551234567',
  },
  {
    icon: '⏰',
    label: 'Response Time',
    value: 'Within 24 hours',
    link: '#',
  },
];

const INITIAL = { name: '', email: '', service: '', budget: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
    <polyline
      points="16,24 21,30 32,18"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

function InfoCard({ info, index }) {
  const ref = useScrollReveal();

  return (
    <a
      ref={ref}
      href={info.link}
      className={`reveal ${styles.infoCard}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.infoIcon}>{info.icon}</div>
      <div className={styles.infoContent}>
        <h3 className={styles.infoLabel}>{info.label}</h3>
        <p className={styles.infoValue}>{info.value}</p>
      </div>
    </a>
  );
}

export default function ContactPage() {
  const { closeModal } = useContactModal();
  const lastSubmitTimeRef = useRef(0);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const headerRef = useScrollReveal();

  // Close modal when user visits contact page
  useEffect(() => {
    closeModal();
    window.scrollTo(0, 0);
  }, [closeModal]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const limits = { name: 100, email: 254, message: 2000 };
    if (limits[name] && value.length > limits[name]) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Rate limiting: prevent multiple submissions within 60 seconds
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTimeRef.current;
    if (timeSinceLastSubmit < 60000) { // 60 seconds
      const secondsLeft = Math.ceil((60000 - timeSinceLastSubmit) / 1000);
      setErrors({ submit: `Please wait ${secondsLeft}s before submitting again.` });
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setErrors({});
      }, 3000);
      return;
    }

    setStatus('submitting');
    lastSubmitTimeRef.current = now;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL ;
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: '',
          service: form.service,
          budget: form.budget,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        console.error('Error:', data);
        // Check if it's a rate limit error from backend
        if (response.status === 429) {
          setErrors({ submit: 'Too many submissions. Please try again later.' });
        } else {
          setErrors({ submit: data.error || 'Failed to send message' });
        }
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrors({ submit: 'Network error. Please check your connection.' });
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={`reveal ${styles.heroContent}`} ref={headerRef}>
            <span className="section-tag">Get in Touch</span>
            <h1 className={styles.heroTitle}>
              Let's create<br />
              <span className="text-red-stroke">something remarkable together.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Have a project in mind? We'd love to hear from you. Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            {CONTACT_INFO.map((info, i) => (
              <InfoCard key={i} info={info} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formWrapper}>
            <div className={`reveal ${styles.formHeader}`}>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <p className={styles.formSubtitle}>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            {status === 'success' ? (
              <div className={styles.success} role="status" aria-live="polite">
                <CheckIcon />
                <h3>Message Received!</h3>
                <p>Thanks for reaching out. We'll review your message and get back to you soon.</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
                  <button className="btn btn--red" onClick={() => setStatus('idle')}>
                    Send Another Message
                  </button>
                  <button className="btn btn--white" style={{ border: '2px solid #A31621', color: '#A31621' }} onClick={() => setStatus('idle')}>
                    Back to Form
                  </button>
                </div>
              </div>
            ) : status === 'error' ? (
              <div className={styles.error} role="status" aria-live="polite" style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fee', borderRadius: '8px' }}>
                <h3 style={{ color: '#c00', marginBottom: '10px' }}>Oops, something went wrong</h3>
                <p style={{ marginBottom: '20px' }}>{errors.submit || 'We couldn\'t send your message. Please try again.'}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button className="btn btn--red" onClick={() => setStatus('idle')}>
                    Try Again
                  </button>
                  <button className="btn btn--white" style={{ border: '2px solid #A31621', color: '#A31621' }} onClick={() => setStatus('idle')}>
                    Back to Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      aria-label="Your Name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      className={errors.name ? styles.inputError : ''}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span id="err-name" className={styles.error} role="alert">{errors.name}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      aria-label="Email Address"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      className={errors.email ? styles.inputError : ''}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span id="err-email" className={styles.error} role="alert">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="service">Service of Interest</label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      aria-label="Service you're interested in"
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="budget">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      aria-label="Budget range"
                    >
                      <option value="">Select budget</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    value={form.message}
                    onChange={handleChange}
                    aria-label="Project details"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                    className={errors.message ? styles.inputError : ''}
                  />
                  {errors.message && (
                    <span id="err-message" className={styles.error} role="alert">{errors.message}</span>
                  )}
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className="btn btn--red"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <><span className="spinner" aria-hidden="true" /> Sending…</>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                  <p className={styles.privacyNote}>
                    We respect your privacy. Your information will only be used to contact you about your project.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={`reveal ${styles.faqHeader}`}>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqGrid}>
            <div className={`reveal ${styles.faqItem}`}>
              <h3>What's your typical project timeline?</h3>
              <p>Most projects take 4-12 weeks depending on scope and complexity. We'll provide a detailed timeline during our initial consultation.</p>
            </div>
            <div className={`reveal ${styles.faqItem}`} style={{ transitionDelay: '50ms' }}>
              <h3>Do you work with startups?</h3>
              <p>Absolutely! We love working with startups and early-stage companies. We offer flexible packages to fit different budgets.</p>
            </div>
            <div className={`reveal ${styles.faqItem}`} style={{ transitionDelay: '100ms' }}>
              <h3>What's your process?</h3>
              <p>We start with discovery and strategy, move to design and development, then testing and deployment. You're involved at every step.</p>
            </div>
            <div className={`reveal ${styles.faqItem}`} style={{ transitionDelay: '150ms' }}>
              <h3>Can you work with our existing team?</h3>
              <p>Yes! We're great at collaborating with in-house teams, other agencies, and freelancers. Communication is key to our success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to start your project?</h2>
            <p>Submit the form above or reach out directly. We'll respond within 24 hours.</p>
          </div>
        </div>
      </section>
    </>
  );
}
