/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nayeshdaggula/tailify/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Default 'font-sans' class
        custom: ['Open Sans', 'sans-serif'], // Custom class if needed
        Montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'xxxs':'280px', // Extra small phones
        'xxs': '321px', // Extra small phones
        'xxm': '376px', // Small phones
        'xs': '426px', // Small phones
        'sm': '641px', // Phones
        'md': '769px', // Tablets
        'lg': '1025px', // Small desktops or landscape tablets
        'xl': '1281px', // Large desktops
        '2xl': '1537px', // Ultra-wide desktops
        '3xl': '1921px', // Very large screens (gaming monitors, TVs)
        '4xl': '2561px', // 4k and above
      }
 
    },
    letterSpacing: {
      'extra-wide': '0.3em', // Example: Wider than `tracking-widest`
      'small-wide': '0.1em',
    },
  },
  plugins: [],
};
 
