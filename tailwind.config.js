/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0091FF',
          container: '#54a3ff',
          dim: '#005192'
        },
        secondary: {
          DEFAULT: '#FFC107',
          container: '#ffca4d',
          dim: '#664b00'
        },
        tertiary: {
          DEFAULT: '#FF5722',
          container: '#ff9475',
          dim: '#962700'
        },
        surface: {
          DEFAULT: '#f6f6f9',
          container: '#e7e8eb',
          highest: '#dbdde0',
          lowest: '#ffffff',
          variant: '#dbdde0'
        },
        on: {
          primary: '#eef3ff',
          surface: '#2d2f31'
        },
        ink: '#1A1C1E'
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '3rem',
        'full': '9999px',
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px rgba(0,0,0,0.1)',
        'comic-hover': '2px 2px 0px 0px rgba(0,0,0,0.1)',
        'pop': '4px 4px 0px 0px #54a3ff',
      }
    },
  },
  plugins: [],
}
