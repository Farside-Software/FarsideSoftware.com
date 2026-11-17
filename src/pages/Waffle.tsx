import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import { findApp } from '../data/apps';
import icon from '../assets/waffle/icon.png';

// Official brand color: Waffle Secondary
const ACCENT_COLOR = '#DFA656';
const APP_STORE_URL = 'https://apps.apple.com/us/app/waffle-browser/id6751783473';

const app = findApp('waffle')!;

const screens = screensFromGlob(
  import.meta.glob('../assets/waffle/screens/*', { eager: true, import: 'default' })
);

export default function Waffle() {
  return (
    <AppShowcase
      name="Waffle"
      tagline="Keep the sites you care about on screen at once: a tidy grid on iPad, two live pages on iPhone."
      icon={icon}
      accentColor={ACCENT_COLOR}
      app={app}
      githubUrl="https://github.com/NMolargik/Waffle"
      requirements={['iOS 26+', 'iPadOS 26+']}
      screens={screens}
      heroLayout="panorama"
      screensClassName="bg-well"
      about={{
        title: 'Waffle — A Grid on iPad, Two Live Pages on iPhone',
        intro:
          'Tabs make you choose. Waffle doesn’t. Put websites next to each other and keep your mail, news, dashboards, and video in view at the same time. No clutter. No app switching. Just a smarter workspace.',
        sections: [
          {
            title: 'The Grid on iPad',
            body: 'Every cell in the grid is a full browser. Tap a cell to select it — the address bar, back, forward, and reload all control that cell. Tap the address bar and it takes over the toolbar with the full address selected and ready to replace, so you can type a URL or search right away. Resize your grid with a tap: add or remove rows and columns anytime.',
          },
          {
            title: 'Waffle on iPhone',
            body: 'Two live pages at once, stacked or side by side. Drag the divider to give one page more room, or double-tap it to even things out. Maximize a pane when it’s time to focus, and save a layout to bring both pages back with one tap. On iPhone Duo, unfold for up to four panes that stay clear of the fold, and half-fold for Desk Mode (both with Syrup).',
          },
          {
            title: 'Built for iPad',
            body: 'A clean, native iPadOS interface with full hardware keyboard support, drag-and-drop bookmarks from the sidebar onto any cell, Handoff to your other devices, and Siri, Shortcuts, and Spotlight integration so presets and bookmarks open from anywhere. Bookmarks and presets sync across your devices with iCloud.',
          },
          {
            title: 'Perfect For',
            body: 'Students juggling research, notes, and lectures. Traders and analysts watching live data. Streamers tracking chat, feeds, and tools. Sports fans following every game at once. Anyone who wants a tidy, efficient workspace.',
          },
          {
            title: 'Go Deluxe with Syrup',
            body: 'Waffle is free to use: a grid up to 2×2 on iPad, and two pages with one saved layout on iPhone. A one-time Syrup purchase — no subscription — unlocks the rest. On iPad: grids up to 4×4, rearranging, pop-out windows, fullscreen focus, and saved Presets. On iPhone: unlimited saved layouts. On iPhone Duo: a third and fourth pane on the unfolded display, plus Desk Mode. One purchase covers iPhone and iPad, and Family Sharing is included.',
          },
        ],
        features: [
          {
            icon: '📱',
            title: 'Two Pages on iPhone',
            description:
              'Two live pages at once, stacked or side by side, with a divider you can drag. Save a layout and reopen it with one tap.',
          },
          {
            icon: '🔳',
            title: 'Adjustable Grid',
            description:
              'On iPad, add or remove rows and columns with a tap to build the perfect grid for your workflow — up to 4×4 live webpages on screen at once.',
          },
          {
            icon: '🔀',
            title: 'Rearrange on the Fly',
            description:
              'Drag cells into a new order or tap two cells to swap them, without reloading a thing.',
          },
          {
            icon: '🪟',
            title: 'Pop-Out Windows',
            description:
              'Detach any grid cell into its own window using iPadOS multi-window, then pop it right back into the grid when you’re done.',
          },
          {
            icon: '⤢',
            title: 'Fullscreen Focus',
            description:
              'Bring any site front and center with a tap, then drop it back into the grid when you’re ready to multitask again.',
          },
          {
            icon: '⭐️',
            title: 'Presets',
            description:
              'Save an entire grid — size and every page in it — as a Preset and bring it back in one tap. A morning news grid, a work grid, a game-day grid. Share any preset as a link that opens it on your other devices, with the page addresses listed for anyone else.',
          },
          {
            icon: '🔄',
            title: 'Auto-Refresh',
            description:
              'Keep live data current without lifting a finger: set any cell to reload every 30 seconds, 1, 5, or 15 minutes, or leave it off. Included free.',
          },
          {
            icon: '☁️',
            title: 'iCloud Sync',
            description:
              'Bookmarks, Presets, and saved layouts sync across your iPhone and iPad with iCloud, so your favorite setups are always right where you left them.',
          },
        ],
        footnote:
          'Waffle is free to download for iPhone and iPad running iOS or iPadOS 26 or later, and is available in English, Spanish, French (Canada), and Japanese. Syrup is a one-time purchase with Family Sharing — no subscription.',
      }}
      jsonLd={{
        name: 'Waffle Browser',
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'iOS, iPadOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
      }}
    />
  );
}
