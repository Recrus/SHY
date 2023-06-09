/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'sm': '425px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1440px',
            '2xl': '2560px',
        },
        colors: {
            'primary': '#ff5733',
            'accent': '#ff9966',
            'neutral': '#f2f2f2',
            // todo delete
            'blue': '#1fb6ff',
            'purple': '#7e5bef',
            'pink': '#ff49db',
            'orange': '#ff7849',
            'green': '#13ce66',
            'yellow': '#ffc82c',
            'gray-dark': '#273444',
            'gray': '#8492a6',
            'gray-light': '#d3dce6',
        },
        fontFamily: {
            primary: ['Montserrat', 'sans-serif'],
            accent: ['Poppins', 'sans-serif'],
        },
        fontSize: {
            sm: '14px',
            base: '16px',
            lg: '20px',
            xl: '124px',
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    plugins: [],
}

