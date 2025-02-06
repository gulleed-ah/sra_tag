/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade": "fade 3s ease-in-out infinite",
      },
      keyframes: {
        fade: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}

