module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'logo': ['Raleway']
      },
      colors: {
        'logo': '#FFA91C',
        'amber-800': '#92400E',
        'lime-800': '#3F6212',
        'emerald-800': '#065F46',
        'cyan-800': '#155E75',
        'violet-800': '#5B21B6',
        'fuchsia-800': '#86198F',
        'rose-800': '#9F1239'
      },
      backgroundImage: {
        'head-contact': "url('/photos/sailboat.jpg')",
        'head-list': "url('/photos/beach.jpg')",
        'head-work': "url('/photos/snowset.jpg')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
