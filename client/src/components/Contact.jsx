import { useState, useRef, useEffect } from 'react';
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
];

const INITIAL = { name: '', email: '', service: '', message: '' };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('submitting');
    // Simulated submit — swap this for a real API call when backend is ready
    setTimeout(() => {
      setStatus('success');
      setForm(INITIAL);
    }, 1200);
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
