/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn_dark': '#1F2937',
        'btn_gold': '#BB8506',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

