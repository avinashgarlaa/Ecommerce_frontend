/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Sora", "Manrope", "system-ui", "sans-serif"],
      },
      colors: {
        brandBlue: "#0f4c81",
        brandBlueDark: "#083a63",
        brandYellow: "#f7b733",
        brandGray: "#f4f7fb",
        ink: "#0f172a",
        mist: "#e5eef8",
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.08)",
        soft: "0 6px 18px rgba(15, 23, 42, 0.08)",
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floatIn: "floatIn 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
