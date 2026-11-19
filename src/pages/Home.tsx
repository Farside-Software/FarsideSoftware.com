import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Smartphone, Languages } from 'lucide-react';
import GlassButton from '../components/GlassButton';
import HeroScene from '../components/HeroScene';
import Starfield from '../components/Starfield';
import FactStrip from '../components/home/FactStrip';
import FlagshipBand from '../components/home/FlagshipBand';
import CatalogTable from '../components/home/CatalogTable';
import GuideRows from '../components/GuideRows';
import { useRouteMeta } from '../hooks';
import { apps, findApp } from '../data/apps';
import { guideGroups, guidesIn } from '../data/guides.mjs';
import { LEGAL_NAME } from '../config/site';
// The Mac workspace (stage, sections, timeline), so the home page shows the whole app and not just the stage.
import maestroShot from '../assets/maestro/screens/02.webp';
import opaliteShotA from '../assets/opalite/screens/02.webp';
import opaliteShotB from '../assets/opalite/screens/03.webp';
import opaliteShotC from '../assets/opalite/screens/04.webp';
import AppIcon from '../components/AppIcon';

const maestro = findApp('maestro')!;
const opalite = findApp('opalite')!;

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Private by design',
    body:
      'Most of our apps collect no data at all. What you enter stays on your device and in your own iCloud account. No analytics SDKs, no ad networks, nothing sold.',
  },
  {
    icon: Smartphone,
    title: 'Every Apple platform',
    body:
      'Native Swift and SwiftUI on iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro, with one library that syncs between all of them.',
  },
  {
    icon: Languages,
    title: 'Speaks your language',
    body:
      'Each app is localized in four to five languages, including English, Spanish, French, Japanese, German, Dutch, and Norwegian.',
  },
];

const eyebrow = 'text-xs font-bold uppercase tracking-[0.2em] text-muted';
/** Section labels carry the accent; the hero's place line stays quiet. */
const sectionEyebrow = 'text-xs font-bold uppercase tracking-[0.2em] text-accent';
const sectionTitle = 'text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-headline';

export default function Home() {
  useRouteMeta();

  return (
    <>
      {/* Hero. Everything here is in the first paint: nothing fades in. */}
      <section className="relative overflow-hidden bg-page pt-28 lg:pt-32">
        <Starfield className="drift" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 pb-16 lg:grid-cols-12 lg:pb-24">
          <div className="relative z-10 order-2 lg:order-1 lg:col-span-7">
            <p className={eyebrow}>
              {/* Each separator trails its place, so a wrapped line never starts with a slash. */}
              {['Indiana', 'USA', 'Earth', 'Milky Way'].map((place, i, all) => (
                <span key={place} className="inline-block">
                  {place}
                  {i < all.length - 1 && (
                    <span className="mx-2 text-accent/80" aria-hidden="true">
                      /
                    </span>
                  )}
                </span>
              ))}
            </p>
            <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink [text-wrap:balance] sm:text-[4rem] xl:text-[5.25rem]">
              Independent apps for every Apple device<span className="text-signal">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Private by design. Seven apps for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro, built and
              supported by one person.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GlassButton
                href="#apps"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#apps')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore the apps
              </GlassButton>
              <GlassButton to="/about" tone="ghost" size="lg">
                About the studio
              </GlassButton>
            </div>
            <ul className="mt-12 grid w-fit list-none grid-cols-4 gap-x-5 gap-y-4 p-0" aria-label="Apps">
              {apps.slice(0, 7).map((app) => (
                <li key={app.slug}>
                  <Link
                    to={app.path}
                    className="group flex w-[60px] flex-col items-center gap-2 text-xs font-semibold text-muted hover:text-ink"
                  >
                    <AppIcon
                      src={app.icon}
                      darkSrc={app.iconDark}
                      size={56}
                      className="h-14 w-14 rounded-[15px] transition-transform duration-200 group-hover:-translate-y-1"
                    />
                    {app.name}
                  </Link>
                </li>
              ))}
              {/* Eighth spot: what's next. */}
              <li aria-label="More apps coming">
                <div className="flex w-[60px] cursor-default flex-col items-center gap-2 text-xs font-semibold text-muted">
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-[15px] border border-line/20 bg-well text-2xl font-extrabold text-muted"
                  >
                    ?
                  </span>
                  Next
                </div>
              </li>
            </ul>
          </div>

          <div className="relative z-20 order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <HeroScene className="mb-2 mt-4 w-[240px] translate-x-8 sm:w-[320px] sm:translate-x-10 lg:my-0 lg:w-full lg:max-w-[540px] lg:translate-x-0" />
          </div>
        </div>

        <div className="relative border-y border-line/10 bg-well">
          <FactStrip />
        </div>
      </section>

      {/* The catalog: two flagships at full size, then every app in one table. */}
      <div id="apps" className="scroll-mt-16">
        <FlagshipBand app={maestro} kind="Light show studio" shots={[maestroShot]} className="bg-page" />
        <FlagshipBand
          app={opalite}
          kind="Color studio"
          shots={[opaliteShotA, opaliteShotB, opaliteShotC]}
          reverse
          className="bg-well"
        />

        <section aria-labelledby="catalog" className="border-b border-line/10 bg-page py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="reveal mb-12 max-w-3xl">
              <p className={sectionEyebrow}>The catalog</p>
              <h2 id="catalog" className={`mt-4 ${sectionTitle}`}>
                Seven apps. One studio.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Each one started as a problem worth solving for ourselves. Six are on the App Store today, and Backstamp is coming soon to the Mac App Store.
              </p>
            </div>
            <CatalogTable />
          </div>
        </section>
      </div>

      {/* Why Farside */}
      <section aria-labelledby="why" className="border-b border-line/10 bg-well py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className={sectionEyebrow}>The studio</p>
              <h2 id="why" className={`mt-4 ${sectionTitle}`}>
                Why Farside
              </h2>
              <p className="mt-4 text-lg text-muted">
                A one-person studio in Indiana, building the apps we wanted to use ourselves.
              </p>
              <p className="mt-6 text-sm text-muted">
                Read the{' '}
                <Link to="/privacy" className="text-link underline underline-offset-4">
                  privacy policy
                </Link>{' '}
                for the specifics on each app, or visit{' '}
                <Link to="/support" className="text-link underline underline-offset-4">
                  support
                </Link>{' '}
                if you need a hand.
              </p>
            </div>
          </div>
          <ol className="m-0 list-none p-0 lg:col-span-8">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="reveal grid grid-cols-[auto_1fr] gap-x-6 border-t border-line/10 py-9 last:border-b sm:gap-x-10">
                <span className="pt-1 text-sm font-bold tabular-nums text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">
                    <Icon size={26} aria-hidden="true" className="shrink-0 text-muted" />
                    {title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Guides */}
      <section aria-labelledby="guides" className="bg-page py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className={sectionEyebrow}>Guides</p>
              <h2 id="guides" className={`mt-4 ${sectionTitle}`}>
                Plain-language how-tos
              </h2>
              <p className="mt-4 text-lg text-muted">A few for each app. Some work whether or not you ever install one.</p>
            </div>
            <Link
              to="/guides"
              className="group inline-flex items-center gap-1.5 font-bold text-ink underline decoration-line/30 underline-offset-4 hover:decoration-line/70"
            >
              All guides
              <ArrowRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {guideGroups.map((group) => {
              const app = findApp(group.id);
              const all = guidesIn(group.id);
              return (
                <div key={group.id} className="reveal">
                  <h3 className="flex items-center gap-3 text-lg font-extrabold text-ink">
                    {app && <AppIcon src={app.icon} darkSrc={app.iconDark} size={32} loading="lazy" className="h-8 w-8 rounded-lg" />}
                    {group.title}
                  </h3>
                  <GuideRows guides={all.slice(0, 3)} className="mt-4" />
                  {all.length > 3 && (
                    <a href={`/guides#${group.id}`} className="mt-3 inline-block text-sm text-muted underline decoration-line/30 underline-offset-4 hover:text-ink">
                      All {all.length} {group.title} guides
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: LEGAL_NAME,
            alternateName: 'Molargik Software LLC',
            url: 'https://farsidesoftware.com/',
            logo: 'https://farsidesoftware.com/og/default.png',
            founder: { '@type': 'Person', name: 'Nick Molargik' },
            sameAs: ['https://github.com/NMolargik', 'https://www.linkedin.com/in/nicholas-molargik/'],
          }),
        }}
      />
    </>
  );
}
