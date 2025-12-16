
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                verdi: {
                    gold: 'var(--color-verdi-gold)',
                    dark: 'var(--color-verdi-dark)',
                    cream: 'var(--color-verdi-cream)',
                    copper: 'var(--color-verdi-copper)',
                    gray: 'var(--color-verdi-gray)',
                }
            },
            fontFamily: {
                heading: ['var(--font-heading)', 'sans-serif'],
                body: ['var(--font-body)', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
