/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans : ['Raleway', 'sans-serif'],
      // heading is remaining
    }
  },
  plugins: [], // not necessary for the current version for typography only fro daisy UI
}

