/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'edu-blue': '#1e40af',
        'edu-light-blue': '#3b82f6',
        'edu-navy': '#1e3a8a',
        'edu-gray': '#6b7280',
        'edu-light-gray': '#f3f4f6',
        'vision-high-contrast': '#000000',
        'vision-bg': '#ffffff',
        'vision-yellow': '#ffff00',
        'vision-blue': '#0000ff',
      },
      fontFamily: {
        'accessible': ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
