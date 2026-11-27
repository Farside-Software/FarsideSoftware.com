import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import GlassButton from '../components/GlassButton';
import { useRouteMeta } from '../hooks';
import icon from '../assets/inktape/icon.png';

const TESTER_EMAIL = 'nick@farsidesoftware.com';

export default function InktapeBeta() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [onApple, setOnApple] = useState(false);

  // Set after mount so the prerendered HTML and hydration agree.
  const [ts, setTs] = useState('0');
  useEffect(() => setTs(String(Date.now())), []);

  useRouteMeta();

  const message = `Inktape TestFlight tester request. Apple Account email: ${email}. Confirmed on an Apple device: yes. Sent from farsidesoftware.com/inktape-beta.`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const website = String(formData.get('website') || '');
    const stamp = Number(formData.get('ts') || 0);
    const tooFast = Date.now() - stamp < 3000;

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

  const ready = email.trim().length > 0 && onApple && state !== 'sending';
  const link = 'text-link underline underline-offset-4';

  return (
    <section className="bg-well px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-md text-center">
        <img src={icon} alt="" width={96} height={96} className="mx-auto h-24 w-24 rounded-[22px]" />
        <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.02em] text-ink">Test Inktape before release</h1>
        <p className="mt-3 text-base text-muted">
          Inktape is an audio notebook for iPhone and iPad. Testers get it early through Apple's TestFlight app.
        </p>

        <div className="mt-8 rounded-3xl border border-line/10 bg-panel p-6 text-left sm:p-8">
          {state === 'sent' ? (
            <div role="status" aria-live="polite" className="space-y-3 text-center">
              <p className="text-lg font-extrabold text-ink">
                Thanks! Keep an eye on your inbox. A TestFlight invite for Inktape will arrive at {email}.
              </p>
              <p className="text-sm text-muted">Install TestFlight from the App Store if you don't have it yet.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input type="hidden" name="ts" value={ts} />
              <input type="hidden" name="name" value="Inktape tester request" />
              <input type="hidden" name="to_email" value={TESTER_EMAIL} />
              <input type="hidden" name="subject" value="Inktape tester request" />
              <input type="hidden" name="message" value={message} />

              <div>
                <label htmlFor="beta-email" className="mb-2 block text-sm font-medium text-ink">
                  Apple Account email
                </label>
                <input
                  id="beta-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-line/20 bg-well px-4 py-3 text-base text-ink placeholder:text-muted/70 outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20"
                  required
                  autoComplete="email"
                  aria-describedby="beta-email-help"
                  disabled={state === 'sending'}
                />
                <p id="beta-email-help" className="mt-2 text-xs text-muted">
                  The email you use for the App Store. TestFlight invites go there.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="beta-apple"
                  type="checkbox"
                  checked={onApple}
                  onChange={(e) => setOnApple(e.target.checked)}
                  required
                  disabled={state === 'sending'}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                />
                <label htmlFor="beta-apple" className="cursor-pointer text-sm text-ink">
                  I'm on an Apple device (iPhone, iPad or Mac)
                </label>
              </div>

              <GlassButton type="submit" size="md" disabled={!ready} className="w-full disabled:cursor-not-allowed disabled:opacity-40">
                {state === 'sending' ? 'Sending…' : 'Request an invite'}
              </GlassButton>

              <div aria-live="polite">
                {state === 'error' && (
                  <p className="text-sm text-ink">
                    That didn't send. Email{' '}
                    <a href={`mailto:${TESTER_EMAIL}`} className={link}>
                      {TESTER_EMAIL}
                    </a>{' '}
                    instead.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
