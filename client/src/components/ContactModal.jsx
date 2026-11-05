import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useContactModal } from '../contexts/ContactModalContext';
import styles from './ContactModal.module.css';

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

export default function ContactModal() {
  const { isOpen, closeModal, openModal } = useContactModal();
  const location = useLocation();
  const autoOpenedRef = useRef(false);
  const lastSubmitTimeRef = useRef(0);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // Don't auto-open if user is already on contact page
    if (location.pathname !== '/' || autoOpenedRef.current) return;

    const timer = setTimeout(() => {
      autoOpenedRef.current = true;
      openModal();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [location.pathname, openModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeModal]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={styles.backdrop} 
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Close button - OUTSIDE the scrollable content */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
          }}
          aria-label="Close modal"
          title="Close (Esc)"
        >
          ✕
        </button>

        {/* Modal content */}
        <div className={styles.content}>
          {status === 'success' ? (
            <div className={styles.success} role="status" aria-live="polite">
              <CheckIcon />
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
                <button className="btn btn--red" onClick={() => {
                  setStatus('idle');
                  setForm(INITIAL);
                }}>
                  Send Another Message
                </button>
                <button className="btn btn--white" style={{ borderColor: '#A31621', color: '#A31621' }} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          ) : status === 'error' ? (
            <div className={styles.error} role="status" aria-live="polite">
              <h3>Oops, something went wrong</h3>
              <p>{errors.submit || 'We couldn\'t send your message. Please try again.'}</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
                <button className="btn btn--red" onClick={() => setStatus('idle')}>
                  Try Again
                </button>
                <button className="btn btn--white" style={{ borderColor: '#A31621', color: '#A31621' }} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 id="modal-title" className={styles.title}>
                Let's Start a Project
              </h2>
              <p className={styles.subtitle}>Tell us about your project and we'll be in touch within 24 hours.</p>

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

                <div className={styles.row}>
                  <div className={styles.field}>
                    <select
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
                  </div>
                </div>

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
                  className="btn btn--red"
                  disabled={status === 'submitting'}
                  style={{ width: '100%' }}
                >
                  {status === 'submitting' ? (
                    <><span className="spinner" aria-hidden="true" /> Sending…</>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
