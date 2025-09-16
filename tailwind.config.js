/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary': '#0A2C3C',
        'secondary': '#DDF2FF',
        'accent': '#cce4ff',
        'button-primary': '#215771',
        'button-secondary': '#0A2C3C',
        'border-color': '#215771',
        'form-bg': '#f8fafc',
        'text-primary': '#ffffff',
        'text-secondary': '#31383F',
      }
    },
  },
  plugins: [],
}