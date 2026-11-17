// Waffle how-to guides (/guides and /guides/<slug>).
//
// Every step and on-screen label below was read from the Waffle app source
// (Packages/Waffle sources, marketing version 1.6.0). When a detail could not
// be confirmed in the source it was left out or described generically. No
// prices belong in this file.
//
// Body blocks: a string is a paragraph, { ul: [...] } a bullet list, and
// { ol: [...] } a numbered list. Inline links use [label](/path) and are only
// for internal paths.

export const hub = {
  title: 'Waffle',
  blurb: 'Set up a grid, refresh cells on a timer, and save and share presets.',
};

export const app = {
  slug: 'waffle',
  heading: 'Want a grid of live pages on your iPad?',
  blurb: 'Waffle keeps several live webpages on screen at once, so you can browse sites side by side instead of switching tabs: a grid on iPad, two pages on iPhone.',
  button: 'Get Waffle on the App Store',
  notice: 'Waffle is an independent app from Farside Software. These how-tos cover the grid on iPad. iPad and iPhone are trademarks of Apple Inc.',
  checked: 'Waffle 1.6.0 source',
  checkedOn: 'November 17, 2026',
  checkedIso: '2026-11-17',
};

export default [
  // ---------------------------------------------------------------- 1
  {
    slug: 'waffle-set-up-grid-of-pages',
    app: 'waffle',
    og: '/og/waffle.png',
    short: 'How to set up a grid of pages in Waffle',
    title: 'How to Set Up a Grid of Web Pages in Waffle',
    h1: 'How to set up a grid of web pages in Waffle',
    description:
      'Add rows and columns, pick a cell, load a page into it, and drop in bookmarks. Free grids go up to 2×2, and Syrup unlocks up to 4×4.',
    summary: 'Resize the grid, select a cell, and load a page into each one.',
    intro: [
      'Waffle shows several live webpages at once, in a grid of cells. Each cell is its own browser, so a page in one cell does not affect the others.',
      'This guide shows how to size the grid and fill it. Free grids go up to 2×2. Syrup, the one-time unlock, raises that to 4×4.',
    ],
    sections: [
      {
        h2: 'How the grid works',
        body: [
          'A new grid starts as a single empty cell. Empty cells show an Empty Cell card with a short reminder of what to do.',
          'Tap a cell to select it. The selected cell has an outline. The address bar, Back, Forward, and Reload at the top of the screen all act on the selected cell only.',
        ],
      },
      {
        h2: 'Step 1: size the grid',
        body: [
          {
            ol: [
              'Tap the grid icon in the toolbar at the top right. Its accessibility name is Grid options.',
              'Choose Add Row or Add Column to grow the grid. Choose Subtract Row or Subtract Column to shrink it.',
              'Repeat until the grid is the shape you want.',
            ],
          },
          'Without Syrup, Add Row and Add Column stop being available once the grid reaches 2 rows or 2 columns. With Syrup, the limit is 4 rows and 4 columns. The grid never goes below one row and one column.',
        ],
      },
      {
        h2: 'Step 2: load a page into a cell',
        body: [
          {
            ol: [
              'Tap the cell you want to fill.',
              'Tap the address bar. It shows the placeholder Search or enter a URL, and it expands to fill the toolbar while you type.',
              'Type a web address or a search, then submit it.',
              'Tap the next cell and repeat.',
            ],
          },
          'If what you type starts with http:// or https://, Waffle opens it as written. If it contains a dot and no spaces, or starts with www., Waffle adds https:// for you. Anything else is treated as a search.',
          'To pick the search engine, tap Settings (the gear icon at the top left of the sidebar) and use Default Search Engine. The choices are Google and DuckDuckGo.',
        ],
      },
      {
        h2: 'Fill cells from your bookmarks',
        body: [
          'The sidebar has a Bookmarks section. Tap a bookmark to load it into the selected cell, or drag it onto any cell to load it there.',
          'To save the page in the selected cell, tap New in the Bookmarks header and choose Quick Save. Choose Save As… if you want to set the title and URL yourself.',
        ],
      },
      {
        h2: 'What Syrup adds to the grid',
        body: [
          'Syrup is the one-time unlock. For grids it adds three things:',
          {
            ul: [
              'Grids larger than 2×2, up to 4×4.',
              'Rearrange, in the Grid options menu. It opens a Rearrange Grid sheet where you drag a cell to a new spot, or tap two cells to swap them, then tap Save.',
              'Fullscreen and Pop Out buttons in the toolbar. They appear when the grid has more than one cell. Fullscreen shows the selected cell by itself, and Pop Out moves it into its own window. Pop Back returns it.',
            ],
          },
          'Waffle saves your grid automatically and brings it back the next time you open the app.',
        ],
      },
    ],
    steps: [
      { name: 'Open Grid options', text: 'Tap the grid icon at the top right of the toolbar, named Grid options.' },
      { name: 'Add rows and columns', text: 'Choose Add Row or Add Column until the grid has the shape you want. Free grids stop at 2×2, and Syrup allows up to 4×4.' },
      { name: 'Select a cell', text: 'Tap a cell to select it. The address bar, Back, Forward, and Reload act on the selected cell.' },
      { name: 'Enter an address', text: 'Tap the address bar, which reads Search or enter a URL, type a web address or a search, and submit it.' },
      { name: 'Fill the other cells', text: 'Tap each remaining cell and load a page, or tap a bookmark in the sidebar, or drag a bookmark onto a cell.' },
    ],
    howTo: { name: 'How to set up a grid of pages in Waffle' },
    faq: [
      { q: 'How big can the grid be?', a: 'Free grids go up to 2×2. With Syrup, the one-time unlock, the grid can go up to 4×4.' },
      { q: 'Why is Add Row or Add Column unavailable?', a: 'The grid has reached its limit. Without Syrup that is 2 rows or 2 columns. With Syrup it is 4 rows or 4 columns.' },
      { q: 'Will my grid be there when I reopen Waffle?', a: 'Yes. Waffle saves the grid automatically and restores it when you open the app again.' },
    ],
    related: ['waffle-auto-refresh-a-cell', 'waffle-save-and-share-a-preset'],
  },

  // ---------------------------------------------------------------- 2
  {
    slug: 'waffle-auto-refresh-a-cell',
    app: 'waffle',
    og: '/og/waffle.png',
    short: 'How to auto-refresh a page on a timer in Waffle',
    title: 'How to Auto-Refresh a Page on a Timer in Waffle',
    h1: 'How to auto-refresh a page on a timer in Waffle',
    description:
      'Set any cell in your Waffle grid to reload every 30 seconds, every minute, every 5 minutes, or every 15 minutes. It is free and set per cell.',
    summary: 'Reload a cell every 30 seconds to 15 minutes. Free.',
    intro: [
      'Dashboards, scoreboards, and news pages go stale. Waffle can reload a cell for you on a timer, so a page stays current while you work in another cell.',
      'Auto-refresh is set one cell at a time, and it is free. You do not need Syrup.',
    ],
    sections: [
      {
        h2: 'The choices',
        body: [
          'Each cell can use one of five settings:',
          {
            ul: ['Off', 'Every 30 seconds', 'Every minute', 'Every 5 minutes', 'Every 15 minutes'],
          },
          'Every cell starts with auto-refresh off.',
        ],
      },
      {
        h2: 'Set it for the selected cell',
        body: [
          {
            ol: [
              'Tap the cell you want to refresh, so it is the selected cell.',
              'Touch and hold the Reload button in the toolbar. A tap reloads the cell once. A touch and hold opens a menu.',
              'Open Auto-Refresh in that menu.',
              'Choose an interval, for example Every 5 minutes.',
            ],
          },
          'Once a timer is set, the Auto-Refresh row shows the interval you chose, and the Reload button changes to a different icon. To turn it off, choose Off in the same menu.',
        ],
      },
      {
        h2: 'Set it for a cell you have not selected',
        body: [
          'You can also touch and hold a cell that is not selected. Its menu has Copy To Selected Cell, Reload, and Auto-Refresh. Choose Auto-Refresh and pick an interval, the same as above.',
          'Empty cells do not show this menu.',
        ],
      },
      {
        h2: 'When the timer runs',
        body: [
          {
            ul: [
              'Cells reload only while Waffle is the active app. Timers pause when you switch away, and the countdown starts over when you come back.',
              'Changing a cell’s interval restarts its countdown from that moment.',
              'Each cell keeps its own interval. Changing one cell does not change the others.',
              'Auto-refresh is saved with your grid and with any preset you save, so a saved grid comes back with its timers.',
            ],
          },
        ],
      },
    ],
    steps: [
      { name: 'Select the cell', text: 'Tap the cell you want to keep current, so it is the selected cell.' },
      { name: 'Touch and hold Reload', text: 'Touch and hold the Reload button in the toolbar. A single tap only reloads the cell once.' },
      { name: 'Open Auto-Refresh', text: 'Open Auto-Refresh in the menu that appears.' },
      { name: 'Pick an interval', text: 'Choose Every 30 seconds, Every minute, Every 5 minutes, or Every 15 minutes. Choose Off to stop.' },
    ],
    howTo: { name: 'How to auto-refresh a page on a timer in Waffle' },
    faq: [
      { q: 'Does auto-refresh need Syrup?', a: 'No. Auto-refresh is free. Syrup is not required to set a timer on any cell.' },
      { q: 'Does Waffle keep refreshing when I leave the app?', a: 'No. Cells reload only while Waffle is active. When you return, the countdown starts again from that moment.' },
      { q: 'Is the timer saved in a preset?', a: 'Yes. Each cell’s interval is saved with the grid and with presets. Saving presets needs Syrup.' },
    ],
    related: ['waffle-set-up-grid-of-pages', 'waffle-save-and-share-a-preset'],
  },

  // ---------------------------------------------------------------- 3
  {
    slug: 'waffle-save-and-share-a-preset',
    app: 'waffle',
    og: '/og/waffle.png',
    short: 'How to save and share a preset in Waffle',
    title: 'How to Save and Share a Grid Preset in Waffle',
    h1: 'How to save and share a grid preset in Waffle',
    description:
      'Save a whole grid as a preset, bring it back in one tap, update or rename it, and share it. Presets are part of Syrup, the one-time unlock.',
    summary: 'Save a grid, reopen it in one tap, and share it. Needs Syrup.',
    intro: [
      'A preset saves a whole grid: its size, the page in every cell, and each cell’s auto-refresh setting. Save a morning news grid or a work grid once, and open it again with a tap.',
      'Presets are part of Syrup, the one-time unlock. Without Syrup, the Presets section shows a Syrup Required card instead.',
    ],
    sections: [
      {
        h2: 'Step 1: build the grid you want to keep',
        body: [
          'Set up your grid first. See [how to set up a grid of pages](/guides/waffle-set-up-grid-of-pages). If you want cells to reload on a timer, set that now too, because the timers are saved with the preset. See [how to auto-refresh a page](/guides/waffle-auto-refresh-a-cell).',
        ],
      },
      {
        h2: 'Step 2: save the preset',
        body: [
          {
            ol: [
              'Find the Presets section in the sidebar.',
              'Tap New in the Presets header.',
              'Choose Quick Save to save at once, or Save As… to name it.',
              'If you chose Save As…, type a name in the Name field of the Save Preset alert and tap Save.',
            ],
          },
          'Quick Save names the preset with the date and time. You can rename it later.',
          'Each preset row shows its name and its grid size, such as 2x2.',
        ],
      },
      {
        h2: 'Open, update, and rename a preset',
        body: [
          {
            ul: [
              'To open a preset, tap it. It replaces the cells in your current grid, so save anything you want to keep first.',
              'To update a preset to match the grid on screen now, swipe its row to the right and tap Update.',
              'To rename it, touch and hold the row and choose Rename.',
              'To delete it, swipe the row to the left, or touch and hold it and choose Delete.',
            ],
          },
        ],
      },
      {
        h2: 'Step 3: share a preset',
        body: [
          {
            ol: [
              'Touch and hold the preset in the sidebar.',
              'Choose Share Preset.',
              'Pick where to send it from the share sheet.',
            ],
          },
          'The shared text has the preset’s name and grid size, a waffle://preset link, and the page addresses, one per line.',
          'The waffle://preset link opens the preset on your own devices, because presets sync through your iCloud. Anyone else can use the page addresses in the message to rebuild the grid by hand.',
        ],
      },
    ],
    steps: [
      { name: 'Build your grid', text: 'Set the grid size, load a page into each cell, and set any auto-refresh timers you want to keep.' },
      { name: 'Open the Presets header', text: 'In the sidebar, find the Presets section and tap New.' },
      { name: 'Save it', text: 'Choose Quick Save, or choose Save As…, type a name, and tap Save.' },
      { name: 'Open it later', text: 'Tap the preset in the sidebar to bring the whole grid back.' },
      { name: 'Share it', text: 'Touch and hold the preset, choose Share Preset, and pick where to send it.' },
    ],
    howTo: { name: 'How to save and share a preset in Waffle' },
    faq: [
      { q: 'Do presets need Syrup?', a: 'Yes. Creating, updating, and opening presets are part of Syrup, the one-time unlock.' },
      { q: 'What does a preset remember?', a: 'The grid size, the page in each cell, and each cell’s auto-refresh interval.' },
      { q: 'Will a friend get my exact grid when I share a preset?', a: 'Not automatically. The message includes a waffle://preset link, which opens the preset on your own devices through iCloud sync, plus the page addresses. A friend can open those addresses in their own grid.' },
    ],
    related: ['waffle-set-up-grid-of-pages', 'waffle-auto-refresh-a-cell'],
  },
];
