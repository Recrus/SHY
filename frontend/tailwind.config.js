// eslint-disable-next-line no-undef
const withMT = require("./node_modules/@material-tailwind/react/utils/withMT.js");
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        screens: {
            xs: "320px",
            sm: "425px",
            md: "768px",
            lg: "1024px",
            xl: "1440px",
            "2xl": "2560px",
        },
        container: {
            center: true,
        },
        colors: {
            primary: "#ff5733",
            accent: "#ff9966",
            neutral: "#f2f2f2",
            "dark-primary": "#212121",
            "dark-accent": "#303030",
            "dark-neutral": "#424242",
            "dark-additional": "#212121",
            //additional colors
            blue: "#1fb6ff",
            pink: "#ff49db",
            orange: "#ff7849",
            green: "#13ce66",
            "dark-gold": "#998723",
            "gray-dark": "#273444",
            gray: "#8492a6",
            "gray-light": "#d3dce6",
            "dark-blue": "#0a192f",
            "dark-purple": "#6a1b9a",
            purple: "#32074D",
        },
        fontFamily: {
            primary: ["Montserrat", "sans-serif"],
            accent: ["Poppins", "sans-serif"],
        },
        fontSize: {
            sm: "14px",
            base: "16px",
            lg: "20px",
            xl: "24px",
            "2xl": "30px",
        },
        extend: {
            spacing: {
                128: "32rem",
                144: "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
    },
    plugins: [],
});
