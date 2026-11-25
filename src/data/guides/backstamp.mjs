// Backstamp guides (/guides/<slug>).
//
// Every Backstamp label, step, and behavior below was checked against the
// Backstamp app source (the SwiftUI views and models under Backstamp/ in the
// app repo: Overview, Dates, Duplicates, ImportCheck, Albums, History,
// Library, Store, App, plus README.md, docs/DESIGN.md, and docs/STORE.md).
// The Apple Photos steps were checked against Apple's Photos User Guide for
// Mac on support.apple.com. When a label or behavior could not be confirmed it
// was described generically or left out. Backstamp is not released yet, so the
// app block points to the Backstamp page. No prices belong in this file.
//
// Body blocks: a string is a paragraph, { ul: [...] } a bullet list, and
// { ol: [...] } a numbered list. Inline links use [label](/path) and are only
// for internal paths.

export const hub = {
  title: 'Backstamp',
  blurb: 'Fix wrong photo dates, merge duplicates, and check a folder before you import it.',
};

export const app = {
  slug: 'backstamp',
  heading: 'Fix your photo dates on the Mac',
  blurb:
    'Backstamp repairs a Photos library on your Mac, iCloud Photos included. It finds photos with missing or wrong dates, shows the evidence for each date, and merges duplicates. Scanning and reviewing are free.',
  button: 'Get Backstamp on the Mac App Store',
  notice:
    'Backstamp is an independent app from Farside Software. Apple, Mac, macOS, iCloud, and Photos are trademarks of Apple Inc.',
  checked: 'Backstamp app source and Apple’s Photos User Guide for Mac',
  checkedOn: 'November 19, 2026',
  checkedIso: '2026-11-19',
};

export default [
  // ---------------------------------------------------------------- 1
  {
    slug: 'fix-wrong-photo-dates-apple-photos-mac',
    app: 'backstamp',
    og: '/og/backstamp.png',
    short: 'How to fix wrong or missing photo dates in Apple Photos',
    title: 'How to Fix Wrong or Missing Photo Dates in Apple Photos on a Mac',
    h1: 'How to fix wrong or missing photo dates in Apple Photos on a Mac',
    description:
      'Photos on a Mac can change a photo’s date and time with Image > Adjust Date and Time. See how it works, why dates go wrong, and when a library scan helps.',
    summary: 'Use Adjust Date and Time in Photos, and know when to scan the whole library.',
    intro: [
      'Photos sorts your library by date. When a photo has the wrong date, or none, it ends up in the wrong place on your timeline, and it is hard to find.',
      'Photos can fix a date by hand. This guide shows how, explains why dates go wrong, and covers what to do when the problem is spread across thousands of photos.',
    ],
    sections: [
      {
        h2: 'Change a date in Photos',
        body: [
          'Apple’s Photos User Guide for Mac describes these steps. They work for one photo or for several selected at once.',
          {
            ol: [
              'Open Photos on your Mac and select the photos you want to change.',
              'Choose Image > Adjust Date and Time.',
              'In the Adjusted field, enter the date and time you want.',
              'If necessary, click a time zone on the map and choose the closest city.',
              'Click Adjust.',
            ],
          },
          'You can also select a photo, open the Info window from the toolbar, and double-click the date that appears there.',
          'After a batch change, open a few of the photos and check the dates. Apple’s page does not describe how a change to several photos is applied, so look at the result before you move on.',
        ],
      },
      {
        h2: 'Why photo dates go wrong',
        body: [
          'Photos sorts by the capture date it finds when a photo comes in. Some photos arrive without a reliable one. Common causes:',
          {
            ul: [
              'Scans of old prints. The scanner records the day you scanned, not the day the picture was taken.',
              'Photos saved from messages or social apps. These often have their details stripped, so the photo lands on the day you saved it.',
              'Screenshots and edited copies, which carry the date they were made.',
              'Files copied from a folder, a drive, or a network share that have no date inside them.',
              'Cameras with a clock that was never set.',
            ],
          },
          'In each case the photo is not damaged. Its date just does not match the day it was taken.',
        ],
      },
      {
        h2: 'When Photos’ own tool is enough',
        body: [
          'Adjust Date and Time is a good fit when you already know the right date. A handful of scans from one afternoon, or a set of photos from a camera whose clock was off by a known amount, are easy to fix this way.',
          'It gets slower when you do not know which photos are wrong, or when each photo needs a different date. You would have to find the suspects yourself and work out the right date for each one.',
        ],
      },
      {
        h2: 'Finding the wrong dates across a whole library',
        body: [
          'Backstamp, a Mac app from Farside Software, is built for that second case. It scans your Photos library and lists the photos whose dates look suspect: no date at all, or a date that matches the day the photo was added during a bulk import.',
          'For each one it looks for evidence of the real date, such as the date stored inside the file, a date in the file name, or a near-identical photo elsewhere in your library that already has a good date. It shows every source it found and how sure it is, and it changes nothing until you confirm.',
          'See [how to scan your library and fix dates in Backstamp](/guides/backstamp-fix-photo-dates) for the full walk-through. Backstamp needs macOS 26 or later and works with iCloud Photos libraries. You can read more on the [Backstamp page](/backstamp).',
        ],
      },
    ],
    steps: [
      { name: 'Select the photos', text: 'Open Photos on your Mac and select the photos you want to change.' },
      { name: 'Open Adjust Date and Time', text: 'Choose Image > Adjust Date and Time.' },
      { name: 'Enter the date', text: 'Type the date and time you want in the Adjusted field.' },
      { name: 'Pick a time zone if needed', text: 'Click a time zone on the map and choose the closest city.' },
      { name: 'Apply the change', text: 'Click Adjust, then open a few of the photos to check the result.' },
    ],
    howTo: { name: 'How to change the date and time of photos in Photos on a Mac' },
    faq: [
      {
        q: 'Can I change the date of several photos at once in Photos?',
        a: 'Yes. Select the photos, then choose Image > Adjust Date and Time. Check a few of them afterward to make sure they ended up where you expect.',
      },
      {
        q: 'Why did my scanned photos get today’s date?',
        a: 'A scan has no record of when the original print was taken. It carries the day it was scanned or imported. You need to set the real date yourself, or find evidence for it.',
      },
      {
        q: 'Does changing a date in Photos sync with iCloud Photos?',
        a: 'Photos edits sync across your devices when you use iCloud Photos. Backstamp’s confirmations say this before they change anything.',
      },
    ],
    related: ['backstamp-fix-photo-dates', 'backstamp-undo-changes-history', 'find-merge-duplicate-photos-apple-photos-mac'],
  },

  // ---------------------------------------------------------------- 2
  {
    slug: 'find-merge-duplicate-photos-apple-photos-mac',
    app: 'backstamp',
    og: '/og/backstamp.png',
    short: 'How to find and merge duplicate photos in Apple Photos',
    title: 'How to Find and Merge Duplicate Photos in Apple Photos on a Mac',
    h1: 'How to find and merge duplicate photos in Apple Photos on a Mac',
    description:
      'Use the Duplicates collection under Utilities in Photos to merge copies on a Mac. See what Merge does, where extra copies go, and when a closer look helps.',
    summary: 'Use Utilities > Duplicates in Photos, and see where a stricter review helps.',
    intro: [
      'Duplicates pile up when you import the same folder twice, restore from a backup, or save the same picture from several places. They waste space and clutter every album.',
      'Photos has a built-in way to find and merge them. This guide shows it, then covers what Backstamp adds for people who want more control.',
    ],
    sections: [
      {
        h2: 'Find duplicates in Photos',
        body: [
          'Apple’s Photos User Guide for Mac describes these steps.',
          {
            ol: [
              'Open Photos on your Mac.',
              'In the sidebar, under Utilities, click Duplicates. If you do not see it, hover over Utilities and click its disclosure arrow.',
              'If you use an iCloud Shared Photo Library, click the Library pop-up menu in the toolbar and choose Both Libraries.',
            ],
          },
          'Duplicates appear automatically, but Apple notes that they can take some time to show up while Photos analyzes your photos, depending on the size of your library.',
        ],
      },
      {
        h2: 'Merge them',
        body: [
          {
            ol: [
              'Select the duplicates you want to merge. You can select items in one row or in several rows. Press Command-A to select everything.',
              'Click Merge, followed by the number of items, then click it again in the dialog to confirm.',
            ],
          },
          'After a merge, one original photo or video appears where the selected duplicates were. The other copies go to Recently Deleted, where you can recover them within 30 days or delete them permanently.',
          'Apple’s page does not say which details are combined when copies are merged, or which copy is treated as the original. If you have favorites, album memberships, or locations that matter, check a merged photo afterward.',
        ],
      },
      {
        h2: 'What Backstamp does differently',
        body: [
          'Backstamp, a Mac app from Farside Software, is a second way to merge duplicates. It is useful when you want to see and decide more yourself.',
          {
            ul: [
              'A strictness slider, labeled Exact to Loose, controls how different two photos can be and still count as duplicates. Moving it regroups the results instantly.',
              'Each group shows its copies side by side, with one marked KEEP and the others REMOVE. You can click any copy to make it the keeper.',
              'Merge is stated plainly: the keeper inherits favorite status, the earliest capture date, location, and album membership from its copies.',
              'The copies go to Recently Deleted, where Photos keeps them for 30 days.',
              'A copy whose own date looks wrong gets a “date looks wrong” chip, so you can fix dates before merging.',
            ],
          },
          'See [how to merge duplicates in Backstamp](/guides/backstamp-merge-duplicates) for the steps. Backstamp needs macOS 26 or later and works with iCloud Photos libraries.',
        ],
      },
      {
        h2: 'Which one should you use?',
        body: [
          'If you want a quick cleanup of obvious copies, the Duplicates collection in Photos is the shortest path. If you want to control how loosely photos are matched, pick which copy stays in each group, or review the date problems in the same library first, Backstamp gives you those controls. Both leave the removed copies in Recently Deleted.',
        ],
      },
    ],
    steps: [
      { name: 'Open Duplicates', text: 'In Photos, click Duplicates under Utilities in the sidebar. Hover over Utilities and click its arrow if it is hidden.' },
      { name: 'Choose your library', text: 'If you use an iCloud Shared Photo Library, choose Both Libraries from the Library pop-up menu.' },
      { name: 'Select duplicates', text: 'Select the items you want to merge, or press Command-A to select everything.' },
      { name: 'Merge', text: 'Click Merge with the item count, then click it again in the dialog.' },
      { name: 'Check Recently Deleted', text: 'The other copies sit in Recently Deleted for 30 days if you want any back.' },
    ],
    howTo: { name: 'How to find and merge duplicate photos in Photos on a Mac' },
    faq: [
      {
        q: 'Where do the extra copies go after a merge?',
        a: 'To Recently Deleted. You can recover them there within 30 days, or delete them permanently.',
      },
      {
        q: 'Why is the Duplicates collection empty or missing?',
        a: 'Photos can take some time to analyze a library before duplicates appear. If you do not see Duplicates under Utilities, hover over Utilities and click its disclosure arrow.',
      },
      {
        q: 'Can I choose which copy Photos keeps?',
        a: 'Apple’s page does not describe a way to choose. In Backstamp you click the copy you want to keep in each group.',
      },
    ],
    related: ['backstamp-merge-duplicates', 'backstamp-import-check-folder', 'fix-wrong-photo-dates-apple-photos-mac'],
  },

  // ---------------------------------------------------------------- 3
  {
    slug: 'backstamp-fix-photo-dates',
    app: 'backstamp',
    og: '/og/backstamp.png',
    short: 'How to scan your library and fix dates in Backstamp',
    title: 'How to Scan Your Library and Fix Photo Dates in Backstamp',
    h1: 'How to scan your library and fix photo dates in Backstamp',
    description:
      'Scan a Photos library in Backstamp, review the suspect dates and the evidence for each, accept or set new dates, and apply them after a clear confirmation.',
    summary: 'Scan, review the evidence, set new dates, then Apply.',
    intro: [
      'Backstamp finds photos and videos in your Photos library whose dates look wrong or missing, and shows where each suggested date comes from. Nothing changes in your library until you click Apply and confirm.',
      'Backstamp is on the Mac App Store. It needs macOS 26 or later and works with iCloud Photos libraries.',
    ],
    sections: [
      {
        h2: 'Give Backstamp access to Photos',
        body: [
          'The first time you open Backstamp, it explains that it needs access to your Photos library. Click Allow Access… and grant it. If access is turned off, the window offers Open Photos Privacy Settings. Turn Backstamp on there under Privacy & Security, Photos, and choose Full Access.',
          'Scanning only reads your library. Backstamp changes it only after you confirm, and keeps a journal of every change.',
        ],
      },
      {
        h2: 'Scan the library',
        body: [
          {
            ol: [
              'Open Overview in the sidebar.',
              'Click Scan Library. After the first scan the button reads Scan Again. The keyboard shortcut is Command-R.',
              'Wait for the progress rows to finish. You can click Stop to cancel.',
            ],
          },
          'The scan reads your whole library to find duplicates and date problems. It changes nothing. Thumbnails that are only in iCloud are downloaded.',
          'When it finishes, the Dates card shows how many items need review. The Last scan card shows when it ran and how many photos and videos it saw.',
        ],
      },
      {
        h2: 'Find the evidence',
        body: [
          'At first, only each item’s file name has been checked. To look for real evidence, click Find Dates on the Dates card. It reads the original of every suspect and compares it with the rest of your library. It is read-only, but it starts downloads from iCloud when an original is not on your Mac.',
          'You can also open Dates in the sidebar and use the Find Dates menu in the toolbar. It offers For Selected and For All Not Yet Looked Up, each with a count.',
          'Backstamp looks for several kinds of evidence, in order of trust:',
          {
            ul: [
              'Metadata inside the file, such as EXIF DateTimeOriginal, or QuickTime creation dates for videos.',
              'A library match: a duplicate or a same-moment photo elsewhere in your library that has a trustworthy date.',
              'Phone sequence: an IMG_ file number that sits between library photos from the same phone.',
              'App comment clues, where an app left its version or an iOS version in the file.',
              'The file name, when it carries a date, such as IMG_20150312 or a screenshot name.',
            ],
          },
        ],
      },
      {
        h2: 'Review the Dates table',
        body: [
          'Click Review Dates on the Overview card, or open Dates in the sidebar. The table lists the suspects. By default the Show menu is set to Needs review. Its other choices are All, Has suggestion, No suggestion, Matches metadata, Pending, and Applied, each with a count. You can also search by file name.',
          'The default columns are a thumbnail, Filename, Current date, Suggested, and New date. The Suggested column shows the suggested date, a confidence badge, and the source. The badges read Confident, Likely, or Rough.',
          'An item whose best evidence agrees with its current date shows Matches metadata with a checkmark. It is settled, and no change is proposed.',
          'Other states you may see: Not looked up, None found, Failed, and Skipped: large iCloud video. A failed read can be retried from the inspector, and a skipped video can be read there with Read Anyway.',
        ],
      },
      {
        h2: 'Look at one item in the inspector',
        body: [
          'Select a row to open its inspector, a panel on the right. If it is hidden, use the Inspector button in the toolbar. For one item, the inspector shows a large preview, the file name, the current date, the added date, and why it was flagged.',
          'Under Date evidence, every candidate is listed with its date, confidence badge, source, and details. Click Use on the candidate you trust. That sets it as the item’s new date.',
          'If none fits, use Set date by hand, pick a date and time, and click Use This Date.',
        ],
      },
      {
        h2: 'Set many dates at once',
        body: [
          'In the toolbar, Accept All Confident sets the new date of every item whose suggestion is that confident and differs from its current date. Items that match their metadata are left alone. Accept Suggestions does the same for the rows you have selected.',
          'If you select several items, the inspector offers Accept Suggestions and Give them one date. For the second, pick a date and time. Keep their order, spaced apart is on by default and spaces the items one second apart, which you can change. Then click Set New Date for N Items.',
          'All of these only set a New date in the table. Click Clear in the inspector to take one back. Nothing has changed in Photos yet.',
        ],
      },
      {
        h2: 'Apply and confirm',
        body: [
          {
            ol: [
              'Check the New date column. Use the Pending filter to see only items with a new date waiting.',
              'Click Apply N Changes… at the bottom right.',
              'Read the confirmation. It asks Change the date of N items in Photos? and lists the first few changes, old date to new date.',
              'Click Apply N Changes to go ahead, or Cancel.',
            ],
          },
          'The confirmation also says that the new dates sync through iCloud Photos to all your devices, and that each old and new date is saved to the journal first, so you can revert from History. Applied rows then show Applied in the New date column.',
          'Scanning, reviewing, and every suggestion with its evidence are free. Backstamp includes a limited number of free fixes, and a caption under the Apply button shows how many are left.',
        ],
      },
    ],
    steps: [
      { name: 'Allow access', text: 'On first launch, click Allow Access… so Backstamp can read your Photos library.' },
      { name: 'Scan the library', text: 'Open Overview and click Scan Library.' },
      { name: 'Find dates', text: 'Click Find Dates on the Dates card to read the originals and gather evidence.' },
      { name: 'Open the Dates table', text: 'Click Review Dates, or open Dates in the sidebar.' },
      { name: 'Check the evidence', text: 'Select an item and read its Date evidence in the inspector. Click Use on the date you trust, or set one by hand.' },
      { name: 'Accept suggestions', text: 'Use Accept All Confident or Accept Suggestions to set many new dates at once.' },
      { name: 'Apply', text: 'Click Apply N Changes…, read the confirmation, and click Apply N Changes.' },
    ],
    howTo: { name: 'How to scan your library and fix photo dates in Backstamp' },
    faq: [
      {
        q: 'Does scanning change my photos?',
        a: 'No. Scanning, reading metadata, and reviewing suggestions only read your library. Changes happen only when you click Apply and confirm.',
      },
      {
        q: 'Why does Find Dates download from iCloud?',
        a: 'To read a date from inside a file, Backstamp needs the original. If it is not on your Mac, it is downloaded from iCloud Photos. Videos are streamed and stop early when they can. The app’s tooltips say when an action can start a download.',
      },
      {
        q: 'What if Backstamp has no suggestion for a photo?',
        a: 'The row shows None found. You can set a date by hand in the inspector, or leave the photo as it is.',
      },
    ],
    related: ['backstamp-undo-changes-history', 'fix-wrong-photo-dates-apple-photos-mac', 'backstamp-merge-duplicates'],
  },

  // ---------------------------------------------------------------- 4
  {
    slug: 'backstamp-merge-duplicates',
    app: 'backstamp',
    og: '/og/backstamp.png',
    short: 'How to merge duplicate photos in Backstamp',
    title: 'How to Merge Duplicate Photos and Videos in Backstamp',
    h1: 'How to merge duplicate photos and videos in Backstamp',
    description:
      'Review duplicate groups in Backstamp, set the strictness slider, choose which copy to keep, and merge. See what the keeper inherits and where the copies go.',
    summary: 'Set strictness, pick the keeper in each group, then merge.',
    intro: [
      'Backstamp groups photos and videos that look like copies of each other. For each group you choose the copy to keep. When you merge, the keeper takes on useful details from the others, and the extra copies go to Recently Deleted.',
      'Backstamp is on the Mac App Store. It needs macOS 26 or later and works with iCloud Photos libraries.',
    ],
    sections: [
      {
        h2: 'Scan first',
        body: [
          'Open Overview and click Scan Library. When it finishes, the Duplicates card shows the number of groups and extra copies, and a Review Duplicates button. The Duplicates entry in the sidebar also shows the group count.',
          'If you open Duplicates before scanning, it says No scan yet and offers Go to Overview.',
        ],
      },
      {
        h2: 'Read a group',
        body: [
          'Each row in Duplicates is one group. It has a checkbox at the left, then one thumbnail per copy. Under each thumbnail you see its size in pixels, a heart if it is a favorite, its date, and its file name. Videos show their length.',
          'One copy in each group is badged KEEP and has a colored outline. The others are badged REMOVE. Backstamp picks a keeper for you: the copy with the most pixels, then a favorite, then the earliest date. You do not have to accept its pick.',
          'The subtitle at the top shows the number of groups and extra copies. A copy whose own date is one of the Dates suspects shows a “date looks wrong” chip. Merge keeps the earliest date, so fix dates first if you are unsure.',
        ],
      },
      {
        h2: 'Set the strictness',
        body: [
          'The slider in the toolbar runs from Exact to Loose. It sets how different two photos can be and still count as duplicates. Move it toward Loose to catch more similar copies, or toward Exact for fewer, safer matches. The groups update instantly.',
          'If nothing shows up, the empty screen says No duplicates found and suggests a looser strictness. The default strictness can be set in Settings, and a second slider in the toolbar changes the thumbnail size.',
        ],
      },
      {
        h2: 'Choose what to keep',
        body: [
          {
            ul: [
              'Click a thumbnail to make that copy the keeper of its group. Its tooltip reads Click to keep this copy.',
              'Uncheck a group’s checkbox to leave it out of the merge. Its row dims.',
              'Use All and None in the toolbar to include or exclude every group at once.',
            ],
          },
        ],
      },
      {
        h2: 'Merge',
        body: [
          {
            ol: [
              'Click Merge N Groups… in the toolbar. It counts the checked groups.',
              'Read the confirmation, titled Merge N groups?. It explains that each kept item inherits favorite status, the earliest capture date, location, and album membership from its copies.',
              'Click Merge and Remove N Copies, or Cancel.',
              'Photos then asks you to confirm the deletion.',
            ],
          },
          'The copies go to Recently Deleted, where Photos keeps them for 30 days. The change syncs through iCloud Photos.',
          'Merging counts toward the limited free fixes, one per merged group. A caption in the subtitle shows how many are left.',
        ],
      },
      {
        h2: 'If you change your mind',
        body: [
          'A merge is recorded in History, but it has no Revert button. Instead the entry says Undo from Photos › Recently Deleted (30 days). Open Recently Deleted in Photos to recover the copies. See [how to undo a change with History](/guides/backstamp-undo-changes-history).',
        ],
      },
    ],
    steps: [
      { name: 'Scan the library', text: 'On Overview, click Scan Library.' },
      { name: 'Open Duplicates', text: 'Click Review Duplicates on the Duplicates card, or open Duplicates in the sidebar.' },
      { name: 'Set the strictness', text: 'Move the slider between Exact and Loose until the groups look right.' },
      { name: 'Pick the keeper', text: 'Click a thumbnail to make that copy the keeper. Uncheck any group you want to skip.' },
      { name: 'Merge', text: 'Click Merge N Groups…, read the confirmation, then click Merge and Remove N Copies.' },
      { name: 'Confirm in Photos', text: 'Confirm the deletion when Photos asks. The copies sit in Recently Deleted for 30 days.' },
    ],
    howTo: { name: 'How to merge duplicate photos and videos in Backstamp' },
    faq: [
      {
        q: 'Which copy does Backstamp keep by default?',
        a: 'The one with the most pixels, then a favorite, then the earliest date. You can click any other copy in the group to make it the keeper.',
      },
      {
        q: 'What does the keeper inherit?',
        a: 'Favorite status, the earliest capture date, location, and album membership from the other copies, as the merge confirmation states.',
      },
      {
        q: 'Can I get the removed copies back?',
        a: 'Yes, within 30 days. They are in Recently Deleted in Photos. Backstamp’s History does not revert a merge, because Recently Deleted is the undo.',
      },
    ],
    related: ['find-merge-duplicate-photos-apple-photos-mac', 'backstamp-undo-changes-history', 'backstamp-fix-photo-dates'],
  },

  // ---------------------------------------------------------------- 5
  {
    slug: 'backstamp-import-check-folder',
    app: 'backstamp',
    og: '/og/backstamp.png',
    short: 'How to check a folder before importing it with Backstamp',
    title: 'How to Check a Folder Before Importing It into Photos with Backstamp',
    h1: 'How to check a folder before importing it into Photos with Backstamp',
    description:
      'Use Import Check in Backstamp to see which files in a folder are new, already in Photos, or duplicates, then move extras aside or copy only the new files.',
    summary: 'Compare a folder with your library, then move extras aside or copy new files.',
    intro: [
      'Import a folder you have already imported and you get duplicates. Import Check compares a folder of photos and videos against your Photos library first, so you only bring in what is new.',
      'Backstamp is on the Mac App Store. It needs macOS 26 or later. Import Check never changes your Photos library. It only works with the files in your folder.',
    ],
    sections: [
      {
        h2: 'Choose the folder',
        body: [
          {
            ol: [
              'Open Import Check in the sidebar, under Tools.',
              'Click Choose Folder…. The panel asks you to choose a folder of photos and videos to compare against your Photos library. Click Check Folder.',
            ],
          },
          'Any folder you can pick works, for example one on a network drive. Backstamp first reads fingerprints of your library, then lists and checks the files in the folder. A progress bar and status line show where it is. Files that are not photos or videos are ignored, and the count is shown.',
        ],
      },
      {
        h2: 'Read the results',
        body: [
          'Every file gets one of four statuses:',
          {
            ul: [
              'New: not found in Photos.',
              'Already in Photos: it matches an item in your library. Its row shows that item’s thumbnail, labeled in Photos.',
              'Duplicate in folder: it is the same as another file in the folder.',
              'Unreadable: Backstamp could not read the file, so it is kept.',
            ],
          },
          'A summary at the top shows the counts and percentages, and how many of the files are duplicates. Use the Show control to filter the list by All, New, In Photos, Duplicate in folder, or Unreadable. The slider changes the thumbnail size.',
          'Each file has a checkbox. Checked means import this file. New and Unreadable files start checked. The others start unchecked. If you change one by hand, its row says changed by you, and a re-check keeps your choice.',
        ],
      },
      {
        h2: 'Copy only the files to import',
        body: [
          'Click Copy N To…, where N is the number of checked files. Choose a destination folder and click Copy Here. Backstamp copies the checked files there and keeps their subfolders. The originals stay where they are. You can then import the copy into Photos.',
        ],
      },
      {
        h2: 'Or move the extras aside',
        body: [
          {
            ol: [
              'Click Move N Excluded Aside…, where N is the number of unchecked files.',
              'Read the confirmation, titled Move N files out of the way?. Click Move N Files.',
            ],
          },
          'Files that are not marked for import move into a folder named _Backstamp inside the folder you chose. They are sorted by reason into subfolders named Already in Photos, Duplicates in folder, and Excluded by hand, with their own subfolders kept. Nothing is deleted. Every move is logged to a file named moves.csv, and your Photos library is not touched.',
          'The folder you chose now holds only the files to import. Click Undo Move to put the moved files back where they were. Re-check runs the comparison again.',
        ],
      },
      {
        h2: 'Import into Photos',
        body: [
          'When the folder holds only what you want, import it with Photos as you normally would. After importing, you can run a scan in Backstamp to look for date problems. See [how to scan your library and fix dates](/guides/backstamp-fix-photo-dates).',
        ],
      },
    ],
    steps: [
      { name: 'Open Import Check', text: 'Click Import Check in the sidebar, under Tools.' },
      { name: 'Choose a folder', text: 'Click Choose Folder…, pick the folder, then click Check Folder.' },
      { name: 'Review the statuses', text: 'Look at New, Already in Photos, Duplicate in folder, and Unreadable. Change any checkbox you disagree with.' },
      { name: 'Copy or move', text: 'Click Copy N To… to copy the checked files elsewhere, or Move N Excluded Aside… to move the rest into a _Backstamp folder.' },
      { name: 'Undo if needed', text: 'Click Undo Move to put moved files back.' },
      { name: 'Import', text: 'Import the remaining files into Photos.' },
    ],
    howTo: { name: 'How to check a folder before importing it into Photos with Backstamp' },
    faq: [
      {
        q: 'Does Import Check change my Photos library?',
        a: 'No. It reads your library to compare, and only moves or copies files in your own folders.',
      },
      {
        q: 'Are any files deleted when I move them aside?',
        a: 'No. Excluded files move into a _Backstamp folder inside the chosen folder, a log is written to moves.csv, and Undo Move restores them.',
      },
      {
        q: 'What if a file shows Unreadable?',
        a: 'Backstamp could not read it, so the file is kept and checked for import by default. Open it yourself to see whether it is a damaged file.',
      },
    ],
    related: ['find-merge-duplicate-photos-apple-photos-mac', 'backstamp-merge-duplicates', 'backstamp-fix-photo-dates'],
  },

  // ---------------------------------------------------------------- 6
  {
    slug: 'backstamp-undo-changes-history',
    app: 'backstamp',
    og: '/og/backstamp.png',
    short: 'How to undo a change in Backstamp with History',
    title: 'How to Undo a Date Change or Album Removal in Backstamp with History',
    h1: 'How to undo a date change or album removal in Backstamp with History',
    description:
      'Backstamp records every date change, merge, and album removal in History. Revert dates, add album items back, and see why merges use Recently Deleted.',
    summary: 'Revert date batches, add items back to albums, and see what History cannot undo.',
    intro: [
      'Backstamp writes every change to a journal before it sends the change to Photos, and shows the journal as History. That is how you can trace what happened and, for most changes, undo it.',
      'Backstamp is on the Mac App Store. Undo is never limited by the free fixes.',
    ],
    sections: [
      {
        h2: 'Open History',
        body: [
          'Click History in the sidebar, under Tools. The Overview also shows a Recent changes list with the last few batches and a View History button.',
          'Batches are listed newest first. Each header shows its type, when it ran, and how many items it holds. The types are Applied dates, Reverted dates, Merged duplicates, Album removal, and Album re-add. The segmented control at the top filters by All, Dates, Merges, or Albums.',
          'Each item row shows its file name and what changed. For dates it shows the old date, an arrow, and the new date, with the source. A green check means it worked. A red mark means it failed, and its tooltip gives the reason.',
        ],
      },
      {
        h2: 'Revert a batch of dates',
        body: [
          {
            ol: [
              'Find the Applied dates batch in History.',
              'Click Revert… in its header.',
              'Read the confirmation, titled Revert N change(s)?. It explains that each item is set back to its old date, but only if its date has not been changed again since. It syncs through iCloud Photos and is itself recorded.',
              'Click Revert.',
            ],
          },
          'The reversal is added to History as its own Reverted dates batch, and the original batch is marked reverted. If an item’s date was changed again after your batch, Backstamp skips it and lists a message.',
        ],
      },
      {
        h2: 'Add items back to an album',
        body: [
          'The Albums tool can take items out of an album once their dates are fixed. The Remove N Dated from Album… button removes items whose dates were applied with confidence, or confirmed by their metadata. The items stay in your library. Only their place in that album is removed.',
          'To undo it, find the Album removal batch in History and click Add Back…. The confirmation, Add N item(s) back to their album?, says the items are added back, and that this syncs through iCloud Photos and is itself recorded. Click Add Back.',
        ],
      },
      {
        h2: 'What History cannot revert',
        body: [
          'A Merged duplicates batch has no Revert button. Merging sends the extra copies to Recently Deleted in Photos, and that is the undo. The batch header says Undo from Photos › Recently Deleted (30 days). Open Recently Deleted in Photos within 30 days to recover them.',
          'Reverted dates and Album re-add batches are records of an undo. They do not offer another revert.',
        ],
      },
      {
        h2: 'See the journal file',
        body: [
          'Click Show Journal in Finder at the top right of History to reveal the journal file on your Mac. If a batch holds more than 500 items, the list shows the first 500 and says the rest are in the journal file.',
        ],
      },
    ],
    steps: [
      { name: 'Open History', text: 'Click History in the sidebar, under Tools.' },
      { name: 'Find the batch', text: 'Use the All, Dates, Merges, or Albums control to find the batch you want to undo.' },
      { name: 'Revert or add back', text: 'Click Revert… on an Applied dates batch, or Add Back… on an Album removal batch.' },
      { name: 'Confirm', text: 'Read the confirmation and click Revert or Add Back.' },
      { name: 'For a merge, use Photos', text: 'Open Recently Deleted in Photos within 30 days to recover merged copies.' },
    ],
    howTo: { name: 'How to undo a date change or album removal in Backstamp' },
    faq: [
      {
        q: 'Why can’t I revert a merge in Backstamp?',
        a: 'A merge sends the extra copies to Recently Deleted in Photos, which keeps them for 30 days. That is the safety net, so History points you there instead of offering a Revert button.',
      },
      {
        q: 'What if I changed a date again after Backstamp applied it?',
        a: 'A revert only changes an item if its date is still the one Backstamp set. If you edited it since, the item is skipped and a message says so.',
      },
      {
        q: 'Does undoing use up my free fixes?',
        a: 'No. Reverts and re-adds are not counted against the free fixes.',
      },
    ],
    related: ['backstamp-fix-photo-dates', 'backstamp-merge-duplicates', 'fix-wrong-photo-dates-apple-photos-mac'],
  },
];
