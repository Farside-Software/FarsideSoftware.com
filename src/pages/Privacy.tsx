import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { apps } from '../data/apps';
import { CONTACT_EMAIL, LEGAL_NAME } from '../config/site';

export const PRIVACY_EFFECTIVE_DATE = '2026-11-17';

interface AppPolicy {
  slug: string;
  stores: string;
  frameworks: ReactNode[];
  leaves: ReactNode;
}

const policies: AppPolicy[] = [
  {
    slug: 'maestro',
    stores: 'Your songs, the light shows Maestro writes for them, fleet layouts, and settings.',
    frameworks: [
      <>Audio analysis runs entirely on your device. Songs are never uploaded.</>,
      <>Shows sync between your devices through your private iCloud database.</>,
    ],
    leaves: (
      <>
        When you export a show, Maestro sends a single anonymous ping to <code>api.molargiksoftware.com</code> that
        increments a public counter. The ping contains no song, show, account, or device details, and no identifier
        that could link exports together.
      </>
    ),
  },
  {
    slug: 'opalite',
    stores: 'Your colors, palettes, tags, notes, canvases, and settings.',
    frameworks: [
      <>Camera and photo access is used only to sample colors on your device; images are not stored or uploaded.</>,
      <>AI color naming runs on-device with Apple Intelligence.</>,
      <>Your library syncs through your private iCloud database. Opalite Web reads that same database after you sign in with your Apple Account.</>,
    ],
    leaves: (
      <>
        Only what you publish. The Community is optional: when you publish a palette, that palette and the display name
        you chose are stored in Opalite&rsquo;s public CloudKit database and are visible to every Opalite user. You can
        unpublish at any time, and nothing else from your library is shared.
      </>
    ),
  },
  {
    slug: 'setdeck',
    stores: 'Your routines, exercises, logged sets, achievements, hydration and calorie entries, and settings.',
    frameworks: [
      <>Apple Health: with your permission SetDeck writes workouts, water, and dietary energy, and reads them back for your totals. Health data is handled on-device under Apple&rsquo;s HealthKit rules and is never sent to us.</>,
      <>On-device muscle group suggestions use Apple Intelligence.</>,
      <>Your data syncs through your private iCloud database.</>,
    ],
    leaves: <>Nothing. SetDeck has no server of its own.</>,
  },
  {
    slug: 'mygra',
    stores: 'Your migraine log, triggers, notes, insights, and settings.',
    frameworks: [
      <>Apple Health: with your permission Mygra reads the metrics you choose (sleep, water, caffeine, steps, heart rate, and others) and writes completed migraines back as headaches. All of it stays on-device.</>,
      <>WeatherKit: when you log a migraine, Mygra asks for your location at that moment to fetch the conditions for that place and time. Your location is used for that request only and is not stored as a history or shared with us.</>,
      <>The Migraine Assistant and per-migraine insights run on-device with Apple Intelligence.</>,
      <>Your journal syncs through your private iCloud database.</>,
    ],
    leaves: <>Nothing. Weather requests go from your device to Apple&rsquo;s WeatherKit service under Apple&rsquo;s privacy policy.</>,
  },
  {
    slug: 'stork',
    stores: 'Your delivery entries (counts, methods, measurements, tags, and your own notes), milestones, and settings.',
    frameworks: [
      <>Apple Health: optional, used on-device for the metrics you choose to show on your dashboard.</>,
      <>WeatherKit: when you log a delivery, Stork can record the conditions at that moment using your location for that request only.</>,
      <>Your log syncs through your private iCloud database. PDF and CSV exports are created on your device and go wherever you send them.</>,
    ],
    leaves: <>Nothing. Stork is designed so you never need to enter patient information, and nothing you enter is sent to us.</>,
  },
  {
    slug: 'waffle',
    stores: 'Your grid layouts, presets, and settings.',
    frameworks: [
      <>Web content loads in standard WebKit views, so the sites you visit see the same request a browser would send.</>,
      <>Layouts and presets sync through your private iCloud database.</>,
    ],
    leaves: <>Nothing. Browsing history is not collected by Waffle or sent to us.</>,
  },
  {
    slug: 'backstamp',
    stores: 'An undo journal of the changes you apply, and cached scan results (fingerprints and filenames of photos), all in its own folder on your Mac. It does not copy or keep your photos.',
    frameworks: [
      <>Photos: with your permission Backstamp reads your Photos library to find missing and wrong dates and duplicates, and changes it only when you click Apply. Merged copies go to Recently Deleted.</>,
      <>When a photo is kept in iCloud Photos, macOS downloads the original for Backstamp to read. That is Apple&rsquo;s own service and happens between your Mac and Apple.</>,
      <>Photo analysis, including the Vision framework, runs on your Mac. Purchases go through StoreKit and your Apple Account.</>,
    ],
    leaves: <>Nothing. Backstamp has no account, no analytics, and makes no network requests of its own.</>,
  },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line/10 pt-10 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-2xl font-extrabold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="max-w-3xl space-y-3 text-lg leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function Privacy() {
  useRouteMeta();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const effective = new Date(`${PRIVACY_EFFECTIVE_DATE}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <main className="min-h-screen bg-page">
        <PageHeader
          eyebrow="Privacy"
          title="Privacy Policy"
          lead={<>One policy for every {LEGAL_NAME} app and this website. Effective {effective}.</>}
        />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 lg:grid-cols-12">
          <div className="rounded-2xl border border-line/10 bg-panel px-6 py-5 lg:col-span-9 lg:col-start-4">
            <p className="text-base leading-relaxed text-ink">
              <strong>The short version.</strong> Our apps keep your data on your device and in your own iCloud
              account. We do not run analytics SDKs, we do not show ads, we do not sell or share your data, and in
              most apps we never receive it at all. The exceptions are spelled out below: Opalite&rsquo;s opt-in
              Community, Maestro&rsquo;s anonymous export counter, and the contact form on this site.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12">
          <nav aria-label="Contents" className="text-sm text-muted lg:col-span-3">
            <ul className="list-none space-y-2 p-0 lg:sticky lg:top-28">
              <li><a href="#every-app" className="underline underline-offset-4 hover:text-ink">Every app</a></li>
              {apps.map((a) => (
                <li key={a.slug}><a href={`#${a.slug}`} className="underline underline-offset-4 hover:text-ink">{a.name}</a></li>
              ))}
              <li><a href="#website" className="underline underline-offset-4 hover:text-ink">Website</a></li>
              <li><a href="#rights" className="underline underline-offset-4 hover:text-ink">Your choices</a></li>
              <li><a href="#contact" className="underline underline-offset-4 hover:text-ink">Contact</a></li>
            </ul>
          </nav>

          <div className="min-w-0 space-y-10 lg:col-span-9">
      <Section id="every-app" title="What applies to every app">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No accounts.</strong> None of our apps ask you to create an account with us. Purchases and restores go through your Apple Account.</li>
          <li><strong>On-device first.</strong> Everything you enter is stored on your device by the app.</li>
          <li><strong>iCloud private sync.</strong> Each app syncs its data between your devices through the private database of your own iCloud account, using Apple&rsquo;s CloudKit. We cannot read that database; only you, signed in with your Apple Account, can.</li>
          <li><strong>No analytics SDKs, no ads, no trackers.</strong> We do not embed third-party analytics, advertising, or attribution frameworks in any app.</li>
          <li><strong>No selling or sharing.</strong> We do not sell, rent, or share personal data with anyone. We have no data to sell.</li>
          <li><strong>Apple&rsquo;s own services.</strong> Where an app uses Apple frameworks (HealthKit, WeatherKit, Apple Intelligence, CloudKit, StoreKit), your use of them is also covered by <a href="https://www.apple.com/legal/privacy/" className="text-link underline underline-offset-4">Apple&rsquo;s privacy policy</a>. Apple may share aggregated, anonymous crash and usage statistics with us only if you have opted in to sharing with developers in iOS Settings.</li>
          <li><strong>Children.</strong> Our apps are not directed at children under 13 and we do not knowingly collect data from them.</li>
        </ul>
      </Section>

      {apps.map((app) => {
        const policy = policies.find((p) => p.slug === app.slug);
        if (!policy) return null;
        return (
          <Section key={app.slug} id={app.slug} title={app.storeName}>
            <p><strong>What it stores:</strong> {policy.stores}</p>
            <p><strong>How it uses Apple frameworks:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              {policy.frameworks.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <p><strong>What leaves your device to us:</strong> {policy.leaves}</p>
          </Section>
        );
      })}

      <Section id="website" title="This website">
        <p>
          farsidesoftware.com is a static site hosted on GitHub Pages. It sets no cookies of its own. If you
          use the contact form, your name, email address, and message are delivered to us by EmailJS so we can
          reply; they are kept only in our mailbox and are never used for marketing. Opalite Web signs you in
          with your Apple Account through CloudKit JS and reads your own Opalite library; nothing from it is
          stored on our servers. If we enable privacy-preserving, cookieless traffic analytics (Cloudflare Web
          Analytics), it records page views without identifying visitors.
        </p>
      </Section>

      <Section id="rights" title="Your choices">
        <ul className="list-disc pl-6 space-y-2">
          <li>Delete an app and its data is removed from that device. Turning off iCloud for the app in Settings, or deleting the app&rsquo;s data in Settings &gt; Apple Account &gt; iCloud &gt; Manage Storage, removes the synced copy.</li>
          <li>Permissions for Health, location, camera, and photos can be changed at any time in iOS Settings; the apps keep working with whatever you allow.</li>
          <li>Palettes you published to the Opalite Community can be unpublished from inside Opalite, which removes them from the public database.</li>
          <li>Email us to ask what, if anything, we hold about you (for most people the answer is nothing beyond any email you sent us) or to have it deleted.</li>
        </ul>
      </Section>

      <Section id="changes" title="Changes to this policy">
        <p>
          When an app gains a feature that changes how data is handled, this page is updated and the effective
          date above moves. Material changes are also noted in that app&rsquo;s App Store release notes.
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p>
          {LEGAL_NAME}, Indiana, USA. Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>{' '}
          or use the <Link to="/contact" className="text-link underline underline-offset-4">contact form</Link>.
        </p>
      </Section>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
