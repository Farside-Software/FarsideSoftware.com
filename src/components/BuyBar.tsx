import { useEffect, useState, type RefObject } from 'react';
import GlassButton from './GlassButton';
import AppIcon from './AppIcon';

interface BuyBarProps {
  /** The bar appears once this element (the hero) has scrolled out of view. */
  watch: RefObject<HTMLElement | null>;
  name: string;
  icon: string;
  /** Dark-appearance icon, faded in on hover. */
  iconDark?: string;
  price?: string;
  accentColor: string;
  appStoreHref: string;
  /** `mac` for a Mac-only app, whose button names the Mac App Store. */
  store?: 'ios' | 'mac';
}

/**
 * A slim bar under the site header that keeps the app's name, price and
 * store link in reach while the rest of the page scrolls.
 */
export default function BuyBar({ watch, name, icon, iconDark, price, accentColor, appStoreHref, store = 'ios' }: BuyBarProps) {
  const storeName = store === 'mac' ? 'Mac App Store' : 'App Store';
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = watch.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), { rootMargin: '-80px 0px 0px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [watch]);

  return (
    <div
      // Hidden from assistive tech and the tab order until it slides in.
      inert={!shown}
      className={`fixed inset-x-0 top-[69px] z-40 border-b border-line/10 bg-page transition-transform duration-200 ease-out motion-reduce:transition-none ${
        shown ? 'translate-y-0' : '-translate-y-[calc(100%+70px)]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2">
        <AppIcon src={icon} darkSrc={iconDark} size={32} className="h-8 w-8 rounded-[9px]" />
        <p className="min-w-0 flex-1 truncate">
          <span className="font-extrabold text-ink">{name}</span>
          {price && <span className="ml-3 hidden text-sm text-muted sm:inline">{price}</span>}
        </p>
        <GlassButton href={appStoreHref} target="_blank" accentColor={accentColor} size="sm" ariaLabel={`Get ${name} on the ${storeName}`}>
          <span>
            Get<span className="hidden sm:inline"> on the {storeName}</span>
          </span>
        </GlassButton>
      </div>
    </div>
  );
}
