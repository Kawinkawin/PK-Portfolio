import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CONTACT_DETAILS, SOCIAL_LINKS } from '../../config/site';
import { submitContactMessage } from '../../services/contactService';
import { trackEvent } from '../../seo';
import { contactSchema, type ContactFormValues } from './schema';
import './ContactSection.css';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

export function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const resetTimerRef = useRef<number | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== undefined) {
        window.clearTimeout(resetTimerRef.current);
      }
      abortControllerRef.current?.abort();
    };
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus('sending');
    setSubmitError('');

    try {
      await submitContactMessage(values, controller.signal);
      trackEvent('contact_form_submit', { status: 'success' });
      setStatus('sent');

      resetTimerRef.current = window.setTimeout(() => {
        setStatus('idle');
        reset();
      }, 2000);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setStatus('error');
      setSubmitError(
        error instanceof Error ? error.message : 'Unable to send your message. Please try again.'
      );
    }
  };

  return (
    <section
      id="contact"
      className="contact"
      aria-label="Contact Kawin P"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Contact</span>
          <h2 className="section-title">Let&apos;s Connect</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <i className="fas fa-envelope" aria-hidden="true" />
              <h3>Email</h3>
              <a href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a>
            </div>

            <div className="contact-card">
              <i className="fas fa-phone" aria-hidden="true" />
              <h3>Phone</h3>
              <a href={CONTACT_DETAILS.phoneHref}>{CONTACT_DETAILS.phoneDisplay}</a>
            </div>

            <div className="contact-social">
              {SOCIAL_LINKS.map((link) => {
                const isPlaceholder = link.href === '#';
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="social-link"
                    title={link.label}
                    aria-label={link.label}
                    target={isPlaceholder ? undefined : '_blank'}
                    rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                    onClick={(event) => {
                      if (isPlaceholder) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <i className={link.iconClass} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <form
            className="contact-form"
            id="contactForm"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder=" "
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...register('name')}
              />
              <label htmlFor="name">Your Name</label>
              {errors.name && (
                <span className="form-error" role="alert">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder=" "
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
              <label htmlFor="email">Your Email</label>
              {errors.email && (
                <span className="form-error" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <textarea
                id="message"
                placeholder=" "
                aria-invalid={Boolean(errors.message)}
                {...register('message')}
              />
              <label htmlFor="message">Your Message</label>
              {errors.message && (
                <span className="form-error" role="alert">
                  {errors.message.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-full${status === 'sent' ? ' btn-sent' : ''}`}
              disabled={status === 'sending' || status === 'sent'}
            >
              {status === 'sending' && (
                <>
                  <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                  <span>Sending...</span>
                </>
              )}
              {status === 'sent' && (
                <>
                  <i className="fas fa-check" aria-hidden="true" />
                  <span>Message Sent!</span>
                </>
              )}
              {(status === 'idle' || status === 'error') && (
                <>
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane" aria-hidden="true" />
                </>
              )}
            </button>

            {status === 'error' && submitError && (
              <p className="form-submit-error" role="alert">
                {submitError}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
