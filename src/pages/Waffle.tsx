import AppShowcase from '../components/AppShowcase';
import DevicePreviews, { type DevicePreviewTile } from '../components/DevicePreviews';
import { screensFromGlob } from '../utils/screens';
import { findApp } from '../data/apps';
import icon from '../assets/waffle/icon.png';

// Official brand color: Waffle Secondary
const ACCENT_COLOR = '#DFA656';
const APP_STORE_URL = 'https://apps.apple.com/us/app/waffle-browser/id6751783473';

const app = findApp('waffle')!;

const devicePreviews: DevicePreviewTile[] = [
  {
    label: 'iPad',
    title: 'Waffle on iPad',
    src: '/video/waffle-preview-ipad.mp4',
    poster: '/video/waffle-preview-ipad-poster.webp',
    width: 1280,
    height: 960,
    frame: 'w-[453px]',
  },
  {
    label: 'iPhone Duo',
    title: 'Waffle on iPhone Duo',
    src: '/video/waffle-preview-duo.mp4',
    poster: '/video/waffle-preview-duo-poster.webp',
    width: 1280,
    height: 590,
    frame: 'w-[737px]',
  },
];

const screens = screensFromGlob(
  import.meta.glob('../assets/waffle/screens/*', { eager: true, import: 'default' })
);

export default function Waffle() {
  return (
    <AppShowcase
      name="Waffle"
      tagline="Keep the sites you care about on screen at once: two live pages on iPhone, a grid on iPad, and four on an unfolded iPhone Duo."
      icon={icon}
      accentColor={ACCENT_COLOR}
      app={app}
      githubUrl="https://github.com/NMolargik/Waffle"
      requirements={['iOS 26+', 'iPadOS 26+']}
      screens={screens}
      screensClassName="bg-well"
      afterScreens={
        <DevicePreviews
          accentColor={ACCENT_COLOR}
          intro="Thirty-second tours of Waffle on iPad and on iPhone Duo. Tap to play."
          tiles={devicePreviews}
        />
      }
      preview={{
        src: '/video/waffle-preview.mp4',
        poster: '/video/waffle-preview-poster.webp',
        width: 720,
        height: 1560,
        caption:
          'Thirty seconds of Waffle on iPhone: two live pages at once, a divider you can drag, a saved layout in one tap, and content blocking on every page.',
      }}
      about={{
        title: 'Waffle: Live Web Grid & Split Screen',
        intro:
          'Tabs make you choose. Waffle doesn’t. Put websites next to each other and keep your mail, news, dashboards, and video in view together: two live pages on iPhone, a grid of them on iPad, and up to four on an unfolded iPhone Duo. No tab juggling, no app switching, and every page is a real, live browser.',
        sections: [
          {
            title: 'Waffle on iPhone',
            body: 'Two live pages at once, stacked or side by side. Drag the divider to give one page more room, or double-tap it to even things out. Maximize a pane when it’s time to focus, and save a layout to bring both pages back with one tap.',
          },
          {
            title: 'The Grid on iPad',
            body: 'Every cell in the grid is a full browser. Tap a cell to select it, and the address bar, back, forward, and reload all control that cell. Add or remove rows and columns anytime, drag a bookmark from the sidebar onto any cell, and use a hardware keyboard, Handoff, Siri, Shortcuts, and Spotlight to get around.',
          },
          {
            title: 'Waffle on iPhone Duo',
            body: 'Unfold for up to four panes that stay clear of the fold, and half-fold for Desk Mode, with pages on the upright half and controls on the flat half. Settings splits across the unfolded display, and with the Duo folded shut Waffle works as a two-pane iPhone browser. The third and fourth pane and Desk Mode come with Syrup.',
          },
          {
            title: 'On Every Device',
            body: 'Block ads, trackers, and cookie banners, with a separate setting for each page. Auto-refresh any page on a timer. Bookmarks and saved layouts sync with iCloud. No ads and no account.',
          },
          {
            title: 'Perfect For',
            body: 'Students juggling research, notes, and lectures. Traders and analysts watching live data. Streamers tracking chat, feeds, and tools. Sports fans following every game at once. Anyone who wants a tidy, efficient workspace.',
          },
          {
            title: 'Go Deluxe with Syrup',
            body: 'Waffle is free to use: two panes on iPhone and a folded iPhone Duo, one saved layout, a grid up to 2×2 on iPad, plus bookmarks, content blocking, auto-refresh, and iCloud sync. A one-time Syrup purchase, with no subscription, unlocks the rest. On iPad: grids up to 4×4, rearranging, pop-out windows, fullscreen cells, and saved presets. On iPhone: unlimited saved layouts. On iPhone Duo: a third and fourth pane on the unfolded display, plus Desk Mode. One purchase covers iPhone and iPad, and Family Sharing is included.',
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
              'On iPad, add or remove rows and columns with a tap to build the grid your workflow needs, up to 4×4 live webpages on screen at once.',
          },
          {
            icon: '📖',
            title: 'Four Panes on iPhone Duo',
            description:
              'Unfold for up to four panes that stay clear of the fold, or half-fold for Desk Mode with pages up top and controls below.',
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
            title: 'Fullscreen a Cell',
            description:
              'Bring any site front and center with a tap, then drop it back into the grid when you’re ready to multitask again.',
          },
          {
            icon: '⭐️',
            title: 'Presets',
            description:
              'Save an entire grid, its size and every page in it, as a Preset and bring it back in one tap. Share any preset as a link that opens it on your other devices.',
          },
          {
            icon: '🛡️',
            title: 'Content Blocking',
            description:
              'Block ads, trackers, and cookie banners, with a separate setting for each page. Included free.',
          },
          {
            icon: '🔄',
            title: 'Auto-Refresh',
            description:
              'Keep live data current without lifting a finger: set any page to reload every 30 seconds, 1, 5, or 15 minutes, or leave it off. Included free.',
          },
          {
            icon: '☁️',
            title: 'iCloud Sync',
            description:
              'Bookmarks, Presets, and saved layouts sync across your devices with iCloud, so your favorite setups are always right where you left them.',
          },
        ],
        footnote:
          'Waffle 2.0 is free to download for iPhone, iPad, and iPhone Duo running iOS or iPadOS 26 or later, and is available in English, Spanish, French (Canada), and Japanese. Syrup is a one-time purchase with Family Sharing and no subscription.',
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
