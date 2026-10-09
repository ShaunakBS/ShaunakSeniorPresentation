/** @type {import('tailwindcss').Config} */
// Colors come from CSS variables in src/styles/theme.css so the whole palette is changed in one place.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('bg'),            // primary background
        'accent-light': v('bg2'),  // secondary background
        surface: v('card'),        // card background
        accent: v('red'),          // primary red
        'accent-dark': v('red-dark'),
        'accent-hover': v('red-hover'),
        ink: v('text'),            // primary text (white)
        muted: v('text2'),         // secondary text
        line: v('border'),         // borders and dividers
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        serif: ['"Newsreader Variable"', 'Newsreader', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: { card: '0 1px 2px rgba(0,0,0,0.5), 0 10px 28px -14px rgba(0,0,0,0.8)' },
    },
  },
  plugins: [],
};
