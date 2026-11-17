// SetDeck how-to guides (/guides/<slug>).
//
// Every step and on-screen label below was checked against the SetDeck app
// source (version 2.6, the SwiftUI views in Packages/SetDeck/Sources and the
// Apple Watch app target). When a label or behavior could not be confirmed in
// the source it was described generically or left out. No prices belong in
// this file.
//
// Body blocks: a string is a paragraph, { ul: [...] } a bullet list, and
// { ol: [...] } a numbered list. Inline links use [label](/path) and are only
// for internal paths.

export const hub = {
  title: 'SetDeck',
  blurb: 'Build a weekly routine, log sets, and run a workout from Apple Watch.',
};

export const app = {
  slug: 'setdeck',
  heading: 'Ready to plan your training week?',
  blurb: 'SetDeck is a strength training tracker for iPhone and Apple Watch: weekly routines, set-by-set logging, stats, and achievements.',
  button: 'Get SetDeck on the App Store',
  notice:
    'SetDeck is an independent app from Farside Software. Apple Watch, Apple Health, iPhone, and Siri are trademarks of Apple Inc.',
  checked: 'SetDeck 2.6 source',
  checkedOn: 'November 17, 2026',
  checkedIso: '2026-11-17',
};

export default [
  // ---------------------------------------------------------------- 1
  {
    slug: 'setdeck-build-weekly-routine',
    app: 'setdeck',
    og: '/og/setdeck.png',
    short: 'How to build a weekly routine in SetDeck',
    title: 'How to Build a Weekly Routine in SetDeck',
    h1: 'How to build a weekly routine in SetDeck',
    description:
      'Add exercises to each day of the week in SetDeck, choose a set type for every set, set reps and weight, mark warm-ups, and switch between kilograms and pounds.',
    summary: 'Add exercises and sets to each day, then pick set types.',
    intro: [
      'SetDeck organizes training by weekday. Each of the seven days has its own list of exercises, and each exercise has its own list of sets. You build all of it on one screen called Edit Routine.',
      'This guide walks through adding an exercise, shaping its sets, and repeating that for the other days of the week.',
    ],
    sections: [
      {
        h2: 'Open Edit Routine and pick a day',
        body: [
          {
            ol: [
              'Open the Routine tab. It is the first of the four tabs: Routine, Stats, Health, and Settings.',
              'Tap Edit Routine at the top right.',
              'Use the row of weekday buttons near the top to choose the day you want to build. The selected day shows its short name, such as Mon, and the other days show a single letter.',
            ],
          },
          'Edit Routine opens with today selected. Each day is separate, so a Monday exercise does not appear on Tuesday unless you add it there too.',
        ],
      },
      {
        h2: 'Add an exercise',
        body: [
          {
            ol: [
              'Tap Add Exercise. A new exercise named New Exercise appears at the bottom of the day.',
              'Tap the Exercise Name field and type the name. Tap the checkmark next to the field when you are done.',
              'If the exercise is a warm-up, turn on the Warmup? switch beside the name.',
            ],
          },
          'Every new exercise starts with one set, so you have something to adjust right away. To remove an exercise and all its sets, tap the red trash icon in its header.',
        ],
      },
      {
        h2: 'Shape the sets',
        body: [
          'Under each exercise, every set has a row of four choices for its type: Reps, AMAP, Duration, and Freeform. AMAP means as many as possible. Tap the type that fits the set.',
          {
            ul: [
              'Reps and AMAP show a reps field and a Weight field. For AMAP the reps field is labeled Reps Attempted.',
              'Duration shows a Duration (min) field.',
              'Freeform has no reps or weight fields.',
              'Every type also has an RPE field, a number you can raise or lower with the minus and plus buttons.',
            ],
          },
          'Use the minus and plus buttons beside a field to change its value. To add another set to an exercise, tap Add Set under it. To remove a set, tap the red trash icon on its row. The icon only appears when an exercise has more than one set.',
        ],
      },
      {
        h2: 'Choose kilograms or pounds',
        body: [
          'Weights are shown in pounds by default. To switch to kilograms, open the Settings tab and turn on Display Water in Liters. Despite the name, this one switch controls the unit for both weights and water.',
        ],
      },
      {
        h2: 'Finish up and use the routine',
        body: [
          'Tap Save at the top right to close Edit Routine. Your changes are stored as you make them, so Save closes the screen.',
          'Back on the Routine tab, pick a day with the weekday buttons to see that day’s exercises as a stack of cards. A day with no exercises shows a message that there is no routine for the day. To train from the cards, see [how to log a workout set by set](/guides/setdeck-log-workout-set-by-set).',
        ],
      },
    ],
    steps: [
      { name: 'Open Edit Routine', text: 'On the Routine tab, tap Edit Routine at the top right.' },
      { name: 'Choose a day', text: 'Tap one of the weekday buttons to pick the day you want to build.' },
      { name: 'Add an exercise', text: 'Tap Add Exercise, then type a name in the Exercise Name field.' },
      { name: 'Mark warm-ups', text: 'Turn on the Warmup? switch if the exercise is a warm-up.' },
      { name: 'Choose a set type', text: 'For each set, pick Reps, AMAP, Duration, or Freeform.' },
      { name: 'Set the numbers', text: 'Use the minus and plus buttons to set reps, weight, duration, and RPE. Tap Add Set for more sets.' },
      { name: 'Repeat for other days', text: 'Pick another weekday and repeat the steps.' },
      { name: 'Save', text: 'Tap Save to close Edit Routine.' },
    ],
    howTo: { name: 'How to build a weekly routine in SetDeck' },
    faq: [
      {
        q: 'Do I have to fill in all seven days?',
        a: 'No. Each day is separate. A day with no exercises simply shows a message that there is no routine for that day.',
      },
      {
        q: 'What does AMAP mean?',
        a: 'AMAP stands for as many as possible. It is one of the four set types, along with Reps, Duration, and Freeform. On an AMAP set the reps field is labeled Reps Attempted.',
      },
      {
        q: 'Does deleting an exercise delete its sets?',
        a: 'Yes. The trash icon on an exercise removes that exercise and all of its sets.',
      },
    ],
    related: ['setdeck-log-workout-set-by-set', 'setdeck-apple-watch-workout'],
  },

  // ---------------------------------------------------------------- 2
  {
    slug: 'setdeck-log-workout-set-by-set',
    app: 'setdeck',
    og: '/og/setdeck.png',
    short: 'How to log a workout set by set in SetDeck',
    title: 'How to Log a Workout Set by Set in SetDeck',
    h1: 'How to log a workout set by set in SetDeck',
    description:
      'Record each set on the Routine tab, change reps, weight, and RPE as you go, start a timed workout on the Health tab, and read your totals on the Stats tab.',
    summary: 'Log sets on the cards, time the workout, and read your stats.',
    intro: [
      'Once a day has exercises, the Routine tab shows them as a stack of cards. You log each set by tapping it, checking the numbers, and confirming. Every confirmed set is saved to your history, and the Stats tab builds from that history.',
      'Logging sets and recording a workout are two separate things. This guide covers both, and then shows where the results appear.',
    ],
    sections: [
      {
        h2: 'Find today’s cards',
        body: [
          'Open the Routine tab. It selects today automatically. Tap another weekday button above the cards if you want to look at a different day.',
          'The top card is the first exercise. Swipe the card sideways to move to the next exercise. The arrow buttons at the bottom also step to the previous or next exercise, and show a count such as 1 of 4.',
        ],
      },
      {
        h2: 'Log a set',
        body: [
          {
            ol: [
              'Tap a set on the card to open its editor. The row shows a small badge for the set type, then the planned reps and weight.',
              'Check the values. Reps, Weight, and RPE each have minus and plus buttons. A Duration (minutes) field replaces Reps on timed sets.',
              'Change anything that differs from the plan.',
              'Tap Log. If you changed a value, the same button reads Save instead.',
            ],
          },
          'Tap Cancel to close the editor without recording anything.',
          'Logging does two things. It records the set in your history with the values you confirmed, and it updates the planned values on the card to match them. The next time you open the card, it starts from what you last logged.',
        ],
      },
      {
        h2: 'Record the workout',
        body: [
          'A workout is the timer and the Apple Health entry. It is optional, and it is separate from logging sets.',
          {
            ol: [
              'Open the Health tab.',
              'In the Record Workout card at the top, tap Start. The card shows the elapsed time.',
              'Train and log your sets as above. A timer chip also appears at the top of the Routine tab while the workout runs. Tap it to jump back to the Health tab.',
              'When you finish, tap Stop on the Health tab.',
            ],
          },
          'When you stop, a Workout Complete sheet shows the duration and offers a Share Summary button. Tap Done to close it.',
          'Platform limits matter here. In the source, a full workout session that is saved to Apple Health requires iOS 26 or later. On iOS 18 through 25 the workout is tracked with the Live Activity timer only. The Record Workout card appears at the top of the Health tab on iPhone-width screens.',
        ],
      },
      {
        h2: 'Read your stats',
        body: [
          'Open the Stats tab after you have logged some sets. Until then it shows a message that your stats await. Once there is history, you will see:',
          {
            ul: [
              'A summary row with Volume, Sets, Active Days, and Best Streak.',
              'Training Volume, a chart of volume by day. Volume is reps multiplied by weight, added up across your logged sets.',
              'Personal Records, listing the best weight for each exercise.',
              'Exercise Progress, where an Exercise menu lets you pick one exercise to chart.',
              'Intensity (RPE), a chart that fills in once you log RPE values.',
            ],
          },
          'The 30D, 90D, and All buttons at the top choose the time range. On devices that support it, the Stats tab can also show muscle charts. In the source these need iOS 26 and the on-device language model to be available, so they may not appear on your device.',
        ],
      },
    ],
    steps: [
      { name: 'Open the Routine tab', text: 'Today’s exercises appear as a stack of cards. Swipe a card sideways for the next exercise.' },
      { name: 'Tap a set', text: 'Tap a set on the card to open its editor.' },
      { name: 'Adjust the numbers', text: 'Use the minus and plus buttons to change Reps, Weight, Duration, or RPE if they differ from the plan.' },
      { name: 'Log the set', text: 'Tap Log, or Save if you changed a value. Tap Cancel to close without recording.' },
      { name: 'Start the workout timer', text: 'Optionally open the Health tab and tap Start in the Record Workout card.' },
      { name: 'Stop the workout', text: 'When you finish, tap Stop on the Health tab, then Done on the Workout Complete sheet.' },
      { name: 'Review your stats', text: 'Open the Stats tab and choose 30D, 90D, or All to see your totals.' },
    ],
    howTo: { name: 'How to log a workout set by set in SetDeck' },
    faq: [
      {
        q: 'Do I need to start a workout to log sets?',
        a: 'No. Logging a set from the Routine tab saves it to your history on its own. The Start button on the Health tab only adds the timer and the workout entry.',
      },
      {
        q: 'What is the difference between Log and Save?',
        a: 'They record the set the same way. The button reads Log when you have not changed any value in the editor, and Save when you have.',
      },
      {
        q: 'Why is my Stats tab empty?',
        a: 'Stats are built from logged sets. Log at least one set from the Routine tab and the summary, charts, and records appear.',
      },
    ],
    related: ['setdeck-build-weekly-routine', 'setdeck-apple-watch-workout'],
  },

  // ---------------------------------------------------------------- 3
  {
    slug: 'setdeck-apple-watch-workout',
    app: 'setdeck',
    og: '/og/setdeck.png',
    short: 'How to run a workout from Apple Watch in SetDeck',
    title: 'How to Run a Workout from Apple Watch in SetDeck',
    h1: 'How to run a workout from Apple Watch in SetDeck',
    description:
      'Load today’s routine on your Apple Watch, start a workout, log each set with one tap, use the rest timer, and adjust reps or weight when a set goes differently.',
    summary: 'Start from your wrist, log sets with a tap, and use the rest timer.',
    intro: [
      'The SetDeck Apple Watch app runs today’s routine from your wrist. You start the workout, see the next set, log it with one tap, and a rest timer counts down before the one after.',
      'The routine itself is built on iPhone. This guide covers the watch side: getting the routine onto the watch, logging, adjusting, and finishing.',
    ],
    sections: [
      {
        h2: 'Before you start',
        body: [
          {
            ul: [
              'Build the day’s routine on iPhone first. See [how to build a weekly routine](/guides/setdeck-build-weekly-routine).',
              'SetDeck needs watchOS 11 or later on the watch.',
              'Open SetDeck on your iPhone once so it can send today’s routine to the watch. If the watch has no routine yet, it shows a message asking you to do exactly that.',
            ],
          },
          'The watch app works with today’s routine only. If it shows No Exercises, add exercises for today on your iPhone and tap Refresh. If it shows iPhone not nearby, open SetDeck on your iPhone and tap Retry.',
        ],
      },
      {
        h2: 'Start the workout',
        body: [
          {
            ol: [
              'Open SetDeck on your Apple Watch. The first screen is titled Workout.',
              'It shows the day’s name and how many exercises and sets it holds. Tap Start Workout.',
            ],
          },
          'Starting also records a strength training workout on the watch. Turn the Digital Crown or swipe vertically to move between the watch app’s screens: the workout, today’s routine, workout controls, and the rest timer.',
        ],
      },
      {
        h2: 'Log each set',
        body: [
          'During a workout the screen shows the exercise name, a line such as Set 1 of 3, and the target for that set.',
          {
            ol: [
              'Do the set.',
              'Tap Log Set. The set is logged at its target reps and weight, and the rest timer starts.',
              'If the set went differently, tap Adjust instead. A Log Set screen opens with REPS and WEIGHT controls. Change them, then tap Log. Tap Cancel to go back.',
            ],
          },
          'If your watch supports Double Tap, the Log Set button responds to it. The source also provides a Log Next Set shortcut that you can assign to the Action Button in your watch settings on watches that have one, or run with Siri by saying “Log my next set in SetDeck.”',
        ],
      },
      {
        h2: 'Use the rest timer',
        body: [
          'After each logged set, a REST banner counts down at the top of the workout screen. It has two buttons: +30s adds thirty seconds, and Skip ends the rest early. When the timer finishes, your wrist gets a haptic tap.',
          'The default rest is 90 seconds. To change it, go to the Rest Timer screen when no rest is running. Under Rest after each set, tap one of the preset buttons or turn the Digital Crown. The Crown covers 10 to 300 seconds.',
        ],
      },
      {
        h2: 'Finish the workout',
        body: [
          'When the last set is logged, the screen reads Workout complete. Tap Finish. To stop earlier, tap End Workout and confirm End Workout in the dialog.',
          'The sets you logged on the watch are sent to the iPhone and added to your history there. If the iPhone is out of range, the watch keeps them and sends them later. They then appear in the Stats tab like any other logged sets.',
        ],
      },
    ],
    steps: [
      { name: 'Build the routine on iPhone', text: 'Add exercises and sets for today in Edit Routine, and open SetDeck on the iPhone once.' },
      { name: 'Open SetDeck on the watch', text: 'The first screen, Workout, shows today’s name and the number of exercises and sets.' },
      { name: 'Start the workout', text: 'Tap Start Workout.' },
      { name: 'Log the first set', text: 'Do the set, then tap Log Set. The rest timer starts.' },
      { name: 'Adjust if needed', text: 'Tap Adjust to change REPS or WEIGHT, then tap Log.' },
      { name: 'Use the rest timer', text: 'Tap +30s to add time or Skip to end the rest. Your wrist taps when the rest is over.' },
      { name: 'Finish', text: 'After the last set tap Finish, or tap End Workout and confirm to stop early.' },
    ],
    howTo: { name: 'How to run a workout from Apple Watch in SetDeck' },
    faq: [
      {
        q: 'Why does my watch say to open SetDeck on my iPhone?',
        a: 'The watch gets today’s routine from the iPhone. Open SetDeck on the iPhone once so it can send the routine, then use Refresh or Retry on the watch.',
      },
      {
        q: 'Do I need my iPhone with me during the workout?',
        a: 'Not once the routine has loaded. The watch logs sets on its own and sends them to the iPhone, and it keeps them until delivery if the iPhone is out of range.',
      },
      {
        q: 'How do I change the rest time?',
        a: 'Open the Rest Timer screen on the watch. Pick a preset or turn the Digital Crown. The default is 90 seconds, and the Crown covers 10 to 300 seconds.',
      },
    ],
    related: ['setdeck-build-weekly-routine', 'setdeck-log-workout-set-by-set'],
  },
];
