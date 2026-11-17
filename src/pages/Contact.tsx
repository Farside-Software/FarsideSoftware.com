import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PageHeader from '../components/PageHeader';
import ScrollToTop from '../components/ScrollToTop';
import LiquidGlass from '../components/LiquidGlass';
import GlassButton from '../components/GlassButton';
import { useRouteMeta } from '../hooks';
import { CONTACT_EMAIL } from '../config/site';
import { accentText } from '../theme/contrast';


export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Set after mount so the prerendered HTML and hydration agree.
  const [ts, setTs] = useState('0');
  useEffect(() => setTs(String(Date.now())), []);

  useRouteMeta({ accentColor: '#FF7A3D' });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const website = String(formData.get('website') || '');
    const ts = Number(formData.get('ts') || 0);
    const tooFast = Date.now() - ts < 3000;

    if (website.trim().length > 0 || tooFast) {
      setState('sent');
      return;
    }

    setState('sending');

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE!,
        import.meta.env.VITE_EMAILJS_TEMPLATE!,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC!
      )
      .then(() => setState('sent'))
      .catch(() => setState('error'));
  }

  const rowLink =
    'group relative flex items-center justify-between gap-4 text-xl font-extrabold tracking-[-0.02em] text-ink transition-colors after:absolute after:inset-0';

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Support and press"
        lead={
          <>
            Stuck in one of the apps, found a bug, or writing a story? Send a message below or email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-link underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            . For the quickest fixes, check the{' '}
            <Link to="/support" className="text-link underline underline-offset-4">
              support page
            </Link>{' '}
            first; press materials live in the{' '}
            <Link to="/press" className="text-link underline underline-offset-4">
              press kit
            </Link>
            .
          </>
        }
      >
        <p
          className="inline-flex items-center gap-2 rounded-full border border-line/20 px-3 py-1.5 text-sm font-medium"
          style={{ color: accentText('#16A34A') }}
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Replies from the developer, usually within a day or two
        </p>
      </PageHeader>

      <section className="border-b border-line/10 bg-well py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="list-none p-0">
              <li className="relative border-t border-line/10 py-6 transition-colors hover:bg-line/[0.04]">
                <a href={`mailto:${CONTACT_EMAIL}`} className={rowLink}>
                  {CONTACT_EMAIL}
                  <ArrowRight size={20} className="shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </li>
              <li className="relative border-t border-line/10 py-6 transition-colors hover:bg-line/[0.04]">
                <Link to="/support" className={rowLink}>
                  Support page
                  <ArrowRight size={20} className="shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
              <li className="relative border-y border-line/10 py-6 transition-colors hover:bg-line/[0.04]">
                <Link to="/press" className={rowLink}>
                  Press kit
                  <ArrowRight size={20} className="shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line/10 bg-panel p-6 sm:p-10">
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="relative space-y-8"
                    >
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <input type="hidden" name="ts" value={ts} />

                    {/* Name & Email */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-muted">
                          Your name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          className="w-full rounded-xl border border-line/20 bg-well px-4 py-3 text-base text-ink placeholder:text-muted/70 outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20"
                          placeholder="Jane Doe"
                          required
                          autoComplete="name"
                          disabled={state === 'sending'}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-muted">
                          Email address
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          className="w-full rounded-xl border border-line/20 bg-well px-4 py-3 text-base text-ink placeholder:text-muted/70 outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20"
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                          disabled={state === 'sending'}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-muted">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={7}
                        className="w-full resize-y rounded-xl border border-line/20 bg-well px-4 py-3 text-base text-ink placeholder:text-muted/70 outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20"
                        placeholder="Which app, which device, and what happened? Screenshots are welcome by email."
                        required
                        disabled={state === 'sending'}
                      />
                      <p className="mt-2 text-xs text-muted/70">
                        I typically respond within 1–2 business days.
                      </p>
                    </div>

                    <input type="hidden" name="X-Priority" value="1 (Highest)" />

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs text-muted">
                        By sending, you agree to be contacted about your inquiry.
                      </p>
                      <GlassButton
                        type="submit"
                        size="md"
                        disabled={state === 'sending'}
                      >
                        {state === 'sending' ? (
                          <>
                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                            <span role="status" aria-live="polite">Sending…</span>
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </GlassButton>
                    </div>

                    {/* Status banners */}
                    <div aria-live="polite" className="space-y-3">
                      {state === 'sent' && (
                        <LiquidGlass
                          variant="card"
                          accentColor="#16A34A"
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
                          style={{ color: accentText('#16A34A') }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M16.704 5.29a1 1 0 00-1.408-1.418L8 11.168 4.704 7.87A1 1 0 103.296 9.29l4 4a1 1 0 001.408 0l8-8z" clipRule="evenodd" />
                          </svg>
                          Message sent. I'll reply by email soon.
                        </LiquidGlass>
                      )}
                      {state === 'error' && (
                        <LiquidGlass
                          variant="card"
                          accentColor="#DC2626"
                          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
                          style={{ color: accentText('#DC2626') }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.585c.74 1.316-.213 2.966-1.743 2.966H3.482c-1.53 0-2.483-1.65-1.743-2.966L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd" />
                          </svg>
                          Oops — something went wrong. Please try again.
                        </LiquidGlass>
                      )}
                    </div>
                    </form>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
