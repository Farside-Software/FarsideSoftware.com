import type { RefObject } from 'react';
import { Tag } from 'lucide-react';
import type { Promo } from '../data/apps';
import { usePromoActive } from '../hooks/usePromoActive';
import AppStoreBadge from './AppStoreBadge';
import ComingSoonBadge from './ComingSoonBadge';
import GlassButton from './GlassButton';
import AppPreviewVideo, { type AppPreview } from './AppPreviewVideo';
import AppIcon from './AppIcon';

interface AppHeroProps {
  name: string;
  heading: string;
  tagline: string;
  icon: string;
  /** Dark-appearance icon, faded in on hover. */
  iconDark?: string;
  accentColor: string;
  price?: string;
  priceDetail?: string;
  promo?: Promo;
  /** Small outlined labels under the buttons: OS versions, or platforms. */
  pills: string[];
  appStoreHref?: string;
  /** Not released yet: a "Coming soon" badge replaces the store badges. */
  comingSoon?: boolean;
  /** Pills shown inside the placeholder panel while there are no screenshots yet. */
  placeholderPills?: string[];
  macAppStoreHref?: string;
  githubHref?: string;
  webHref?: string;
  /** Lead screenshots: one landscape image, or two portrait ones. */
  shots: string[];
  /**
   * `wide` shows one landscape screenshot. `pair` shows two portrait ones side
   * by side. `panorama` joins two portrait screenshots edge to edge, for store
   * screenshots drawn as one continuous picture (a device spanning both).
   */
  layout: 'pair' | 'wide' | 'panorama';
  /** Preview video shown in the right column instead of the lead screenshots. The column only shows from lg up; the gallery carries the video below that. */
  video?: AppPreview;
  /** Attached to the column holding the store badges (the buy bar watches it). */
  actionsRef?: RefObject<HTMLDivElement | null>;
}

/**
 * The top of an app page: the claim, the price and the store badges on the
 * left, real screenshots on the right. Nothing here animates in, so the
 * prerendered page paints complete.
 */
export default function AppHero({
  name,
  heading,
  tagline,
  icon,
  iconDark,
  accentColor,
  price,
  priceDetail,
  promo,
  pills,
  appStoreHref,
  comingSoon,
  placeholderPills = [],
  macAppStoreHref,
  githubHref,
  webHref,
  shots,
  layout,
  video,
  actionsRef,
}: AppHeroProps) {
  const promoLive = usePromoActive(promo);
  // "Maestro - Light Show Studio" reads as a name and a kind of app.
  const [title, kind] = heading.split(' - ');
  const lead = layout === 'wide' ? shots.slice(0, 1) : shots.slice(0, 2);

  return (
    <section className="relative overflow-hidden border-b border-line/10 bg-page pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-10">
        <div ref={actionsRef} className={layout === 'wide' ? 'lg:col-span-5' : 'lg:col-span-7'}>
          {promoLive && promo && (
            <p
              role="status"
              className="mb-7 inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-sm font-bold text-night"
            >
              <Tag size={16} aria-hidden="true" className="shrink-0" />
              {promo.label}
            </p>
          )}
          <AppIcon src={icon} darkSrc={iconDark} size={96} className="h-24 w-24 rounded-[1.5rem]" />
          <h1 className="mt-7 text-[3.25rem] font-extrabold leading-[1] tracking-[-0.04em] text-ink sm:text-7xl">
            {title}
            {kind && (
              <span className="mt-3 block text-2xl font-bold tracking-[-0.02em] text-muted sm:text-3xl">
                <span className="sr-only"> - </span>
                {kind}
              </span>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-muted [text-wrap:pretty]">{tagline}</p>

          {price && (
            <div className="mt-7 border-l-2 pl-4" style={{ borderColor: accentColor }}>
              <p className="text-lg font-bold text-ink">
                <span className="sr-only">Price: </span>
                {price}
              </p>
              {priceDetail && <p className="mt-1 max-w-xl text-sm text-muted">{priceDetail}</p>}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {comingSoon && <ComingSoonBadge />}
            {appStoreHref && <AppStoreBadge href={appStoreHref} appName={name} />}
            {macAppStoreHref && <AppStoreBadge href={macAppStoreHref} appName={name} store="mac" />}
            {webHref && (
              <GlassButton to={webHref} shape="rect" tone="ghost" className="h-12 w-[200px]" ariaLabel="View your portfolio on Opalite Web">
                <span className="flex flex-col text-center leading-none">
                  <span className="text-[9px] tracking-wide text-muted">View your portfolio</span>
                  <span className="-mt-px text-[18px] font-semibold tracking-tight">Log In</span>
                </span>
              </GlassButton>
            )}
          </div>

          {pills.length > 0 && (
            <ul className="mt-7 flex list-none flex-wrap gap-2 p-0" aria-label="Requirements">
              {pills.map((pill) => (
                <li key={pill} className="rounded-full border border-line/15 px-3 py-1 text-xs font-semibold text-muted">
                  {pill}
                </li>
              ))}
            </ul>
          )}

          {githubHref && (
            <p className="mt-6 text-sm text-muted">
              Open source:{' '}
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-line/30 underline-offset-4 hover:decoration-line/70"
              >
                view the code on GitHub
              </a>
            </p>
          )}
        </div>

        <div className={`${video ? 'hidden lg:block ' : ''}${layout === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
          {video ? (
            <AppPreviewVideo
              {...video}
              title={`${name} app preview`}
              accent={accentColor}
              className={video.height > video.width ? 'mx-auto w-full max-w-[300px]' : 'w-full'}
            />
          ) : shots.length === 0 ? (
            // No screenshots yet: a flat panel with the big icon, so the column is not empty.
            <div className="flex aspect-[8/5] w-full flex-col items-center justify-center gap-6 rounded-2xl border border-line/10 bg-panel p-8">
              <AppIcon src={icon} darkSrc={iconDark} size={192} className="h-40 w-40 rounded-[2.5rem] sm:h-48 sm:w-48 sm:rounded-[3rem]" />
              {placeholderPills.length > 0 && (
                <ul className="flex list-none flex-wrap justify-center gap-2 p-0" aria-label="Highlights">
                  {placeholderPills.map((pill) => (
                    <li
                      key={pill}
                      className="rounded-full border px-3 py-1 text-xs font-semibold text-muted"
                      style={{ borderColor: `${accentColor}66` }}
                    >
                      {pill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : layout === 'wide' ? (
            <img
              src={lead[0]}
              alt={`${name} screenshot`}
              fetchPriority="high"
              className="w-full rounded-2xl border border-line/10"
            />
          ) : layout === 'panorama' ? (
            <div className="mx-auto flex max-w-[520px] overflow-hidden rounded-2xl border border-line/10">
              {lead.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? `${name} screenshots` : ''}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  className="w-1/2"
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto flex max-w-[520px] items-start justify-center gap-4 sm:gap-5">
              {lead.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? `${name} screenshot` : ''}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  className="w-[47%] rounded-2xl border border-line/10"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
