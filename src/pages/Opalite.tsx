import AppShowcase from '../components/AppShowcase';
import DevicePreviews, { type DevicePreviewTile } from '../components/DevicePreviews';
import { screensFromGlob } from '../utils/screens';
import { findApp } from '../data/apps';
import { LEGAL_NAME, SITE_URL } from '../config/site';
import icon from '../assets/opalite/icon.png';

// Official brand color: Opalite Lavender
const ACCENT_COLOR = '#CAC0E8';
const APP_STORE_URL = 'https://apps.apple.com/us/app/opalite-color-studio/id6755093664';

const app = findApp('opalite')!;

const devicePreviews: DevicePreviewTile[] = [
  {
    label: 'iPad',
    title: 'Opalite on iPad',
    src: '/video/opalite-preview-ipad.mp4',
    poster: '/video/opalite-preview-ipad-poster.webp',
    width: 1080,
    height: 810,
    frame: 'w-[453px]',
  },
  {
    label: 'Mac',
    title: 'Opalite on Mac',
    src: '/video/opalite-preview-mac.mp4',
    poster: '/video/opalite-preview-mac-poster.webp',
    width: 1280,
    height: 720,
    frame: 'w-[604px]',
  },
  {
    label: 'iPhone Duo, unfolded',
    title: 'Opalite on iPhone Duo',
    src: '/video/opalite-preview-duo.mp4',
    poster: '/video/opalite-preview-duo-poster.webp',
    width: 1280,
    height: 590,
    frame: 'w-[737px]',
  },
];

const screens = screensFromGlob(
  import.meta.glob('../assets/opalite/screens/*', { eager: true, import: 'default' })
);

export default function Opalite() {
  return (
    <AppShowcase
      name="Opalite"
      heading="Opalite - Color Studio"
      tagline="Take control of your colors. The color toolkit designers, developers, and digital artists actually need."
      icon={icon}
      accentColor={ACCENT_COLOR}
      app={app}
      githubUrl="https://github.com/NMolargik/Opalite"
      webHref="/opalite-web"
      requirements={['iOS 18.4+', 'iPadOS 18.4+', 'macOS 15+', 'watchOS 10+', 'tvOS 18+', 'visionOS 26.2+']}
      screens={screens}
      screensClassName="bg-well"
      preview={{
        src: '/video/opalite-preview.mp4',
        poster: '/video/opalite-preview-poster.webp',
        width: 886,
        height: 1920,
        caption:
          'Thirty seconds of Opalite: build colors six ways, pull a palette from a photo, try harmonies, read every color code, check contrast, and draw with your palette.',
      }}
      afterScreens={
        <DevicePreviews
          accentColor={ACCENT_COLOR}
          intro="Thirty-second tours of Opalite on iPad, on the Mac with its new sidebar, and on iPhone Duo, unfolded. Tap to play."
          tiles={devicePreviews}
        />
      }
      about={{
        title: 'Opalite — The Ultimate Color Manager',
        intro:
          'Pick colors from photos, check WCAG and APCA contrast, work in OKLCH and Display P3, simulate color blindness, and export palettes to Procreate, SwiftUI, CSS, and Adobe — all in one app. Opalite is the color toolkit designers, developers, and digital artists actually need, built for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
        sections: [
          {
            title: 'Pick Colors Six Ways',
            body: 'A grid picker with preset swatches, a spectrum slider for precise hues, RGB, HSL, and hex code input, Shuffle for instant inspiration, channel sliders for fine-tuning, and sampling from any image or your camera.',
          },
          {
            title: 'Organize Your Palette Library',
            body: 'Unlimited colors and five palettes, free forever; Onyx removes the palette limit. Smart palettes with names, notes, and tags, drag-and-drop reordering, instant search across your entire library, and iCloud sync across iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
          },
          {
            title: 'Design for Everyone',
            body: 'A contrast checker with WCAG (AA & AAA) and APCA, a one-tap fix for text that fails AA, OKLCH and Display P3 values with an out-of-sRGB warning, color blindness simulation for Protanopia, Deuteranopia, Tritanopia, and Achromatopsia, auto-generated harmonies — complementary, triadic, analogous, and more — and effortless, AI-powered color naming.',
          },
          {
            title: 'Join the Community',
            body: 'Share palettes with creators worldwide, get inspiration from the contributions of other users, and browse and save public contributions with Onyx.',
          },
          {
            title: 'Draw & Export',
            body: (
              <>
                <span className="text-link font-medium">Onyx</span> unlocks unlimited saved canvases on the PencilKit canvas (one canvas, with Apple Pencil
                support and shape tools, is free) and pro export formats everywhere: Procreate .swatches, Adobe ASE for
                Photoshop & Illustrator, SwiftUI and CSS for developers, GIMP/GPL palettes, and PDF portfolios.
              </>
            ),
          },
        ],
        features: [
          {
            icon: '🎨',
            title: 'Six Color Pickers',
            description:
              'Grid swatches, spectrum slider, Shuffle, channel sliders, direct code entry, and camera or photo sampling — pick colors however feels natural.',
          },
          {
            icon: '📁',
            title: 'Smart Palette Library',
            description:
              'Unlimited colors for free. Palettes with names, notes, and tags, drag-and-drop reordering, and instant search across everything.',
          },
          {
            icon: '♿',
            title: 'Accessibility Tools',
            description:
              'WCAG AA & AAA and APCA contrast checking, a one-tap fix for text failing AA, four kinds of color blindness simulation, and auto-generated harmonies so your designs work for everyone.',
          },
          {
            icon: '🌈',
            title: 'What’s New in 2.0',
            description:
              'A calmer look and a new icon, a sidebar on iPad and Mac with every palette and canvas, a contrast grid and color-vision score for whole palettes, palettes from photos, the camera, or a website, design-token export, and automatic backups with a sync status you can see.',
          },
          {
            icon: '🤖',
            title: 'Agent Access on Mac',
            description:
              'Turn on Opalite’s built-in MCP server and AI coding tools like Claude Code, Cursor, and Codex can read your palettes, export them as CSS, Swift, or Tailwind, check contrast, and, if you allow it, create palettes. Off until you switch it on, and only reachable from your own Mac.',
          },
          {
            icon: '🌎',
            title: 'Community',
            description:
              'Share palettes with creators worldwide and browse public contributions for inspiration.',
          },
          {
            icon: '✏️',
            title: 'Unlimited Canvases (Onyx)',
            description:
              'Apple Pencil and PencilKit support with squares, circles, lines, arrows, and custom shapes. One canvas is free; Onyx unlocks unlimited saved canvases.',
          },
          {
            icon: '📤',
            title: 'Export Anywhere (Onyx)',
            description:
              'Procreate .swatches, Adobe ASE, SwiftUI and CSS code, GIMP/GPL palettes, and PDF portfolios.',
          },
          {
            icon: '💎',
            title: 'Simple Pricing',
            description:
              'Free: unlimited colors, 5 palettes, 1 canvas, every picker, the contrast checker, and color vision simulation. Onyx ($9.99, one-time): unlimited palettes and canvases, Community saves, and pro export formats. No subscription.',
          },
        ],
        footnote:
          `Opalite is indie-made by ${LEGAL_NAME} for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro. AI-powered color naming requires Apple Intelligence.`,
      }}
      jsonLd={{
        name: 'Opalite - Color Studio',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'iOS, iPadOS, macOS, watchOS, tvOS, visionOS',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
        description:
          'Opalite is the ultimate color manager for designers, developers, and digital artists. Pick colors, organize palettes, test accessibility, and export everywhere.',
        video: {
          '@type': 'VideoObject',
          name: 'Opalite app preview',
          description:
            'A 30-second tour of Opalite: building colors six ways, palettes from a photo, harmonies, every color code, contrast checks, and drawing with your palette.',
          thumbnailUrl: `${SITE_URL}/video/opalite-preview-poster.webp`,
          contentUrl: `${SITE_URL}/video/opalite-preview.mp4`,
          uploadDate: '2026-11-18',
          duration: 'PT30S',
        },
      }}
    />
  );
}
