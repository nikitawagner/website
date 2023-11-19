/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#646cff",
				secondary: "#8087ff",
				tertiary: "#639CFF",
			},
		},
	},

	plugins: [],
};
