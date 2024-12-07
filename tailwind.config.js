/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {}
		},
		fontFamily: {
			sans: ['Raleway', 'sans-serif']
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// require('daisyui')
	], // not necessary for the current version for typography only fro daisy UI
}

