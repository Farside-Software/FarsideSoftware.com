import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { SiteApp } from '../../data/apps';
import { usePromoActive } from '../../hooks/usePromoActive';
import { appStoreLink, siteChannel } from '../../utils/appStore';
import { accentText } from '../../theme/contrast';
import AppStoreBadge from '../AppStoreBadge';

interface FlagshipBandProps {
  app: SiteApp;
  /** Catalog number shown beside the label, e.g. "01". */
  number: string;
  /** Short kind-of-app label, e.g. "Light show studio". */
  kind: string;
  /** One landscape screenshot, or up to three portrait ones. */
  shots: string[];
  /** Put the screenshots on the left at desktop widths. */
  reverse?: boolean;
  className?: string;
}

/**
 * A full-width band for a flagship app: the claim and the store badge on one
 * side, real screenshots on the other.
 */
export default function FlagshipBand({ app, number, kind, shots, reverse = false, className = '' }: FlagshipBandProps) {
  const promoLive = usePromoActive(app.promo);
  const accent = accentText(app.accent);
  const single = shots.length === 1;

  return (
    <section aria-labelledby={`flagship-${app.slug}`} className={`border-b border-line/10 py-20 lg:py-28 ${className}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-10">
        <div className={`reveal lg:col-span-5 ${reverse ? 'lg:order-2 lg:pl-6' : ''}`}>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">
            <span className="tabular-nums" style={{ color: accent }}>
              {number}
            </span>
            <span aria-hidden="true" className="h-px w-8" style={{ background: app.accent }} />
            {kind}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <img src={app.icon} alt="" width={64} height={64} loading="lazy" decoding="async" className="h-16 w-16 rounded-2xl" />
            <h2 id={`flagship-${app.slug}`} className="text-5xl font-extrabold tracking-[-0.03em] text-ink sm:text-6xl">
              {app.name}
            </h2>
          </div>
          <p className="mt-6 text-xl leading-relaxed text-ink/90 [text-wrap:balance] sm:text-2xl">{app.job}</p>
          <p className="mt-4 font-bold" style={{ color: accent }}>
            {promoLive && app.promo ? app.promo.label : app.price}
          </p>
          <p className="mt-1 text-sm text-muted">{app.platforms.join(' · ')}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AppStoreBadge href={appStoreLink(app.appStoreUrl, siteChannel('home'))} appName={app.name} />
            <Link
              to={app.path}
              className="group inline-flex items-center gap-1.5 font-bold text-ink underline decoration-line/30 underline-offset-4 hover:decoration-line/70"
            >
              Tour {app.name}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <Link
          to={app.path}
          aria-label={`${app.name} screenshots`}
          tabIndex={-1}
          className={`reveal block lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}
        >
          {single ? (
            <img
              src={shots[0]}
              alt={`${app.name} on the Mac`}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-line/10"
            />
          ) : (
            <div className="flex items-start justify-center gap-4 sm:gap-5">
              {shots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? `${app.name} on iPhone` : ''}
                  loading="lazy"
                  decoding="async"
                  className={`w-[31%] max-w-[230px] rounded-2xl border border-line/10 ${i === 1 ? 'mt-10' : i === 2 ? 'mt-20' : ''}`}
                />
              ))}
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}
