// Where each app's marketing assets live, relative to the Apps directory
// (sibling of the Websites directory by default; override with APPS_DIR).
//
// `screens` lists source folders in the order their screenshots should appear
// on the site. Only files directly inside each folder are used (sub-folders are
// ignored), sorted naturally (Screen2 before Screen10). An entry ending in
// "prefix-*" takes only the files in that folder whose names start with "prefix-".
//
// Run `npm run assets` (all apps) or `npm run assets -- stork maestro`.

export const APPS_DIR_DEFAULT = '../../Apps';

/** @type {Array<{ app: string; source: string; icon: string; screens: string[] }>} */
export default [
  {
    app: 'maestro',
    source: 'Maestro',
    icon: 'Icons/AppIcon.png',
    // The 2.0 store set (build 41), kept with the app's marketing files.
    screens: [
      'Marketing/Maestro 2.0/store-screenshots/draft-2/mac',
      'Marketing/Maestro 2.0/store-screenshots/draft-2/iphone',
      'Marketing/Maestro 2.0/store-screenshots/draft-2/ipad',
    ],
  },
  {
    app: 'opalite',
    source: 'Opalite',
    icon: 'Icons/AppIcon.png',
    // The 2.0 store set: one folder of exports, picked out by device prefix.
    screens: [
      '../../Marketing/Opalite 2.0/store-screenshots/final/exports/iphone-*',
      '../../Marketing/Opalite 2.0/store-screenshots/final/exports/ipad-*',
      '../../Marketing/Opalite 2.0/store-screenshots/final/exports/mac-*',
      '../../Marketing/Opalite 2.0/store-screenshots/final/exports/vision-*',
      '../../Marketing/Opalite 2.0/store-screenshots/final/exports/tv-*',
      '../../Marketing/Opalite 2.0/store-screenshots/final/exports/watch-*',
    ],
  },
  {
    app: 'setdeck',
    source: 'SetDeck',
    icon: 'Icons/AppIcon.png',
    screens: [
      'Screenshots/Professional/iPhone',
      'Screenshots/Professional/iPad',
      'Screenshots/Professional/Watch',
    ],
  },
  {
    app: 'mygra',
    source: 'Mygra',
    icon: 'Icons/AppIcon.png',
    // The 3.0 store set: one folder of exports, picked out by device prefix.
    screens: [
      'Marketing/Mygra 3.0/store-screenshots/final/iphone-*',
      'Marketing/Mygra 3.0/store-screenshots/final/ipad-*',
      'Marketing/Mygra 3.0/store-screenshots/final/duo-outer-*',
      'Marketing/Mygra 3.0/store-screenshots/final/duo-inner-*',
      'Marketing/Mygra 3.0/store-screenshots/final/watch-*',
    ],
  },
  {
    app: 'stork',
    source: 'Stork',
    icon: 'Icons/AppIcon.png',
    screens: [
      'Screenshots/Professional/iPhone',
      'Screenshots/Professional/iPad',
      'Screenshots/Professional/Watch',
    ],
  },
  {
    app: 'waffle',
    source: 'Waffle',
    icon: 'Icons/AppIcon.png',
    screens: ['Screenshots/Professional/iPad'],
  },
];
