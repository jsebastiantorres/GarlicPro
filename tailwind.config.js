/** @type { import('tailwindcss').Config } */
module.exports = {
    content: [
        "./index.html",
        "./login/**/*.{html,js}",
        "./src/**/*.{html,js}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sansita: ['Sansita', 'sans-serif'],
            }
        },
    },
    plugins: [],
};