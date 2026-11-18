import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AppHero from './AppHero';
import BuyBar from './BuyBar';
import ScreensCarousel from './ScreensCarousel';
import FeatureCard from './FeatureCard';
import ScrollToTop from './ScrollToTop';
import DownloadCTA from './DownloadCTA';
import Testimonials from './Testimonials';
import { usePageMeta, useScrollToStart } from '../hooks';
import { apps as allApps, type SiteApp } from '../data/apps';
import { SITE_NAME } from '../config/site';
import { appStoreLink, siteChannel } from '../utils/appStore';
import { findRoute } from '../seo/routes.mjs';
import { guideGroups, guidesIn } from '../data/guides.mjs';
import GuideRows from './GuideRows';
import type { AppPreview } from './AppPreviewVideo';

export interface AppFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AppSection {
  title: ReactNode;
  body: ReactNode;
}

export interface AppShowcaseProps {
  /** Short app name used in alt text, CTA copy, and aria labels. */
  name: string;
  /** Hero heading; defaults to `name`. */
  heading?: string;
  /** One-line hook under the hero heading. */
  tagline: string;
  icon: string;
  accentColor: string;
  /** Head tags; defaults to the route entry in src/seo/routes.mjs when `app` is given. */
  meta?: { title: string; description: string };
  /**
   * Catalog entry (src/data/apps.ts). Supplies the App Store links, price,
   * platforms, promo window, testimonials, and OG image; explicit props below
   * still win when given.
   */
  app?: SiteApp;
  appStoreUrl?: string;
  macAppStoreUrl?: string;
  /** Overrides the catalog price line. */
  price?: string;
  platforms?: string[];
  githubUrl?: string;
  webHref?: string;
  /** Pills under the hero: supported OS versions, hardware, etc. */
  requirements?: string[];
  /** Ordered screenshot URLs (see `screensFromGlob`). */
  screens: string[];
  /**
   * Hero screenshots: `pair` (two portrait, the default), `wide` (one
   * landscape), or `panorama` (two portrait screenshots that form one
   * continuous picture, joined edge to edge).
   */
  heroLayout?: 'pair' | 'wide' | 'panorama';
  /** Tailwind classes for the screenshot band background. */
  screensClassName?: string;
  /** Rendered between the screenshots and the About card. */
  afterScreens?: ReactNode;
  /**
   * App Store preview video. It takes the hero's screenshot slot when its shape
   * matches the hero (portrait with `pair`, landscape with `wide`); otherwise
   * it is the first slide of the screenshot gallery.
   */
  preview?: AppPreview;
  about: {
    title: ReactNode;
    intro: ReactNode;
    sections: AppSection[];
    features: AppFeature[];
    featuresTitle?: string;
    footnote?: ReactNode;
  };
  /** Set to `false` to hide the bottom download card. */
  cta?: { preorder?: boolean } | false;
  /** schema.org SoftwareApplication payload. */
  jsonLd?: Record<string, unknown>;
}

/**
 * The shared layout for every app page: a split hero (claim, price and store
 * badges beside real screenshots), a buy bar that follows the scroll, the
 * screenshot gallery, an optional slot, the About text, a feature grid,
 * reviews, the download card, the other apps, and structured data. Pages
 * only supply content.
 */
export default function AppShowcase({
  name,
  heading,
  tagline,
  icon,
  accentColor,
  meta,
  app,
  appStoreUrl,
  macAppStoreUrl,
  price,
  platforms,
  githubUrl,
  webHref,
  requirements = [],
  screens,
  heroLayout = 'pair',
  screensClassName = 'bg-well',
  afterScreens,
  preview,
  about,
  cta = {},
  jsonLd,
}: AppShowcaseProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const carouselRefDesktop = useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded((prev) => ({ ...prev, [i]: true }));

  const channel = siteChannel(app?.slug ?? name);
  const storeUrl = appStoreUrl ?? app?.appStoreUrl;
  const trackedStoreUrl = storeUrl ? appStoreLink(storeUrl, channel) : undefined;
  const macUrl = macAppStoreUrl ?? app?.macAppStoreUrl;
  const trackedMacUrl = macUrl ? appStoreLink(macUrl, `${channel}_mac`) : undefined;
  const priceLine = price ?? app?.price;
  const platformList = platforms ?? app?.platforms ?? [];

  const route = app ? findRoute(app.path) : undefined;
  const title = meta?.title ?? route?.title ?? name;
  const description = meta?.description ?? route?.description ?? app?.description ?? tagline;

  usePageMeta({
    title,
    description,
    accentColor,
    preloadImage: icon,
    image: app ? `/og/${app.slug}.png` : undefined,
    path: app?.path,
  });

  useScrollToStart(carouselRefDesktop, carouselRefMobile);

  const previewPortrait = !!preview && preview.height > preview.width;
  const previewInHero = !!preview && (heroLayout === 'pair' ? previewPortrait : heroLayout === 'wide' && !previewPortrait);
  // The hero shows the first screenshots unless the preview video took their
  // place; the gallery carries the rest, as long as that still leaves a
  // gallery worth scrolling.
  const lead = previewInHero ? 0 : heroLayout === 'wide' ? 1 : 2;
  const gallery = screens.length - lead >= 3 ? screens.slice(lead) : screens;
  const others = allApps.filter((other) => other.slug !== app?.slug);
  const howTos = app ? guidesIn(app.slug) : [];
  const howToBlurb = guideGroups.find((g) => g.id === app?.slug)?.blurb;

  return (
    <>
      <AppHero
        actionsRef={heroRef}
        name={name}
        heading={heading ?? name}
        tagline={tagline}
        icon={icon}
        accentColor={accentColor}
        price={priceLine}
        priceDetail={price ? undefined : app?.priceDetail}
        promo={app?.promo}
        pills={requirements.length > 0 ? requirements : platformList}
        appStoreHref={trackedStoreUrl}
        macAppStoreHref={trackedMacUrl}
        githubHref={githubUrl}
        webHref={webHref}
        shots={screens}
        layout={heroLayout}
        video={previewInHero ? preview : undefined}
      />

      {trackedStoreUrl && (
        <BuyBar
          watch={heroRef}
          name={name}
          icon={icon}
          price={priceLine}
          accentColor={accentColor}
          appStoreHref={appStoreLink(storeUrl!, `${channel}_bar`)}
        />
      )}

      {(gallery.length > 0 || !!preview) && (
        <section aria-label={`${name} screenshots`} className={`${screensClassName} border-b border-line/10 py-14`}>
          <ScreensCarousel
            slides={gallery}
            loaded={loaded}
            offset={0}
            markLoaded={markLoaded}
            desktopRef={carouselRefDesktop}
            mobileRef={carouselRefMobile}
            altPrefix={name}
            video={preview}
            videoPlacement={previewInHero ? 'belowLg' : 'both'}
            videoAccent={accentColor}
          />
        </section>
      )}

      {afterScreens}

      {howTos.length > 0 && (
        <section aria-labelledby="how-tos" className="border-b border-line/10 bg-well py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="how-tos" className="text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
                {name} how-tos
              </h2>
              {howToBlurb && <p className="mt-4 text-lg text-muted">{howToBlurb}</p>}
            </div>
            <GuideRows guides={howTos} className="reveal lg:col-span-8" />
          </div>
        </section>
      )}

      <section aria-label={`About ${name}`} className="border-b border-line/10 bg-page py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">
              <span aria-hidden="true" className="h-px w-8" style={{ background: accentColor }} />
              About {name}
            </p>
            <h2 className="mt-5 text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink [text-wrap:balance] sm:text-headline">
              {about.title}
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-muted">{about.intro}</p>
          </div>

          <div className="mt-14 grid gap-x-16 lg:grid-cols-2">
            {about.sections.map((section, idx) => (
              <div key={idx} className="reveal border-t border-line/10 py-8">
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">{section.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{section.body}</p>
              </div>
            ))}
          </div>

          {about.footnote && <p className="mt-6 text-sm italic text-muted">{about.footnote}</p>}
        </div>
      </section>

      <section aria-labelledby="key-features" className="border-b border-line/10 bg-well py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 id="key-features" className="reveal text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-headline">
            {about.featuresTitle ?? 'Key Features'}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.features.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={idx}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-page pb-20">
        {app && <Testimonials appName={name} items={app.testimonials} accentColor={accentColor} />}

        {cta !== false && trackedStoreUrl && (
          <DownloadCTA
            appName={name}
            appStoreUrl={trackedStoreUrl}
            macAppStoreUrl={trackedMacUrl}
            price={priceLine}
            accentColor={accentColor}
            preorder={cta.preorder}
          />
        )}
      </div>

      <section aria-labelledby="more-apps" className="border-t border-line/10 bg-well py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 id="more-apps" className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            More from {SITE_NAME}
          </h2>
          <ul className="mt-6 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  to={other.path}
                  className="flex h-full items-center gap-3 rounded-2xl border border-line/10 px-4 py-4 transition-colors hover:border-line/30 hover:bg-line/[0.04] lg:flex-col lg:items-start"
                >
                  <img src={other.icon} alt="" width={48} height={48} loading="lazy" decoding="async" className="h-12 w-12 shrink-0 rounded-[13px]" />
                  <span>
                    <span className="block font-extrabold text-ink">{other.name}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{other.job}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ScrollToTop />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', ...jsonLd }),
          }}
        />
      )}
    </>
  );
}
