/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2230',
          light: '#0F2D3F',
          dark: '#050F16',
        },
        secondary: '#1A3A4A',
        accent: {
          DEFAULT: '#F9B513',
          dark: '#E0A410',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        accent: '0 20px 40px -10px rgba(249, 181, 19, 0.3)',
      },
    },
  },
  plugins: [],
};
