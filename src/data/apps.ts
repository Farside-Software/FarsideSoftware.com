import { apps as catalog, findApp as findCatalogApp } from './catalog.mjs';
import type { CatalogApp, Promo } from './catalog.d.mts';
import maestroIcon from '../assets/maestro/icon.png';
import opaliteIcon from '../assets/opalite/icon.png';
import setdeckIcon from '../assets/setdeck/icon.png';
import mygraIcon from '../assets/mygra/icon.png';
import storkIcon from '../assets/stork/icon.png';
import waffleIcon from '../assets/waffle/icon.png';
import backstampIcon from '../assets/backstamp/icon.png';
import maestroIconDark from '../assets/maestro/icon-dark.png';
import opaliteIconDark from '../assets/opalite/icon-dark.png';
import setdeckIconDark from '../assets/setdeck/icon-dark.png';
import mygraIconDark from '../assets/mygra/icon-dark.png';
import storkIconDark from '../assets/stork/icon-dark.png';
import waffleIconDark from '../assets/waffle/icon-dark.png';
import backstampIconDark from '../assets/backstamp/icon-dark.png';

export type { CatalogApp, Promo, Testimonial } from './catalog.d.mts';

const icons: Record<string, string> = {
  maestro: maestroIcon,
  opalite: opaliteIcon,
  setdeck: setdeckIcon,
  mygra: mygraIcon,
  stork: storkIcon,
  waffle: waffleIcon,
  backstamp: backstampIcon,
};

/** Each icon's dark appearance (shown while an icon is hovered). */
const darkIcons: Record<string, string> = {
  maestro: maestroIconDark,
  opalite: opaliteIconDark,
  setdeck: setdeckIconDark,
  mygra: mygraIconDark,
  stork: storkIconDark,
  waffle: waffleIconDark,
  backstamp: backstampIconDark,
};

export interface SiteApp extends CatalogApp {
  icon: string;
  iconDark: string;
  path: string;
}

/** Every app (released or coming soon), in display order, with its bundled icon and route. */
export const apps: SiteApp[] = catalog.map((app) => ({
  ...app,
  icon: icons[app.slug],
  iconDark: darkIcons[app.slug],
  path: `/${app.slug}`,
}));

export function findApp(slug: string): SiteApp | undefined {
  const base = findCatalogApp(slug);
  return base ? { ...base, icon: icons[base.slug], iconDark: darkIcons[base.slug], path: `/${base.slug}` } : undefined;
}

/** The apps that are out now (everything except those marked `comingSoon`). */
export const releasedApps: SiteApp[] = apps.filter((app) => !app.comingSoon);

/** True while `promo` is running (inclusive of both end dates, local time). */
export function isPromoActive(promo: Promo | undefined, now: Date = new Date()): boolean {
  if (!promo) return false;
  const start = new Date(`${promo.start}T00:00:00`);
  const end = new Date(`${promo.end}T23:59:59.999`);
  return now >= start && now <= end;
}
