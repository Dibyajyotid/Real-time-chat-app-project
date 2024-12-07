import daisyui from 'daisyui'



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    //"./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'orangy': 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "corporate", "fantasy","business", "winter"]
  },
}