import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SplitSection from '../components/SplitSection';
import GlassButton from '../components/GlassButton';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { apps } from '../data/apps';
import { CONTACT_EMAIL, LEGAL_NAME, SITE_NAME, SITE_URL } from '../config/site';
import { appStoreLink, siteChannel } from '../utils/appStore';

const SCREENSHOTS = [1, 2, 3];

const companyBlurb =
  LEGAL_NAME + ' is an independent app studio in Indiana, founded in 2025 by Nick Molargik. It builds native Swift and SwiftUI apps for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro, each one started to solve a problem the founder ran into himself. The apps are private by design: most collect no data at all, sync through the user\'s own iCloud, and ship without analytics SDKs or ad networks. Six apps are on the App Store today: Maestro, Opalite, SetDeck, Mygra, Stork, and Waffle.';

const founderLine =
  'Nick Molargik is a senior software engineer and the founder of ' + LEGAL_NAME + '. An electrical engineer by training, he has shipped mobile apps at Sweetwater, V1 Sports, and StreetIQ, and builds the studio\'s apps solo from concept to App Store.';

const chip =
  'inline-flex items-center gap-1.5 rounded-full border border-line/20 px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-line/[0.04] hover:text-ink';
const factRow = 'grid gap-1 border-t border-line/10 py-4 last:border-b sm:grid-cols-[8rem_1fr] sm:gap-6';
const factLabel = 'text-sm font-bold uppercase tracking-[0.14em] text-muted/70';

export default function Press() {
  useRouteMeta();

  return (
    <>
      <PageHeader
        eyebrow="Press"
        title="Press kit"
        lead={
          <>
            Everything you need to write about {SITE_NAME} and its apps. Icons and screenshots may be used
            freely in coverage. Questions, review codes, and interview requests:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-link underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            .
          </>
        }
      />

      <SplitSection id="about-studio" title={<>About {SITE_NAME}</>} tone="well">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{companyBlurb}</p>
      </SplitSection>

      <SplitSection id="founder" title="Founder">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{founderLine}</p>
        <dl className="mt-10">
          <div className={factRow}>
            <dt className={factLabel}>Website</dt>
            <dd>
              <a href={SITE_URL} className="text-link underline underline-offset-4">
                farsidesoftware.com
              </a>
            </dd>
          </div>
          <div className={factRow}>
            <dt className={factLabel}>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-link underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
            </dd>
          </div>
          <div className={factRow}>
            <dt className={factLabel}>Location</dt>
            <dd className="text-muted">Indiana, USA</dd>
          </div>
          <div className={factRow}>
            <dt className={factLabel}>Founded</dt>
            <dd className="tabular-nums text-muted">2025</dd>
          </div>
          <div className={factRow}>
            <dt className={factLabel}>Logo</dt>
            <dd>
              <a href="/press/farside/farside-logo.svg" download className="text-link underline underline-offset-4">
                Logo (SVG)
              </a>{' '}
              ·{' '}
              <a href="/press/farside/farside-logo.png" download className="text-link underline underline-offset-4">
                Logo (PNG)
              </a>{' '}
              ·{' '}
              <a href="/press/farside/farside-icon.png" download className="text-link underline underline-offset-4">
                Icon (PNG)
              </a>
            </dd>
          </div>
        </dl>
      </SplitSection>

      <SplitSection id="app-assets" title="Apps" tone="well">
        <div>
          {apps.map((app) => (
            <article
              key={app.slug}
              id={app.slug}
              aria-labelledby={`press-${app.slug}`}
              className="scroll-mt-24 border-t border-line/10 py-7 last:border-b"
            >
              <div className="flex items-start gap-4">
                <img
                  src={`/press/${app.slug}/icon.png`}
                  alt={`${app.name} app icon`}
                  width={52}
                  height={52}
                  loading="lazy"
                  className="h-[52px] w-[52px] shrink-0 rounded-[14px]"
                />
                <div className="min-w-0 flex-1">
                  <h2 id={`press-${app.slug}`} className="text-xl font-extrabold tracking-[-0.02em] text-ink">
                    {app.storeName}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    <span className="tabular-nums">{app.price}</span> · {app.platforms.join(', ')} · {app.languages.join(', ')}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted">{app.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={`/press/${app.slug}/icon.png`} download={`${app.name}-icon.png`} className={chip}>
                      <Download size={14} aria-hidden="true" /> Icon (1024px PNG)
                    </a>
                    <Link to={app.path} className={chip}>
                      Product page
                    </Link>
                    <a
                      href={appStoreLink(app.appStoreUrl, siteChannel('press'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={chip}
                    >
                      App Store
                    </a>
                  </div>
                  <ul className="mt-5 grid max-w-xl list-none grid-cols-3 gap-3 p-0" aria-label={`${app.name} screenshots`}>
                    {SCREENSHOTS.map((n) => (
                      <li key={n}>
                        <a href={`/press/${app.slug}/screenshot-${n}.webp`} download={`${app.name}-screenshot-${n}.webp`} className="group block">
                          <img
                            src={`/press/${app.slug}/screenshot-${n}.webp`}
                            alt={`${app.name} screenshot ${n}`}
                            loading="lazy"
                            decoding="async"
                            className="h-40 w-full rounded-xl bg-page object-contain transition-colors group-hover:bg-panel"
                          />
                          <span className="mt-1 block text-center text-xs text-muted">Download</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SplitSection>

      <section className="reveal bg-page py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">Need something else?</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">Promo codes, higher-resolution assets, and a founder interview are a short email away.</p>
          <div className="mt-8">
            <GlassButton href={`mailto:${CONTACT_EMAIL}?subject=Press%20inquiry`} size="md">
              Email {CONTACT_EMAIL}
            </GlassButton>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
