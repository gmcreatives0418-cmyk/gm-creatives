import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';

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

export default function Contact() {
  const [form,   setForm]   = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const textRef = useRef(null);
  const formRef = useRef(null);

  // Scroll-reveal both columns — each observer properly cleaned up
  useEffect(() => {
    const observers = [textRef, formRef].map((ref) => {
      const el = ref.current;
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())              e.name    = 'Name is required';
    if (!form.email.trim())             e.email   = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) e.email  = 'Enter a valid email';
    if (!form.message.trim())           e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Enforce sensible max lengths to avoid oversized payloads
    const limits = { name: 100, email: 254, message: 2000 };
    if (limits[name] && value.length > limits[name]) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('submitting');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
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
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        console.error('Error:', data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className={styles.section} id="contact" aria-label="Contact us">
      <div className={styles.circle1} aria-hidden="true" />
      <div className={styles.circle2} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>

          {/* Left — text */}
          <div className={`reveal ${styles.text}`} ref={textRef}>
            <span className={styles.eyebrow}>Ready to start?</span>
            <h2 className={styles.title}>
              Let's build something<br />
              <span className="text-white-stroke">remarkable.</span>
            </h2>
            <p>Tell us about your project and we'll get back to you within 24 hours.</p>
          </div>

          {/* Right — form */}
          <div className={`reveal reveal-d2 ${styles.formWrap}`} ref={formRef}>
            {status === 'success' ? (
              <div className={styles.success} role="status" aria-live="polite">
                <CheckIcon />
                <p>Thanks! We'll get back to you within 24 hours.</p>
                <button className="btn btn--white" onClick={() => setStatus('idle')}>
                  Send Another Message
                </button>
              </div>
            ) : status === 'error' ? (
              <div className={styles.error} role="status" aria-live="polite" style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '4px' }}>
                <h3 style={{ color: '#ff0000', marginBottom: '10px' }}>Oops, something went wrong</h3>
                <p style={{ marginBottom: '15px' }}>We couldn't send your message. Please try again.</p>
                <button className="btn btn--white" onClick={() => setStatus('idle')}>
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className={styles.form}>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
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
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
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

                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  aria-label="Service you're interested in"
                >
                  <option value="" disabled>Service you're interested in</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
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

                <div className={styles.field}>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project…"
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

                <button
                  type="submit"
                  className="btn btn--white"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <><span className="spinner" aria-hidden="true" /> Sending…</>
                  ) : (
                    'Send Message →'
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
