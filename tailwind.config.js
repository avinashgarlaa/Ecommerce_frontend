/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#2874f0",
        brandBlueDark: "#1c5cc6",
        brandYellow: "#ffe500",
        brandGray: "#f1f3f6",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
}

