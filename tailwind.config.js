/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable data-* variant for pointer-events and opacity
  variants: {
    extend: {
      pointerEvents: ['data-disabled'],
      opacity: ['data-disabled'],
    },
  },
};
