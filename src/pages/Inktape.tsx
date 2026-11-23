import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import icon from '../assets/inktape/icon.png';

// Inktape's AccentColor (light appearance): the navy of its store art.
const ACCENT_COLOR = '#2B3A8C';

// Inktape is not in src/data/catalog.mjs yet, so this page is linked from
// nowhere on the site, stays out of the sitemap, and is marked noindex
// (src/seo/routes.mjs). Its copy comes from the cold-read-tested App Store
// listing (Apps/Inktape/Store/App Store listing.md): marketing lines never
// speak as the company ("Inktape", never "we" or "our"), never say "the room",
// and never claim that nothing leaves the device (iCloud sync is on by default).
// When it launches: add it to the catalog, drop the route's noindex, and
// replace comingSoon with its App Store link.
const screens = screensFromGlob(
  import.meta.glob('../assets/inktape/screens/*', { eager: true, import: 'default' })
);

export default function Inktape() {
  return (
    <AppShowcase
      name="Inktape"
      heading="Inktape"
      tagline="Notes you can play back. Record a lecture, a meeting or an interview and take notes while it runs. Later, tap any word, note or pen stroke and hear exactly what was being said when you wrote it."
      icon={icon}
      accentColor={ACCENT_COLOR}
      path="/inktape"
      comingSoon
      comingSoonStore="App Store"
      price="Free, Inktape Pro one-time"
      priceDetail="Recording, notes and replay are free for as long as you like. One purchase, not a subscription, adds full-length transcripts, summaries and answers."
      requirements={['iOS 27.1+', 'iPadOS 27.1+', 'Data Not Collected']}
      screens={screens}
      about={{
        title: 'Tap a note, hear the moment',
        intro:
          'Inktape is a notebook with a recorder built in. Everything you write, type or mark is tied to its moment in the audio, so your notes can be short. The recording has the rest.',
        sections: [
          {
            title: 'Record and write',
            body: 'A live transcript appears as people speak. Write by hand with Apple Pencil or your finger, type, or add a photo, and dog-ear (bookmark) a moment with one tap. Inktape keeps recording with the screen locked, and shows the running time on your Lock Screen.',
          },
          {
            title: 'Tap to hear it again',
            body: 'Tap a word in the transcript, a line of handwriting, a typed note, a photo or a dog-ear, and playback starts there. Replay a page and watch your handwriting appear as it was written. Correct a misheard word with a tap, and trim the start and end of a recording.',
          },
          {
            title: 'Write on your slides',
            body: 'Bring in a PDF of the slides and write on each one. Tap a slide to hear what was said while it was up.',
          },
          {
            title: 'Private',
            body: 'Recording and transcription happen on your device. Inktape has no servers and no account, so there is nowhere for your recordings to be sent. Sync uses your own iCloud account to keep sessions on your other devices. Turn it off in Settings and they stay on the device. No ads, no analytics, no tracking.',
          },
          {
            title: 'What is free',
            body: 'Recording of any length, handwriting, typed notes, photos, dog-ears, replay, search, and export of your audio and plain-text notes. The free transcript covers the first 15 minutes of each session. The rest is still recorded, and still plays when you tap your notes.',
          },
          {
            title: 'Inktape Pro',
            body: 'One purchase, not a subscription, with Family Sharing. It adds transcripts of a whole session, however long, and a summary, highlights and action items, ready when you stop recording. Ask a question about anything you have recorded and get an answer with the moment it came from.',
          },
        ],
        features: [
          {
            icon: '🎙️',
            title: 'Live transcript',
            description: 'A live transcript appears as people speak, transcribed on your device.',
          },
          {
            icon: '✍️',
            title: 'Tap to hear it again',
            description: 'Tap a word, a line of handwriting, a typed note, a photo or a dog-ear, and playback starts there.',
          },
          {
            icon: '📑',
            title: 'Write on your slides',
            description: 'Bring in a PDF of the slides and write on each one.',
          },
          {
            icon: '🔎',
            title: 'Find it later',
            description: 'Search every session, handwriting included.',
          },
          {
            icon: '⚡️',
            title: 'Start from anywhere',
            description: 'Start a recording from Siri, the Action button, a widget or Control Center.',
          },
          {
            icon: '📱',
            title: 'iPhone, iPad and iPhone Duo',
            description: 'On iPad, the transcript and your page sit side by side. On iPhone Duo, Inktape has layouts for the phone closed, half open and open.',
          },
        ],
        footnote:
          'Summaries and answers are written on your device with Apple Intelligence where it is available. Where it is not, a simpler built-in summary is used. Before you record, Inktape reminds you to ask the people you are recording.',
      }}
      jsonLd={{
        name: 'Inktape: Audio Notebook',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'iOS 27.1, iPadOS 27.1',
        inLanguage: ['en'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }}
    />
  );
}
