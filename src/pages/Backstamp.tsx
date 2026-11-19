import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import { findApp } from '../data/apps';
import icon from '../assets/backstamp/icon.png';

// Backstamp's own palette: accent teal (the app's AccentColor), amber for
// "this will change your library", print teal from the icon.
const ACCENT_COLOR = '#138A80';

const app = findApp('backstamp')!;

// Press kit: run `npm run press -- backstamp` once `comingSoon` is removed in src/data/catalog.mjs.
const screens = screensFromGlob(
  import.meta.glob('../assets/backstamp/screens/*', { eager: true, import: 'default' })
);

export default function Backstamp() {
  return (
    <AppShowcase
      name="Backstamp"
      heading="Backstamp"
      tagline="Fix missing and wrong photo dates and merge duplicates in Apple Photos. Every photo gets its date back."
      icon={icon}
      accentColor={ACCENT_COLOR}
      app={app}
      requirements={['macOS 26 or later', 'Works with iCloud Photos', 'Data Not Collected']}
      screens={screens}
      heroLayout="wide"
      preview={{
        src: '/video/backstamp-preview.mp4',
        poster: '/video/backstamp-preview-poster.webp',
        width: 1920,
        height: 1080,
        caption:
          'Thirty seconds of Backstamp: spot every wrong date, see the evidence, merge duplicates, check a folder before you import, and apply only when you are ready.',
      }}
      heroPills={['Metadata', 'Filenames', 'Library matches', 'Phone file sequences']}
      screensClassName="bg-well"
      about={{
        title: 'Photos in the wrong place get their date back',
        intro:
          'A scan, an import, or a photo sent to you in a message lands on today’s date, and your Photos timeline stops making sense. A backstamp is the date a photo lab printed on the back of a print. Backstamp finds the date each photo should have and puts it back.',
        sections: [
          {
            title: 'It shows its evidence',
            body: 'For every suggestion, Backstamp lists each source it found and how sure it is: the dates inside the file, a date in the filename, a near-identical copy elsewhere in your library, a phone’s file-number sequence, and version clues that camera and messaging apps leave behind. Accept the confident ones in one step, review the rest, or set a date by hand.',
          },
          {
            title: 'Merge duplicates, keep the best',
            body: 'Find duplicate photos and videos and merge them. The copy you pick stays, and it keeps your favorites, the earliest date, the location, and its albums. The rest go to Recently Deleted, where Photos holds them for 30 days.',
          },
          {
            title: 'Check a folder before you import',
            body: 'Backstamp sorts every file in a folder into new, already in Photos, or duplicate in the folder, then moves the extras aside or copies only the new ones. Your library stays clean before anything goes in.',
          },
          {
            title: 'Safe by design',
            body: 'Scanning and reading never change your library. Nothing changes until you click Apply, and the confirmation says how many items it affects. Every change is written to an undo journal first, and you can revert it from History.',
          },
          {
            title: 'Private',
            body: 'Everything runs on your Mac. There is no account, no analytics, and nothing is collected. The only network use is Apple’s own iCloud Photos downloads when a file has to be read.',
          },
          {
            title: 'Free to start',
            body: 'Download, scan, and review for free, with every suggestion and its evidence, plus 25 free fixes. Backstamp Unlimited is a one-time $4.99 purchase with Family Sharing and no subscription. Undo and History are always free.',
          },
        ],
        features: [
          {
            icon: '🗓️',
            title: 'Missing and wrong dates',
            description: 'Finds photos and videos with no date or a date that is clearly wrong, and suggests the real one.',
          },
          {
            icon: '🔎',
            title: 'Evidence for every date',
            description: 'Each suggestion names its source and its confidence, so you decide with the facts in front of you.',
          },
          {
            icon: '🎞️',
            title: 'Video too',
            description: 'Reads QuickTime dates from videos, streaming only what it needs from the original.',
          },
          {
            icon: '🧬',
            title: 'Duplicates',
            description: 'Groups near-identical photos and videos with a strictness slider, and keeps your favorites, earliest date, location, and albums.',
          },
          {
            icon: '📥',
            title: 'Import Check',
            description: 'Compare a folder with your library before you import: new, already in Photos, or duplicate in the folder.',
          },
          {
            icon: '↩️',
            title: 'Undo and History',
            description: 'Every change is journaled before it is made. Revert a batch of dates from History, any time.',
          },
        ],
        footnote:
          'Backstamp is a native Mac app for macOS 26 or later, with no account and no data collected. It is free to download with 25 free fixes, and is coming soon to the Mac App Store.',
      }}
      jsonLd={{
        name: 'Backstamp: Photo Date Fixer',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'macOS 26',
        inLanguage: ['en'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }}
    />
  );
}
