/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#FCA311",
        "gold-hover": "#e69400",
        navy: "#14213D",
        "navy-dark": "#0d1528",
        black: "#000000",
        white: "#FFFFFF",
        grayLight: "#E5E5E5",
        surface: "#F5F5F5",
        body: "#333333",
        muted: "#666666",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};
