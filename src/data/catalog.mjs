// The app catalog: one entry per shipping app. Plain ESM so that both the
// React app (via src/data/apps.ts) and the build scripts (OG images,
// prerendered <head>, sitemap, press kit) read the same facts.
//
// An app that is not out yet sets `comingSoon: true` and has no store URL:
// the site shows "Coming soon" in place of the App Store badge, and nothing
// links to the store. Remove the flag and add `macAppStoreUrl` at release.
//
// Keep copy here short and factual; the long-form marketing copy stays in
// each page under src/pages/.

export const SITE_URL = 'https://farsidesoftware.com';

/** @type {import('./catalog.d.mts').CatalogApp[]} */
export const apps = [
  {
    slug: 'maestro',
    name: 'Maestro',
    storeName: 'Maestro - Light Show Studio',
    source: 'Maestro',
    job: 'Turn any song into a Tesla light show, choreographed on your iPhone, iPad, or Mac.',
    description:
      'Maestro turns any song into a Tesla light show. On-device signal processing, a hardware-accurate fleet preview, a channel-level Sequence Editor on the Mac, and USB-ready exports. No AI, nothing uploaded.',
    accent: '#2D7FF9',
    appStoreUrl: 'https://apps.apple.com/us/app/maestro-light-show-studio/id6803264666',
    macAppStoreUrl: 'https://apps.apple.com/us/app/maestro-light-show-studio/id6803264666?platform=mac',
    platforms: ['iPhone', 'iPad', 'Mac'],
    languages: ['English', 'Spanish', 'German', 'Dutch', 'Norwegian'],
    price: 'Free to try, $12.99 one-time unlock',
    priceDetail: 'A sample show and your first two exports are free. One purchase unlocks unlimited shows and exports on every device. No subscription.',
    // HOLIDAY SALE: delete this whole `promo` block after November 22, 2026 to remove the
    // banner on /maestro and the sale price on the home card. (It also hides itself
    // automatically once `end` has passed.)
    promo: {
      label: 'Holiday sale: unlock Maestro for $4.99 through November 22, 2026 (regularly $12.99)',
      start: '2026-11-09',
      end: '2026-11-22',
    },
    category: 'EntertainmentApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
  {
    slug: 'opalite',
    name: 'Opalite',
    storeName: 'Opalite - Color Studio',
    source: 'Opalite',
    job: 'Pick, organize, check, and export colors on every Apple device you own.',
    description:
      'Pick colors from photos, check WCAG and APCA contrast, work in OKLCH and Display P3, simulate color blindness, draw on a canvas, and export palettes to Procreate, SwiftUI, CSS, and Adobe on iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
    accent: '#9F95AF',
    appStoreUrl: 'https://apps.apple.com/us/app/opalite-color-studio/id6755093664',
    macAppStoreUrl: 'https://apps.apple.com/us/app/opalite-color-studio/id6755093664?platform=mac',
    platforms: ['iPhone', 'iPad', 'Mac', 'Apple Watch', 'Apple TV', 'Vision Pro'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Onyx $9.99 one-time',
    priceDetail: 'Unlimited colors, five palettes, one canvas, every picker, and the contrast checker are free. Onyx adds unlimited palettes and canvases, Community saves, and pro export formats for a single $9.99 purchase. No subscription.',
    category: 'DesignApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [
      { quote: 'Fantastic for artists', source: 'App Store review' },
      { quote: 'My go to palette tool', source: 'App Store review' },
      { quote: 'Helpful desktop app for marketing', source: 'App Store review' },
    ],
  },
  {
    slug: 'setdeck',
    name: 'SetDeck',
    storeName: 'SetDeck',
    source: 'SetDeck',
    job: 'Plan the training week, log every set, and watch the numbers climb.',
    description:
      'Plan your training week, log every set, and watch the numbers climb. SetDeck tracks routines, history, stats, achievements, hydration, and calories with Apple Watch, Siri, and Apple Health.',
    accent: '#3CB371',
    appStoreUrl: 'https://apps.apple.com/us/app/setdeck/id6484503374',
    platforms: ['iPhone', 'iPad', 'Apple Watch', 'Vision Pro'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free',
    priceDetail: 'Every feature is free. No accounts, no ads, no upsell.',
    category: 'HealthApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
  {
    slug: 'mygra',
    name: 'Mygra',
    storeName: 'Mygra: Migraine Tracker',
    source: 'Mygra',
    job: 'A calm, private migraine journal. Log an attack in seconds and keep a clear record.',
    description:
      'A calm, private migraine journal. Log an attack in seconds, with weather and Health attached, and see your history take shape. Free forever for logging, the dashboard, calendar, Apple Health, Apple Watch, and Siri. Mygra Plus adds the on-device Migraine Assistant, weather alerts, Cycle Insights, and doctor-ready PDF reports. Private by design.',
    accent: '#6E60FF',
    appStoreUrl: 'https://apps.apple.com/us/app/mygra/id6747298583',
    platforms: ['iPhone', 'iPad', 'Apple Watch', 'Vision Pro'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Mygra Plus from $2.99/mo',
    priceDetail: 'Logging, history, the dashboard, and Apple Health are free. Mygra Plus is $2.99 a month or $14.99 a year with a 7-day free trial, or $29.99 once.',
    category: 'HealthApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [{ quote: 'Great app, nice improvements', source: 'App Store review' }],
  },
  {
    slug: 'stork',
    name: 'Stork',
    storeName: 'Stork - L&D Companion',
    source: 'Stork',
    job: 'Track the deliveries you perform, visualize trends, and celebrate every birth.',
    description:
      'Track the deliveries you perform, visualize trends, and celebrate every birth with Stork, the privacy-first companion for L&D nurses, midwives, and OB-GYNs.',
    accent: '#E8672B',
    appStoreUrl: 'https://apps.apple.com/us/app/stork-l-d-companion/id6740038476',
    platforms: ['iPhone', 'iPad', 'Mac', 'Apple Watch'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Stork Pro $4.99 one-time',
    priceDetail: 'Log every delivery and see your dashboard for free. Stork Pro adds milestone share cards, PDF and CSV export, insight cards and the heat map, alternate icons, weather at each delivery, and Lock Screen widgets for a single $4.99 purchase.',
    category: 'MedicalApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
  {
    slug: 'waffle',
    name: 'Waffle',
    storeName: 'Waffle Browser',
    source: 'Waffle',
    job: 'Keep several live pages on screen at once: a grid on iPad, two pages on iPhone.',
    description:
      'Waffle keeps the sites you care about on screen at once: a grid of live webpages on iPad, two live pages on iPhone. Auto-refresh any page on a timer, save layouts and presets, pop cells into their own windows on iPad, and sync with iCloud.',
    accent: '#C98A2E',
    appStoreUrl: 'https://apps.apple.com/us/app/waffle-browser/id6751783473',
    platforms: ['iPhone', 'iPad'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Syrup $4.99 one-time',
    priceDetail: 'Waffle is free to use. On iPad, Syrup unlocks larger grids, rearranging, pop-out windows, fullscreen, and presets; on iPhone, unlimited saved layouts. One $4.99 purchase covers both.',
    category: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
  {
    slug: 'backstamp',
    name: 'Backstamp',
    storeName: 'Backstamp: Photo Date Fixer',
    source: 'Backstamp',
    job: 'Fix missing and wrong photo dates and merge duplicates in Apple Photos, on your Mac.',
    description:
      'Backstamp fixes missing and wrong photo dates and merges duplicates in Apple Photos. It shows the evidence behind every date, changes nothing until you click Apply, and keeps an undo journal. A native Mac app for macOS 26 or later. Coming soon to the Mac App Store.',
    accent: '#138A80',
    // Not released yet: no store URL until the Mac App Store listing is live
    // (App Store Connect id 6836913352). At release, set `macAppStoreUrl` to the
    // listing and delete `comingSoon`.
    comingSoon: true,
    platforms: ['Mac'],
    languages: ['English'],
    price: 'Free, Unlimited $4.99 one-time',
    priceDetail: 'Scan and review for free, with 25 free fixes. Backstamp Unlimited removes the limit for a single $4.99 purchase, with Family Sharing and no subscription. Undo and History are always free.',
    category: 'MultimediaApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
];

/** @param {string} slug */
export function findApp(slug) {
  return apps.find((a) => a.slug === slug);
}
