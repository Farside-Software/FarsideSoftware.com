// Stork how-to guides (/guides/<slug>).
//
// Every label, step, and limit below was read from the Stork app source
// (version 3.1, the Swift package under Packages/Stork: StorkFeatureDeliveries,
// StorkFeatureDashboard, StorkFeatureExport, StorkFeatureSettings, StorkCore).
// A detail that could not be confirmed there was left out or described
// generically. No prices belong in this file, and nothing here is clinical
// advice: the guides only describe how to use the app.
//
// Body blocks: a string is a paragraph, { ul: [...] } a bullet list, and
// { ol: [...] } a numbered list. Inline links use [label](/path) and are only
// for internal paths.

export const hub = {
  title: 'Stork',
  blurb: 'Log a delivery, read your dashboard and jar, and export your records.',
};

export const app = {
  slug: 'stork',
  heading: 'Want a simple log of your deliveries?',
  blurb: 'Stork is a private delivery log for labor and delivery nurses, midwives, and OB-GYNs, with a dashboard, calendar, and export. Free to start.',
  button: 'Get Stork on the App Store',
  notice:
    'Stork is an independent app from Farside Software. It is a personal career log, not a medical record or a clinical tool.',
  checked: 'Stork 3.1 source',
  checkedOn: 'November 17, 2026',
  checkedIso: '2026-11-17',
};

export default [
  // ---------------------------------------------------------------- 1
  {
    slug: 'stork-log-a-delivery',
    app: 'stork',
    og: '/og/stork.png',
    short: 'How to log a delivery in Stork',
    title: 'How to Log a Delivery in Stork, Step by Step',
    h1: 'How to log a delivery in Stork',
    description:
      'Add a delivery in Stork: set the date and method, add each baby, pick tags, write a private note, and save. Includes back-dating and editing an entry later.',
    summary: 'Date, method, babies, tags, notes, and how to fix an entry later.',
    intro: [
      'A Stork entry is one delivery with one or more babies. The form has four parts: details, babies, tags, and notes. It takes less than a minute once you know where things are.',
      'Stork is a personal career log. It never asks for a patient’s name, a record number, or a date of birth, and you should not type any of those into it. This guide shows where that matters.',
    ],
    sections: [
      {
        h2: 'Open a new delivery',
        body: [
          'Tap Add, the blue button with a plus sign at the top right. It is on the Dashboard, Deliveries, and Calendar tabs. With a keyboard attached you can press Command-N instead.',
          'The form opens as a sheet titled New Delivery. The first time you use the app, a small tip titled Record a Delivery points at the Add button.',
        ],
      },
      {
        h2: 'Fill in the details',
        body: [
          'The Details section has four fields:',
          {
            ul: [
              'Date: the date and time of the delivery. It starts at the current moment. You can pick any past date and time, which is how you back-date an entry from an earlier shift. A date in the future is pulled back to now.',
              'Delivery Method: a three-way switch with Vaginal, C-Section, and VBAC. It starts on Vaginal.',
              'Epidural Used: a switch. It starts turned on, so check it on every entry.',
              'My Role: your part in this birth. The choices are Primary Nurse, Transition / Baby Nurse, Charge Nurse, Preceptor, Student, Midwife, Doula, Resident, and Other. It starts on Not recorded, and you can leave it there.',
            ],
          },
        ],
      },
      {
        h2: 'Add each baby',
        body: [
          'A delivery needs at least one baby. Until you add one, the Babies section shows “At least one baby is required.” and the Finish button stays dimmed.',
          {
            ol: [
              'Tap Add Baby. A sheet titled Add Baby opens.',
              'Choose Sex: Male, Female, or Loss. It starts on Male.',
              'Enter Weight and Height. The sheet opens with placeholder numbers already filled in (121.6 oz and 19 in, or 3.45 kg and 48.26 cm in metric), so replace them with your own. Both must be above zero.',
              'Under Additional Info, turn on NICU Stay or Nurse Catch if they apply.',
              'Tap Add. The baby appears as a row in the Babies section.',
            ],
          },
          'For twins or more, tap Add Baby again for each one. Each baby row has buttons to edit or remove that baby.',
          'Weight and height are entered in ounces and inches unless you turn on Metric Units in Settings. Stork converts for you either way.',
        ],
      },
      {
        h2: 'Add tags and a note',
        body: [
          'Tags are your own labels. Tap Add Tags to open the Tags sheet. If you have no tags yet, it offers Suggested Tags you can tap to add. Otherwise it lists Your Tags, and you tap one to select or clear it.',
          'To make a new tag, use Create New Tag: type a Tag name, pick a color, and tap Create Tag. The new tag is selected for this delivery. Tap Done when you finish.',
          'The Notes section takes a short private note, for example a memorable detail about your shift. The app’s own examples for tags are “Teaching Moment”, “First Solo”, and “Night Shift”.',
          'Keep both free of patient information. Stork checks notes on the device, and if one looks like it contains a name, a record number, a date of birth, or contact details, an orange warning appears above the field. The warning does not stop you from saving, so the decision stays with you. Follow your employer’s policies too, which come first.',
        ],
      },
      {
        h2: 'Save, then edit or delete later',
        body: [
          'Tap Finish. Stork saves the delivery and takes you to the Dashboard. If the entry takes you past a career milestone, a celebration screen appears with Share Achievement and Continue buttons. Sharing a milestone card needs Stork Pro.',
          'To change an entry, open the Deliveries tab, tap the delivery, and tap Edit. The form reopens as Edit Delivery with a Save button. The date is locked while editing, so a wrong date means deleting the entry and logging it again.',
          'Delete removes a delivery. It asks you to confirm first.',
          'Stork Pro adds a Weather section with an Add Weather Snapshot button. It uses your location once, only when you tap, and only for deliveries from the last 24 hours.',
        ],
      },
    ],
    steps: [
      { name: 'Tap Add', text: 'Tap the blue Add button at the top right of the Dashboard, Deliveries, or Calendar tab to open New Delivery.' },
      { name: 'Set the details', text: 'Choose the Date, the Delivery Method (Vaginal, C-Section, or VBAC), and whether Epidural Used applies. Optionally pick My Role.' },
      { name: 'Add each baby', text: 'Tap Add Baby, choose Sex, enter Weight and Height, turn on NICU Stay or Nurse Catch if they apply, then tap Add. Repeat for multiples.' },
      { name: 'Add tags', text: 'Tap Add Tags, select or create tags, then tap Done. Leave patient information out.' },
      { name: 'Write a private note', text: 'Add a short personal note if you want one. Do not include anything that identifies a patient.' },
      { name: 'Tap Finish', text: 'Tap Finish to save. Stork returns you to the Dashboard.' },
    ],
    howTo: { name: 'How to log a delivery in Stork' },
    faq: [
      {
        q: 'Can I log a delivery from a past shift?',
        a: 'Yes. Set the Date to the day and time it happened. Stork allows any past date and time, but not a future one.',
      },
      {
        q: 'Why is the Finish button dimmed?',
        a: 'A delivery needs at least one baby. Tap Add Baby and add one, and Finish turns on.',
      },
      {
        q: 'Can I change the date of an entry after saving?',
        a: 'No. The date is locked in Edit Delivery. You can change the method, epidural, role, babies, tags, and notes, or delete the entry and log it again.',
      },
    ],
    related: ['stork-dashboard-and-delivery-jar', 'stork-export-pdf-csv'],
  },

  // ---------------------------------------------------------------- 2
  {
    slug: 'stork-dashboard-and-delivery-jar',
    app: 'stork',
    og: '/og/stork.png',
    short: 'How to read the Stork dashboard and delivery jar',
    title: 'How to Read the Stork Dashboard and Delivery Jar',
    h1: 'How to read the Stork dashboard and delivery jar',
    description:
      'What the marble jar and the dashboard cards show in Stork, which cards are free and which need Stork Pro, and how to reorder them or look back at past months.',
    summary: 'The monthly jar, the stat cards, jar history, and reordering cards.',
    intro: [
      'The Dashboard tab is the first screen in Stork. At the top is the marble jar for the current month. Below it is a stack of statistic cards built from the deliveries you have logged.',
      'This guide explains what each part counts, which cards are free, and how to change the order. It describes the screen only. It does not interpret your numbers.',
    ],
    sections: [
      {
        h2: 'The marble jar',
        body: [
          'The jar shows the current month. Every baby you logged this month is one marble. Stork groups marbles into four categories: Boy, Girl, Nurse catch, and In remembrance. A baby marked Loss when you logged it counts as In remembrance, and a baby marked Nurse Catch counts under Nurse catch rather than by sex.',
          'Below the jar is a row of chips, one per category, each with a count. The In remembrance chip appears only when it has something to show, and it is never added into a delivered total. Tap a chip to highlight just those marbles. Tap it again to clear.',
          'Two notes can appear under the chips. “C-section (light center)” counts marbles from C-section deliveries, which have a light center. “In multiples (linked)” counts babies from multiple births, which are linked together.',
          'Pull down on the Dashboard to refresh. The jar shuffles when you do.',
          'If you added earlier births as estimates, a line under the jar says they are in your career totals but not in this month’s jar.',
        ],
      },
      {
        h2: 'Look back at earlier months',
        body: [
          'The month name above the jar, with a small arrow beside it, is a button. Tap it to open Jar History. It shows the last 12 months as pages. Swipe sideways to move between months, and tap the close button at the top to return.',
          'Share Jar, under the chips, sends a picture of the month’s jar through the share sheet. It shows a Pro badge for free users: free users share a lower-resolution picture, and Stork Pro shares full resolution.',
        ],
      },
      {
        h2: 'The statistic cards',
        body: [
          'Under the jar, the cards follow in a single column on a phone and in two columns on a wider screen. These five are free:',
          { ul: ['Delivery Method', 'Epidural & NICU', 'Baby Count', 'Sex Distribution', 'My Role'] },
          'These five are part of Stork Pro, and free users see them as locked cards that read “Unlock insight cards with Stork Pro”. Tapping one opens the Stork Pro screen:',
          { ul: ['Baby Measurements', 'Time of Day', 'Day of Week', 'Year Over Year', 'Personal Bests'] },
          'Logging, the jar, and the basic cards stay free. Pro adds the insight cards, along with other extras.',
          'To change which roles count toward your headline total, open Settings and tap Roles Counted in Totals. Deliveries with no role recorded always count, and every delivery stays in your history either way.',
        ],
      },
      {
        h2: 'Reorder the cards',
        body: [
          {
            ol: [
              'On the Dashboard, tap the More button, the circle with three dots at the top right.',
              'Tap Reorder Cards…',
              'Drag the rows into the order you want. The Marble Jar sits under Fixed Position and always stays at the top.',
              'Tap Save. Tap Cancel to leave the order unchanged.',
            ],
          },
          'The same menu has Year in Births…, a review of a past year that is free for everyone. It is dimmed until you have a year with logged deliveries. From December 1 through January 31, a card on the Dashboard also offers your Year in Births for the year just ended.',
        ],
      },
    ],
    steps: [
      { name: 'Open the Dashboard tab', text: 'The marble jar for the current month is at the top, with one marble for each baby you logged.' },
      { name: 'Read the legend chips', text: 'Each chip shows a category and its count. Tap a chip to highlight those marbles in the jar.' },
      { name: 'Look at past months', text: 'Tap the month name above the jar to open Jar History, then swipe through the last 12 months.' },
      { name: 'Scroll through the cards', text: 'The cards under the jar show your logged deliveries. Insight cards show a lock until you have Stork Pro.' },
      { name: 'Open the More menu', text: 'Tap the circle with three dots at the top right and choose Reorder Cards…' },
      { name: 'Drag and save', text: 'Drag the cards into your order and tap Save. The Marble Jar stays at the top.' },
    ],
    howTo: { name: 'How to read the Stork dashboard and reorder its cards' },
    faq: [
      {
        q: 'Why does the jar only show this month?',
        a: 'The jar is a monthly view. Tap the month name above it to open Jar History and see the last 12 months.',
      },
      {
        q: 'Which dashboard cards need Stork Pro?',
        a: 'Baby Measurements, Time of Day, Day of Week, Year Over Year, and Personal Bests. Delivery Method, Epidural & NICU, Baby Count, Sex Distribution, and My Role are free.',
      },
      {
        q: 'Can I move the jar?',
        a: 'No. The Marble Jar is pinned to the top. Reorder Cards moves only the cards below it.',
      },
    ],
    related: ['stork-log-a-delivery', 'stork-export-pdf-csv'],
  },

  // ---------------------------------------------------------------- 3
  {
    slug: 'stork-export-pdf-csv',
    app: 'stork',
    og: '/og/stork.png',
    short: 'How to export your Stork records as PDF or CSV',
    title: 'How to Export Your Stork Records as a PDF or CSV',
    h1: 'How to export your Stork records as a PDF or CSV',
    description:
      'Make a PDF report or CSV file from your Stork log: where Export & Share is, the date range and row format options, and what each file holds. Needs Stork Pro.',
    summary: 'PDF report or CSV file, date range, row format, and sharing cards.',
    intro: [
      'Stork can turn your log into a PDF report or a CSV file you can open in a spreadsheet. Both are made on your device. They go only where you send them from the share sheet.',
      'PDF and CSV export are part of Stork Pro. Without it, you can still open the Export & Share screen and see the totals, but tapping PDF Report or CSV Export opens the Stork Pro screen.',
    ],
    sections: [
      {
        h2: 'Find Export & Share',
        body: [
          {
            ol: [
              'Open the Settings tab.',
              'In the Data section, tap Export & Share.',
            ],
          },
          'The screen has an Export Data section with PDF Report and CSV Export, a Share section with Share Cards, and a Your Data section that shows your Total Deliveries and Total Babies.',
        ],
      },
      {
        h2: 'Make a PDF report',
        body: [
          {
            ol: [
              'Tap PDF Report. A sheet opens with a Report Period section.',
              'Choose a Date Range: This Month, Last Month, This Year, Last Year, All Time, or Custom Range. It starts on This Year. With Custom Range, set a Start Date and an End Date.',
              'Check the Preview. It shows how many deliveries and babies the range covers.',
              'Tap Generate PDF Report. The button is dimmed when the range has no deliveries.',
              'When it finishes, tap Share PDF Report and choose where to send it.',
            ],
          },
          'The report is titled Delivery Report and shows the date range. It has a summary with Total Deliveries, Total Babies, and Epidural Usage, then a delivery method breakdown, a sex distribution section, and a section for your role. The report is built from your counts and does not include your notes or tags.',
          'If you change the Date Range after generating, the Share button goes back to Generate, so make the file again.',
        ],
      },
      {
        h2: 'Make a CSV file',
        body: [
          {
            ol: [
              'Tap CSV Export. A sheet opens.',
              'Choose a Date Range, the same options as the PDF. For the CSV it starts on All Time.',
              'Under Format, choose a Row Format: One Row per Delivery (a summary with the baby count) or One Row per Baby (detailed, with each baby’s data). It starts on One Row per Baby.',
              'Check the Preview, which shows Deliveries, Rows to Export, and Units.',
              'Tap Generate CSV, then Share CSV File.',
            ],
          },
          'Units follow the Metric Units setting in Settings. The file has a header row of column names such as delivery_id, delivery_method, epidural_used, sex, weight, height, nurse_catch, nicu_stay, and role. It does not include notes or tags.',
        ],
      },
      {
        h2: 'Share a card instead',
        body: [
          'For a picture rather than a file, open Export & Share and tap Share Cards. Tap a card under Statistics Cards to preview it, then tap Share Image. The Include Watermark switch is under Options.',
          'Milestone cards appear under Milestones Achieved once your totals pass a milestone. They are part of Stork Pro, and free users see a Pro badge on them.',
          'Before you send any export or image, look at it. Stork is built to need no patient information, but it cannot know what you typed into a note.',
        ],
      },
    ],
    steps: [
      { name: 'Open Settings', text: 'Tap the Settings tab, then Export & Share in the Data section.' },
      { name: 'Choose PDF Report or CSV Export', text: 'Both need Stork Pro. Without it, tapping either one opens the Stork Pro screen.' },
      { name: 'Pick a Date Range', text: 'Choose This Month, Last Month, This Year, Last Year, All Time, or Custom Range.' },
      { name: 'For CSV, choose a Row Format', text: 'Pick One Row per Delivery or One Row per Baby.' },
      { name: 'Check the Preview', text: 'Confirm the number of deliveries and babies or rows before you generate.' },
      { name: 'Generate the file', text: 'Tap Generate PDF Report or Generate CSV and wait for it to finish.' },
      { name: 'Share it', text: 'Tap Share PDF Report or Share CSV File and pick where to send it.' },
    ],
    howTo: { name: 'How to export your Stork records as a PDF or CSV' },
    faq: [
      {
        q: 'Do I need Stork Pro to export?',
        a: 'Yes. PDF Report and CSV Export are part of Stork Pro. Logging and viewing your deliveries stay free.',
      },
      {
        q: 'Why is Generate dimmed?',
        a: 'There are no deliveries in the date range you chose. Pick a wider range, such as All Time.',
      },
      {
        q: 'Do the exports include my notes?',
        a: 'No. The PDF and CSV are built from counts and fields such as method, epidural, role, and baby measurements. Neither includes notes or tags.',
      },
    ],
    related: ['stork-log-a-delivery', 'stork-dashboard-and-delivery-jar'],
  },
];
