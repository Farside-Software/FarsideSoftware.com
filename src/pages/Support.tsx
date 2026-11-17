import { Link } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SplitSection, { rowClass } from '../components/SplitSection';
import GlassButton from '../components/GlassButton';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { apps } from '../data/apps';
import { CONTACT_EMAIL } from '../config/site';

interface Faq {
  q: string;
  a: string;
}

const common: Faq[] = [
  {
    q: 'I bought an unlock on one device. How do I get it on my other devices?',
    a: 'Purchases are tied to your Apple Account. On the other device, open the app, go to the upgrade screen, and tap Restore Purchases. Make sure both devices are signed in with the same Apple Account.',
  },
  {
    q: 'My data is not syncing between devices.',
    a: 'Sync runs through your private iCloud database. Check that iCloud Drive is on for the app in Settings > [your name] > iCloud, that both devices use the same Apple Account, and give it a few minutes on Wi-Fi. Sync is never instant, but it should settle within a few minutes.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Refunds for App Store purchases are handled by Apple at reportaproblem.apple.com. If something is broken, email first and I will do my best to fix it.',
  },
];

const perApp: Record<string, Faq[]> = {
  maestro: [
    {
      q: 'The car will not play my show.',
      a: 'Export both files (the .fseq and the audio) into a folder named LightShow at the root of a USB drive formatted as exFAT or FAT32, plug it into a front USB port, then open Toybox > Light Show on the car.',
    },
    {
      q: 'Where is the Sequence Editor?',
      a: 'The channel-level Sequence Editor is a Mac feature. Shows sync through iCloud, so you can choreograph on iPhone or iPad and fine-tune on the Mac.',
    },
    {
      q: 'Do you track what I export?',
      a: 'Each export sends an anonymous count to api.molargiksoftware.com so the site can show a running total. No song, show, or device details are included.',
    },
  ],
  opalite: [
    {
      q: 'What does Onyx include?',
      a: 'Unlimited palettes, the drawing canvas, community downloads, and every export format (Procreate, Adobe ASE, SwiftUI, CSS, GIMP/GPL, PDF). It is a single $9.99 purchase, not a subscription.',
    },
    {
      q: 'Who can see my palettes?',
      a: 'Nobody unless you publish them. The Community tab is opt-in; only palettes you choose to publish, with the display name you set, appear there. Everything else lives in your private iCloud.',
    },
    {
      q: 'Can I see my colors on the web?',
      a: 'Yes. Opalite Web at farsidesoftware.com/opalite-web signs you in with your Apple Account and shows the palettes synced from the app.',
    },
  ],
  setdeck: [
    {
      q: 'Is anything paid?',
      a: 'No. SetDeck is completely free with no accounts, ads, or in-app purchases.',
    },
    {
      q: 'Workouts are not showing up in Apple Health.',
      a: 'Open Settings > Health > Data Access & Devices > SetDeck and allow writing workouts, water, and dietary energy. SetDeck only reads and writes the categories you approve.',
    },
    {
      q: 'The Apple Watch app is not showing my routine.',
      a: 'The watch gets today’s routine from the iPhone. Make sure the watch is paired with the iPhone that holds your routine, open SetDeck on that iPhone once, then tap Refresh or Retry in the watch app.',
    },
  ],
  mygra: [
    {
      q: 'What is in Mygra Plus?',
      a: 'The on-device Migraine Assistant, per-migraine insights, weather correlations and risk alerts, and the full stats suite. $2.99 a month or $14.99 a year with a 7-day free trial, or $29.99 once.',
    },
    {
      q: 'Weather correlations show nothing.',
      a: 'Mygra asks for your location only at the moment you log a migraine so it can fetch that day\'s conditions from WeatherKit. Allow location "While Using" and log a few migraines; correlations appear once there is enough history.',
    },
    {
      q: 'Is my health data shared?',
      a: 'No. Mygra reads from and writes to Apple Health on your device, and insights are generated on-device with Apple Intelligence. Nothing is sent to us.',
    },
  ],
  stork: [
    {
      q: 'Is Stork HIPAA compliant?',
      a: 'Stork is designed so you never need to enter protected health information: deliveries are logged as counts, methods, and your own notes. Data stays on your device and in your private iCloud; it is never sent to us.',
    },
    {
      q: 'What does Stork Pro unlock?',
      a: 'Milestone share cards, PDF and CSV export, the insight cards and the heat map, alternate icons, weather at each delivery, and Lock Screen widgets, for a single $4.99 purchase. Logging deliveries, the jar, and the basic dashboard cards are free.',
    },
    {
      q: 'Can I export my deliveries?',
      a: 'Yes. Stork Pro exports a PDF report or a CSV of your full delivery log from the Export screen.',
    },
  ],
  waffle: [
    {
      q: 'Does Waffle run on iPhone?',
      a: 'Yes. Waffle runs on iPhone and iPad with iOS or iPadOS 26 or later. iPad shows a grid of pages; iPhone shows two live pages at once.',
    },
    {
      q: 'What does Syrup unlock?',
      a: 'On iPad: larger grids up to 4x4, rearranging, pop-out windows, fullscreen, and saved presets. On iPhone: unlimited saved layouts. One $4.99 purchase covers iPhone and iPad.',
    },
    {
      q: 'A site will not load in a cell.',
      a: 'Some sites block being embedded. Try popping the cell out into its own window; if it still fails, email the URL and I will take a look.',
    },
  ],
};

function FaqList({ items }: { items: Faq[] }) {
  return (
    <dl>
      {items.map((f) => (
        <div key={f.q} className={rowClass}>
          <dt>
            <h3 className="text-xl font-extrabold tracking-[-0.02em] text-ink">{f.q}</h3>
          </dt>
          <dd className="mt-3 text-lg leading-relaxed text-muted">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Support() {
  useRouteMeta();

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Support"
        lead={
          <>
            Every app is built and supported by one person, so you will hear back from the developer. Start with the
            answers below, then email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-link underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>{' '}
            with the app name, your device, and what happened.
          </>
        }
      >
        <nav aria-label="Apps" className="flex flex-wrap gap-2">
          {apps.map((app) => (
            <a
              key={app.slug}
              href={`#${app.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line/20 px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-line/[0.04] hover:text-ink"
            >
              <img src={app.icon} alt="" width={20} height={20} className="h-5 w-5 rounded-md" />
              {app.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      <SplitSection id="every-app" title="Every app" tone="well">
        <FaqList items={common} />
      </SplitSection>

      {apps.map((app, i) => (
        <SplitSection
          key={app.slug}
          id={app.slug}
          tone={i % 2 === 0 ? 'page' : 'well'}
          title={
            <span className="flex items-center gap-4">
              <img src={app.icon} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 shrink-0 rounded-xl" />
              {app.name}
            </span>
          }
          intro={
            <p className="text-base">
              <span className="tabular-nums">{app.price}</span> ·{' '}
              <Link to={app.path} className="text-link underline underline-offset-4">
                About {app.name}
              </Link>
            </p>
          }
        >
          <FaqList items={perApp[app.slug] ?? []} />
        </SplitSection>
      ))}

      <section className="reveal border-b border-line/10 bg-page py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">Still stuck?</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Email is fastest. Include screenshots if you can; nothing you send is shared.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GlassButton href={`mailto:${CONTACT_EMAIL}`} size="md">
              <Mail size={18} aria-hidden="true" /> Email support
            </GlassButton>
            <GlassButton to="/privacy" tone="ghost" size="md">
              <ShieldCheck size={18} aria-hidden="true" /> Privacy policy
            </GlassButton>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
