/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        BeVietnam: ['BeVietnam', 'sans-serif', 'system-ui'],
      },
      colors: {
        appYellow: '#F8C569',
        appGreen: '#5EA25F',
        appRed: '#D5715B',
        appGray: 'rgba(0, 0, 0, 0.3)',
        appWhite: '#ffffff',
        appBlack: '#261C12',
      },
    },
  },
  plugins: [],
};
