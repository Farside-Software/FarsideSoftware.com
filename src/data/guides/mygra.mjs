// Mygra how-to guides.
//
// Every step and on-screen label here was read from the Mygra app source
// (marketing version 2.3.0): the SwiftUI views, the Info.plist, the widget and
// App Intents targets, and the Apple Watch app. Details that could not be
// confirmed in the source were left out or described generically. These guides
// describe how to use the app and give no medical advice. No prices belong in
// this file.
//
// Body blocks: a string is a paragraph, { ul: [...] } a bullet list, and
// { ol: [...] } a numbered list. Inline links use [label](/path) and are only
// for internal paths.

export const hub = {
  title: 'Mygra',
  blurb: 'Log a migraine, start Attack Mode, and connect Apple Health.',
};

export const app = {
  slug: 'mygra',
  heading: 'Want a simpler way to keep a migraine journal?',
  blurb: 'Mygra is a private migraine journal for iPhone, iPad, Apple Watch, and Apple Vision Pro. Logging is free, and Mygra Plus is optional.',
  button: 'Get Mygra on the App Store',
  notice:
    'Mygra is an independent app from Farside Software. It is a journal, not a medical device, and nothing in these guides is medical advice. Apple, Apple Health, Apple Watch, iPhone, and iPad are trademarks of Apple Inc.',
  checked: 'Mygra 2.3.0 source, with its screen labels re-checked against the 3.0 source',
  checkedOn: 'November 18, 2026',
  checkedIso: '2026-11-18',
};

export default [
  // ---------------------------------------------------------------- 1
  {
    slug: 'mygra-log-a-migraine',
    app: 'mygra',
    og: '/og/mygra.png',
    short: 'How to log a migraine in Mygra',
    title: 'How to Log a Migraine in Mygra',
    h1: 'How to log a migraine in Mygra',
    description:
      'Open the New Migraine form, set the start time, rate pain and stress, add triggers and notes, then save. Also how to log one that is still going and end it.',
    summary: 'The New Migraine form, ongoing migraines, and ending one.',
    intro: [
      'Mygra keeps a record of each migraine: when it started and ended, how strong it was, and the notes you add. You can log one after it is over, or start it while it is still going and finish it later.',
      'This guide walks through the New Migraine form and what happens after you save. If you want a faster, darker way to start a migraine, see [how to start Attack Mode](/guides/mygra-start-attack-mode).',
    ],
    sections: [
      {
        h2: 'Open the New Migraine form',
        body: [
          'On iOS 26 and later, tap Log a Migraine in the strip just above the tab bar. On iOS 18 through 25, tap the plus button at the top right, labeled New Migraine. Both open the same form.',
          'The form has a Cancel button at the top left and a save button at the top right.',
        ],
      },
      {
        h2: 'Fill in the form',
        body: [
          'Every section is optional except the times, which must make sense. The sections, from top to bottom:',
          {
            ul: [
              'Duration: set Started. Turn on Ongoing if the migraine has not ended, or leave it off and set Ended.',
              'Context: Mygra pulls Apple Health and local weather for the time window and attaches them for you. You do not enter anything here.',
              'Experience: set Pain Level and Stress Level, each from 0 to 10. A Pin this migraine switch keeps it at the top of your list.',
              'Possible Triggers: search the list, pick the ones that apply, or type your own under Add custom trigger.',
              'Food Sensitivities: list foods eaten around that time.',
              'Notes: add any details you want to remember.',
            ],
          },
          'Tap Save when you are done. If Ongoing is on, the button says Start instead. If the end time is before the start time, Mygra shows a Cannot Save message and asks you to fix it.',
        ],
      },
      {
        h2: 'Log a migraine that is still going',
        body: [
          'Turn on Ongoing and tap Start. Mygra opens the migraine’s detail screen, titled Ongoing Migraine. The form notes that Mygra also starts a Live Activity to show how long it has lasted.',
          'To record how it is changing, find Intensity Over Time on the detail screen and tap Update. In the Update Intensity sheet, adjust Pain Level and Stress Level, add an optional quick note, and tap Save.',
          'When it is over, tap End Migraine. In the End Migraine sheet, choose the End Date and tap End. The end time must be after the start time.',
          'Mygra allows one ongoing migraine at a time. If you try to log a new one, it tells you to end the current one first and offers View Ongoing.',
        ],
      },
      {
        h2: 'After you save',
        body: [
          'A saved migraine appears in the Migraines tab. Open it to see its details. Tap Pin or Unpin at the top right to keep it at the top of the list.',
          'For a migraine that has ended, the More menu at the top right has Modify, to change what you entered, and Delete Migraine. Mygra asks you to confirm a delete and says it cannot be undone.',
        ],
      },
    ],
    steps: [
      { name: 'Open the form', text: 'Tap Log a Migraine above the tab bar on iOS 26 and later, or the plus button labeled New Migraine on iOS 18 through 25.' },
      { name: 'Set the times', text: 'Under Duration, set Started. Turn on Ongoing if it has not ended, or set Ended.' },
      { name: 'Rate pain and stress', text: 'Under Experience, set Pain Level and Stress Level from 0 to 10.' },
      { name: 'Add triggers, foods, and notes', text: 'Pick triggers or add your own, list foods under Food Sensitivities, and add anything else under Notes.' },
      { name: 'Save it', text: 'Tap Save, or Start if Ongoing is on. Mygra attaches Health and weather context automatically.' },
      { name: 'End it later if needed', text: 'For an ongoing migraine, open its detail screen, tap End Migraine, choose the End Date, and tap End.' },
    ],
    howTo: { name: 'How to log a migraine in Mygra' },
    faq: [
      {
        q: 'Can I log a migraine that already ended?',
        a: 'Yes. Leave Ongoing off, set Started and Ended, and tap Save. The date pickers do not allow times in the future.',
      },
      {
        q: 'Can I have two ongoing migraines at once?',
        a: 'No. Mygra shows an Ongoing Migraine message that says to end the current one before starting a new one, and offers View Ongoing.',
      },
      {
        q: 'Does Mygra attach weather to an older migraine?',
        a: 'Not for past dates. Mygra says it only attaches current conditions for migraines that started today. Health data is attached for the time window you choose.',
      },
    ],
    related: ['mygra-start-attack-mode', 'mygra-connect-apple-health'],
  },

  // ---------------------------------------------------------------- 2
  {
    slug: 'mygra-start-attack-mode',
    app: 'mygra',
    og: '/og/mygra.png',
    short: 'How to start Attack Mode in Mygra',
    title: 'How to Start Attack Mode in Mygra',
    h1: 'How to start Attack Mode in Mygra',
    description:
      'Start a migraine with one tap from the Lock Screen, Control Center, Siri, or Apple Watch, log pain and medication on a dark screen, and finish the entry later.',
    summary: 'Start a migraine in one tap and log it on a dark screen.',
    intro: [
      'Attack Mode is Mygra’s way to log a severe migraine with almost no light and very little to read. Starting it begins a migraine and opens a near-black screen with large buttons.',
      'Triggers and notes wait until the migraine is over. This guide covers the ways to start it, what the screen shows, and how to finish the entry afterward.',
    ],
    sections: [
      {
        h2: 'Ways to start Attack Mode',
        body: [
          'Attack Mode is set up to start from places you can reach without opening the app and finding a button:',
          {
            ul: [
              'Lock Screen widget: add the widget named Attack Mode. It reads Start Migraine until one is running, then shows the timer and reopens Attack Mode.',
              'Control Center and Lock Screen control: add the control named Start Migraine. It opens Mygra and starts Attack Mode.',
              'Siri and Shortcuts: say a phrase such as “I have a migraine, Mygra” or “Start tracking a migraine in Mygra.” The same Start Migraine shortcut appears in the Shortcuts app.',
              'Apple Watch: open Mygra on your watch and tap Start Migraine.',
            ],
          },
          'If a migraine is already running, these open it instead of starting a second one. You can also reopen the screen from an ongoing migraine’s detail screen by tapping Open Attack Mode.',
        ],
      },
      {
        h2: 'What the screen shows',
        body: [
          'The screen is near-black with dim, warm text. It shows the elapsed time under Attack in progress, and nothing else you have to read. Mygra dims its own screen only. It does not change your iPhone’s brightness.',
          {
            ul: [
              'Pain now: five large buttons, 2, 4, 6, 8, and 10. A word next to the heading names the current step: Mild, Moderate, Strong, Severe, or Worst.',
              'Took medication: large buttons for your usual medications. Mygra builds the list from doses you have logged before and shows a few common choices until you have some. After you tap one, a line says what was logged and at what time.',
              'End Attack: ends the migraine.',
              'Close: leaves Attack Mode without ending the migraine.',
            ],
          },
        ],
      },
      {
        h2: 'Log during an attack, then end it',
        body: [
          {
            ol: [
              'Start Attack Mode from the widget, control, Siri, or your watch.',
              'Tap the pain step that fits right now. Tap another later if it changes.',
              'If you took medication, tap its button.',
              'When the migraine is over, tap End Attack. The button then reads Tap again to end, so a stray tap does not end it. Tap again to confirm. If you do not, it goes back to End Attack after a few seconds.',
            ],
          },
        ],
      },
      {
        h2: 'Finish logging afterward',
        body: [
          'After you end an attack, a Finish logging your migraine card appears on the Dashboard. Tap Finish Logging to add triggers and notes, or Not now to dismiss it.',
          'Mygra can also send a quiet reminder. In the Settings tab, under Attack Mode, the Finish-Logging Reminder switch turns it on or off. When it is on, Remind Me After lets you pick the delay. The choices are 30 minutes, 1 hour, 2 hours, 4 hours, and 8 hours, and the default is 2 hours.',
        ],
      },
    ],
    steps: [
      { name: 'Start Attack Mode', text: 'Use the Attack Mode Lock Screen widget, the Start Migraine control, Siri, or the Start Migraine button on Apple Watch.' },
      { name: 'Set your pain', text: 'Under Pain now, tap 2, 4, 6, 8, or 10. The word beside the heading shows the step.' },
      { name: 'Log medication if you took it', text: 'Under Took medication, tap the button for the one you took.' },
      { name: 'End the attack', text: 'Tap End Attack, then tap again when the button reads Tap again to end.' },
      { name: 'Finish the entry later', text: 'When you feel up to it, tap Finish Logging on the Dashboard card to add triggers and notes.' },
    ],
    howTo: { name: 'How to start Attack Mode in Mygra' },
    faq: [
      {
        q: 'Does Attack Mode change my screen brightness?',
        a: 'No. Mygra dims its own screen with a dark overlay and does not change the system brightness setting.',
      },
      {
        q: 'What if I close Attack Mode without ending the migraine?',
        a: 'Close only leaves the screen. The migraine keeps running. Open it from the Attack Mode widget, or tap Open Attack Mode on the ongoing migraine’s detail screen.',
      },
      {
        q: 'Where did my triggers and notes go?',
        a: 'Attack Mode does not ask for them. After you end the attack, tap Finish Logging on the Dashboard card, or on the reminder, to add them.',
      },
    ],
    related: ['mygra-log-a-migraine', 'mygra-connect-apple-health'],
  },

  // ---------------------------------------------------------------- 3
  {
    slug: 'mygra-connect-apple-health',
    app: 'mygra',
    og: '/og/mygra.png',
    short: 'How to connect Apple Health to Mygra',
    title: 'How to Connect Apple Health to Mygra',
    h1: 'How to connect Apple Health to Mygra',
    description:
      'Connect Apple Health from setup or the Dashboard, see what Mygra reads and writes, choose the Today card stats, and see the Health details on each migraine.',
    summary: 'Connect Health, pick Today stats, and see it on each log.',
    intro: [
      'Mygra can read some of your Apple Health data and attach it to each migraine you log, so an entry records things like sleep and water for that day. Connecting Health is optional, and you can skip it.',
      'This guide shows where to connect it, what Mygra reads and writes, and where the data appears in the app.',
    ],
    sections: [
      {
        h2: 'What Mygra reads and writes',
        body: [
          'When you connect, iOS asks which data Mygra may use. Mygra asks to read:',
          {
            ul: [
              'Water, caffeine, and food energy',
              'Sleep',
              'Steps, resting heart rate, and heart rate',
              'Blood glucose and blood oxygen',
              'Headache records',
            ],
          },
          'Mygra asks to write water, caffeine, food energy, sleep, and headache records. The write permission is used when you add intake with Quick Add, and when a completed migraine is written back to Health as a headache.',
          'Cycle data is separate. Mygra does not ask for it here. It asks only if you turn on Cycle Insights later, which is a Mygra Plus feature, and it only reads menstrual flow dates.',
        ],
      },
      {
        h2: 'Connect Apple Health',
        body: [
          'There are two places to do it.',
          {
            ol: [
              'During setup: on the Health page, tap Connect Apple Health, then choose what to allow in the iOS sheet. The page changes to Health Connected. To move on without it, tap Not now.',
              'Later, from the Dashboard: if Health is not connected, the Today card reads Connect Apple Health to see daily stats. Tap Connect and choose what to allow.',
            ],
          },
          'If access was denied, the setup page shows Access Denied and an Open Settings button. Health permissions are managed by iOS, so you change them there.',
        ],
      },
      {
        h2: 'Use the Today card',
        body: [
          'Once connected, the Dashboard’s Today card shows your Health stats for the day. Next to the title, the info button explains where the values come from, the refresh button reloads them, and Quick Add opens the intake editor.',
          'Quick Add has sliders for water, caffeine, food, and sleep. Move a slider and an Add button appears. Tapping it saves the amount to Apple Health.',
          'To choose which stats appear, open the Settings tab, go to the Dashboard section, and tap Dashboard Stats. Turn stats on or off and drag them to reorder. Reset Order restores the default.',
        ],
      },
      {
        h2: 'See Health on a migraine',
        body: [
          'In the New Migraine form, the Context section shows Pulled from Apple Health when the data came through. For a start time on an earlier day, it shows Health data from that date instead. If it fails, it shows Failed to pull from Apple Health, and an info button explains why. Mygra says you can still log the migraine, but Health metrics will not be attached.',
          'Open a saved migraine from the Migraines tab and find the Health card. It lists the values Mygra had, such as Water, Sleep, Food, Caffeine, Steps, Resting HR, Glucose, and Oxygen Saturation. Values with no data are left out.',
        ],
      },
    ],
    steps: [
      { name: 'Find the Connect button', text: 'Use the Health page in setup, or the Dashboard’s Today card when Health is not connected.' },
      { name: 'Connect', text: 'Tap Connect Apple Health on the setup page, or Connect on the Today card.' },
      { name: 'Choose what to allow', text: 'In the iOS sheet, pick the Health data Mygra may read and write, then confirm.' },
      { name: 'Pick your Today stats', text: 'In Settings, under Dashboard, tap Dashboard Stats and switch stats on or off.' },
      { name: 'Check a migraine', text: 'Log a migraine and look for Pulled from Apple Health in the Context section, then the Health card on its detail screen.' },
    ],
    howTo: { name: 'How to connect Apple Health to Mygra' },
    faq: [
      {
        q: 'Do I have to connect Apple Health?',
        a: 'No. Every permission page in setup can be skipped with Not now, and you can still log migraines. Health metrics are not attached without it, and Mygra may ask for access again when you save a migraine.',
      },
      {
        q: 'Is my Health data sent anywhere?',
        a: 'Mygra reads Apple Health only with your permission. Farside’s [privacy policy](/privacy) says that data stays on your device and is not sent to us.',
      },
      {
        q: 'Can I connect Health after skipping it?',
        a: 'Yes. On the Dashboard, the Today card shows Connect Apple Health to see daily stats with a Connect button. Tap it to start the connection.',
      },
    ],
    related: ['mygra-log-a-migraine', 'mygra-start-attack-mode'],
  },
];
