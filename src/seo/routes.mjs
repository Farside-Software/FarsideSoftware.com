// Per-route <head> metadata. Read by the React app (usePageMeta) at runtime
// and by scripts/postbuild-seo.mjs at build time, which writes one HTML file
// per route with these tags baked in, plus sitemap.xml and robots.txt.

import { apps, SITE_URL } from '../data/catalog.mjs';
import { guides, guidePath, guideJsonLd } from '../data/guides.mjs';

export { SITE_URL };

const SUFFIX = ' | Farside Software';
const DEFAULT_OG = '/og/default.png';

/** @type {import('./routes.d.mts').RouteMeta[]} */
const staticRoutes = [
  {
    path: '/',
    title: 'Farside Software: Independent apps for every Apple device',
    description:
      'Independent apps for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro. Private by design: Maestro, Opalite, SetDeck, Mygra, Stork, Waffle, and Backstamp.',
    ogImage: DEFAULT_OG,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about',
    title: `About the studio${SUFFIX}`,
    description:
      'Farside Software LLC is an independent app studio in Indiana, founded in 2025 by Nick Molargik. It builds native Swift and SwiftUI apps for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
    ogImage: DEFAULT_OG,
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/contact',
    title: `Contact and support${SUFFIX}`,
    description:
      'Reach Farside Software for app support, press, or partnerships. Replies come from the developer, usually within a day or two.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/support',
    title: `Support${SUFFIX}`,
    description:
      'Help for Maestro, Opalite, SetDeck, Mygra, Stork, Waffle, and Backstamp: frequently asked questions, purchases and restores, iCloud sync, and how to reach the developer.',
    ogImage: DEFAULT_OG,
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/press',
    title: `Press kit${SUFFIX}`,
    description:
      'Press kit for Farside Software: company and founder blurbs, app descriptions, icons, and screenshots for Maestro, Opalite, SetDeck, Mygra, Stork, Waffle, and Backstamp.',
    ogImage: DEFAULT_OG,
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/privacy',
    title: `Privacy policy${SUFFIX}`,
    description:
      'One privacy policy for every Farside Software app. What each app stores, what stays on your device or in your private iCloud, and what is never collected or sold.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.4,
  },
  {
    path: '/opalite-web',
    title: `Opalite Web: your color portfolio${SUFFIX}`,
    description: 'Sign in with your Apple Account to view the colors and palettes synced from Opalite.',
    ogImage: '/og/opalite.png',
    noindex: true,
  },
  {
    // Inktape is not in the catalog yet: this page is linked from nowhere on
    // the site, stays out of the sitemap, and asks search engines not to index it.
    path: '/inktape',
    title: `Inktape: Audio Notebook for iPhone and iPad${SUFFIX}`,
    description:
      'Take short notes and let the recording keep the rest. Tap any word or note to hear that moment again. Transcribed on your device. No account, no subscription.',
    ogImage: '/og/inktape.png',
    noindex: true,
  },
  {
    // Hidden tester sign-up: linked from nowhere, out of the sitemap, noindex.
    path: '/inktape-beta',
    title: `Test Inktape before release${SUFFIX}`,
    description: 'Request an early TestFlight invite for Inktape, an audio notebook for iPhone and iPad.',
    ogImage: '/og/inktape.png',
    noindex: true,
  },
  {
    path: '/streetiq',
    title: `StreetIQ / SCOUT${SUFFIX}`,
    description: 'Employment: building SCOUT, the native iOS field app behind StreetIQ pavement assessments.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/v1sports',
    title: `V1 Sports${SUFFIX}`,
    description: 'Employment: mobile engineering for V1 Sports golf and baseball coaching apps.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.3,
  },
];

/** @type {import('./routes.d.mts').RouteMeta[]} */
const appRoutes = apps.map((app) => ({
  path: `/${app.slug}`,
  title: `${app.storeName} for ${app.platforms.join(', ')}${SUFFIX}`,
  description: app.description,
  ogImage: `/og/${app.slug}.png`,
  changefreq: 'weekly',
  priority: 0.9,
}));

/** Guides hub plus one route per guide (src/data/guides.mjs). */
const guideRoutes = [
  {
    path: '/guides',
    title: `Guides: how-tos for every app${SUFFIX}`,
    description:
      'Plain-language how-tos for Maestro, Opalite, SetDeck, Mygra, Stork, and Waffle: Tesla light shows, color and accessibility, training logs, migraine journals, delivery logs, and grid browsing on iPad.',
    ogImage: '/og/default.png',
    changefreq: 'monthly',
    priority: 0.8,
  },
  ...guides.map((g) => ({
    path: guidePath(g.slug),
    title: `${g.title}${SUFFIX}`,
    description: g.description,
    ogImage: g.og,
    changefreq: 'monthly',
    priority: 0.8,
    jsonLd: guideJsonLd(g),
  })),
];

export const routes = [...staticRoutes, ...appRoutes, ...guideRoutes];

/** @param {string} path */
export function findRoute(path) {
  const clean = path.replace(/\/+$/, '') || '/';
  return routes.find((r) => r.path === clean);
}

export const defaultRoute = staticRoutes[0];
