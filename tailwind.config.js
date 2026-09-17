/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#B31519',
          deep: '#7C0E11',
          bright: '#D8242A',
        },
        ink: {
          DEFAULT: '#160F0F',
          2: '#221818',
        },
        paper: {
          DEFAULT: '#F2EFE9',
          line: '#D8D2C7',
        },
        'on-red': '#F3D7D8',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        condensed: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      },
    },
  },
  plugins: [],
};
