/** @type {import('tailwindcss').Config} */

// Colours are CSS variables (space-separated RGB triples, see src/index.css)
// so the same class works in the dark default and inside `.theme-light`.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic: use these in components.
        page: token('page'), // the page background
        well: token('well'), // a recessed band, one step darker than the page
        deep: token('deep'), // the deepest background (footer, hero sky)
        panel: token('panel'), // cards and raised surfaces
        ink: token('ink'), // primary text
        muted: token('muted'), // secondary text
        line: token('line'), // hairlines; use with an alpha, e.g. border-line/10
        signal: token('signal'), // the one accent
        link: token('link'), // text links (Signal on dark, Ember on light)
        accent: token('link'), // accent text such as section labels and numerals (Signal on dark, Ember on light)
        // Raw palette, for the rare case a semantic token does not fit.
        night: token('night'),
        regolith: token('regolith'),
        dust: token('dust'),
        basalt: token('basalt'),
        bone: token('bone'),
        ember: token('ember'),
      },
      fontFamily: {
        sans: [
          'Manrope', 'ui-sans-serif', '-apple-system', 'BlinkMacSystemFont',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
        ],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '800' }],
        'headline': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'title': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};
