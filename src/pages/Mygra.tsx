import AppShowcase from '../components/AppShowcase';
import MygraDevicePreviews from '../components/MygraDevicePreviews';
import { screensFromGlob } from '../utils/screens';
import { findApp } from '../data/apps';
import icon from '../assets/mygra/icon.png';

// Official brand color: Mygra Purple
const ACCENT_COLOR = '#6E60FF';
const APP_STORE_URL = 'https://apps.apple.com/us/app/mygra/id6747298583';

const app = findApp('mygra')!;

const screens = screensFromGlob(
  import.meta.glob('../assets/mygra/screens/*', { eager: true, import: 'default' })
);

export default function Mygra() {
  return (
    <AppShowcase
      name="Mygra"
      tagline="A calm, private migraine journal. Log an attack in seconds and keep a clear record."
      icon={icon}
      accentColor={ACCENT_COLOR}
      app={app}
      githubUrl="https://github.com/Farside-Software/Mygra"
      requirements={['iOS 18+', 'iPadOS 18+', 'watchOS 10+', 'visionOS 2+']}
      screens={screens}
      screensClassName="bg-well"
      preview={{
        src: '/video/mygra-preview.mp4',
        poster: '/video/mygra-preview-poster.webp',
        width: 720,
        height: 1560,
        caption:
          'Thirty seconds of Mygra: log an attack, follow it from the Lock Screen, and see your history on the dashboard and calendar.',
      }}
      afterScreens={<MygraDevicePreviews accentColor={ACCENT_COLOR} />}
      about={{
        title: 'Mygra: Migraine Tracker',
        intro:
          'Mygra is a calm, private migraine journal. Log an attack in seconds, attach how you slept and what the weather was doing, and watch your history take shape. Everything stays on your device and in your own iCloud, and connects with Apple Health for the full picture.',
        sections: [
          {
            title: 'Log an Attack in Seconds',
            body: 'Record start and end times, pain and stress on a 0–10 scale, triggers from a curated list (or your own), medications, foods, and notes. Follow an attack as it happens with a Live Activity on your Lock Screen and in the Dynamic Island, where Pain - and + buttons and an End button work without opening the app. Health and weather are attached automatically, so each entry records how you slept, what you drank, and the conditions outside.',
          },
          {
            title: 'Attack Mode',
            body: 'One tap starts a migraine and switches to a dim, quiet screen, and you log the details later. Start it from a widget, Control Center, Siri, or Apple Watch.',
          },
          {
            title: 'A Free Dashboard and Calendar',
            body: 'The dashboard shows this month against last month, a 30-day calendar strip, your most-logged triggers and medications, and when your migraines tend to start. The calendar is colored by severity, and your history is searchable and grouped by month, with pins, tags, and filters.',
          },
          {
            title: 'Mygra Plus',
            body: 'Plus adds the insight layer when you want it. The Migraine Assistant is on-device Apple Intelligence that can look up your actual entries and streams its answers as it writes. Quick Bits and trigger analysis show trends across triggers, sleep, hydration, and weather. Weather alerts notify you when barometric pressure or the weather changes sharply. Cycle Insights show how your attacks line up with your menstrual cycle. Doctor-ready PDF reports and CSV export put your full history in your hands.',
          },
          {
            title: 'Private by Design',
            body: 'Your data lives on your device and in your personal iCloud. Mygra has no accounts, no servers, and no tracking. AI analysis never leaves your device.',
          },
        ],
        features: [
          {
            icon: '📝',
            title: 'Fast, Detailed Logging',
            description:
              'Start and end times, pain and stress, triggers, medications, foods, notes, and a Live Activity that follows an attack in progress.',
          },
          {
            icon: '🌙',
            title: 'Attack Mode',
            description:
              'One tap starts a migraine and switches to a dim, quiet screen. Log the details later. Start it from a widget, Control Center, Siri, or Apple Watch.',
          },
          {
            icon: '📊',
            title: 'A Free Dashboard',
            description:
              'This month against last month, a 30-day calendar strip, your most-logged triggers and medications, and when your migraines tend to start.',
          },
          {
            icon: '🗓️',
            title: 'Calendar and History',
            description:
              'A calendar colored by severity, plus a searchable history grouped by month, with pins, tags, and filters.',
          },
          {
            icon: '🤖',
            title: 'Migraine Assistant (Plus)',
            description:
              'Chat with on-device Apple Intelligence that can look up your actual entries and streams its answers as it writes. Every word stays on your device. Part of Mygra Plus.',
          },
          {
            icon: '🌦️',
            title: 'Weather and Pressure',
            description:
              'Weather is attached to each entry automatically. With Plus, Quick Bits and trigger analysis show trends across triggers, sleep, hydration, and weather, and weather alerts notify you when pressure or conditions change sharply.',
          },
          {
            icon: '🔄',
            title: 'Cycle Insights (Plus)',
            description:
              'See how your attacks line up with your menstrual cycle. Part of Mygra Plus.',
          },
          {
            icon: '📄',
            title: 'Doctor-Ready Reports (Plus)',
            description:
              'Turn your history into a clean PDF report for your next appointment, or export everything as CSV. Part of Mygra Plus.',
          },
          {
            icon: '❤️',
            title: 'Apple Health',
            description:
              'Health data is attached to each entry, and completed migraines are written back to Apple Health as headaches.',
          },
          {
            icon: '🗣️',
            title: 'Siri and Shortcuts',
            description:
              'Ask when your last migraine was or how many you have had this month, log a medication or a trigger, start or end a migraine by voice, and use the water and caffeine actions.',
          },
          {
            icon: '⌚',
            title: 'Apple Watch and Widgets',
            description:
              'An Apple Watch app and complication, and a Home Screen widget with days since your last migraine.',
          },
          {
            icon: '📱',
            title: 'Built for iPhone Duo',
            description:
              'When unfolded, detail pages use two columns, the calendar sits beside the day\u2019s list, and Settings becomes a split view. A pain badge shows in the Duo\u2019s strip while a migraine is in progress. Mygra also runs on iPad and Apple Vision Pro, in English, Spanish, French (Canada), and Japanese.',
          },
          {
            icon: '💎',
            title: 'Simple Pricing',
            description:
              'Free forever: logging, history, calendar, Apple Health, Apple Watch, Siri, and the dashboard. Mygra Plus adds the Migraine Assistant, Quick Bits, weather alerts, Cycle Insights, PDF reports, and CSV export for $2.99 a month, $14.99 a year with a 7-day free trial, or $29.99 once, with Family Sharing. Bought Mygra before 2.0? Plus is yours free for life.',
          },
        ],
        footnote:
          'Mygra is free to download; Mygra Plus is an optional upgrade. Mygra is a journal, not a medical device. Insights are for informational purposes only and are not medical advice. The Migraine Assistant requires Apple Intelligence.',
      }}
      jsonLd={{
        name: 'Mygra',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'iOS, iPadOS, watchOS, visionOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
      }}
    />
  );
}
