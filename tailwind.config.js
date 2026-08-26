import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', ...defaultTheme.fontFamily.sans],
                cursive: ['Caveat', 'cursive'],
            },
            colors: {
                brand: {
                    DEFAULT: '#01c38e',
                    dark: '#132d46',
                    darker: '#1a1e29',
                },
            },
            keyframes: {
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideRight: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'slide-up-delayed': 'slideUp 0.8s ease-out 0.2s forwards',
                'slide-up-delayed-2': 'slideUp 0.8s ease-out 0.4s forwards',
                'slide-right': 'slideRight 0.8s ease-out forwards',
            }
        },
    },

    plugins: [forms],
};
