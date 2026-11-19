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
/**
 * Where to look for an app that is not (yet) in APPS_DIR_DEFAULT. The apps are
 * moving from the old Molargik Software folder to Farside Software one by one;
 * drop this once they have all moved. Ignored when APPS_DIR is set.
 */
export const APPS_DIR_FALLBACKS = ['../../../Molargik Software LLC/Apps'];

/**
 * `iconComposer` is the app's Icon Composer file; its Dark rendition becomes
 * icon-dark.png, which the site fades to while an icon is hovered.
 * An app with no exported `Icons/AppIcon.png` sets `iconFromComposer: true`
 * and both its icons are rendered from the Icon Composer file (Default and Dark).
 * @type {Array<{ app: string; source: string; icon?: string; iconComposer?: string; iconFromComposer?: boolean; screens: string[] }>}
 */
export default [
  {
    app: 'maestro',
    source: 'Maestro',
    icon: 'Icons/AppIcon.png',
    iconComposer: 'App/Shared/AppIcon.icon',
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
    iconComposer: 'Opalite/AppIcon.icon',
    // The 2.0 store set: one folder of exports, picked out by device prefix.
    screens: [
      'Marketing/Opalite 2.0/store-screenshots/final/exports/iphone-*',
      'Marketing/Opalite 2.0/store-screenshots/final/exports/ipad-*',
      'Marketing/Opalite 2.0/store-screenshots/final/exports/mac-*',
      'Marketing/Opalite 2.0/store-screenshots/final/exports/vision-*',
      'Marketing/Opalite 2.0/store-screenshots/final/exports/tv-*',
      'Marketing/Opalite 2.0/store-screenshots/final/exports/watch-*',
    ],
  },
  {
    app: 'setdeck',
    source: 'SetDeck',
    icon: 'Icons/AppIcon.png',
    iconComposer: 'SetDeck/AppIcon.icon',
    // The 3.0 store set.
    screens: [
      'Marketing/SetDeck 3.0/store-screenshots/final/iphone-*',
      'Marketing/SetDeck 3.0/store-screenshots/final/ipad-*',
      'Marketing/SetDeck 3.0/store-screenshots/final/duo-folded-*',
      'Marketing/SetDeck 3.0/store-screenshots/final/duo-unfolded-*',
      'Marketing/SetDeck 3.0/store-screenshots/final/watch-*',
    ],
  },
  {
    app: 'mygra',
    source: 'Mygra',
    icon: 'Icons/AppIcon.png',
    iconComposer: 'Mygra/MygraIcon.icon',
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
    iconComposer: 'Stork/AppIcon.icon',
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
    iconComposer: 'Waffle/WaffleIcon.icon',
    screens: ['Screenshots/Professional/iPad'],
  },
  {
    app: 'backstamp',
    source: 'Backstamp',
    iconComposer: 'Backstamp/AppIcon.icon',
    iconFromComposer: true,
    // TODO(backstamp): add the Matte-made store screenshots here once they exist,
    // e.g. 'Marketing/Backstamp 1.0/store-screenshots/final/mac-*'.
    screens: [],
  },
];
