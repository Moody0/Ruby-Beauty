/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ee2b6c',
        background: {
          light: '#ffffff',
          dark: '#221016',
        },
        surface: {
          light: '#ffffff',
          dark: '#2d161e',
        },
        text: {
          main: {
            light: '#181113',
            dark: '#fce7ef',
          },
          muted: {
            light: '#89616f',
            dark: '#dcbcc7',
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: 'class',
}