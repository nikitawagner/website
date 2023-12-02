/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#646cff",
                secondary: "#8087ff",
                tertiary: "#639CFF",
                primarypastel: "#9095fc"
            },
            scale: {
                103: "1.03",
                102: "1.02",
                101: "1.01",
                99: "0.99",
                98: "0.98",
                97: "0.97"
            }
        }
    },

    plugins: []
};
