import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3a8a",
          50: "#eef2fb",
          100: "#d6e0f5",
          200: "#adc1eb",
          300: "#84a2e0",
          400: "#5b83d6",
          500: "#3864cb",
          600: "#2b4da3",
          700: "#1e3a8a",
          800: "#172c68",
          900: "#101e46",
        },
        accent: {
          DEFAULT: "#4ade80",
          50: "#f0fdf5",
          100: "#dcfce9",
          200: "#b9f8d3",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
