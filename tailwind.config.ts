import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#24494f",
          50: "#eef5f5",
          100: "#d7e6e7",
          200: "#b0cdd0",
          300: "#89b4b8",
          400: "#5f959c",
          500: "#3f767e",
          600: "#2f5e66",
          700: "#24494f",
          800: "#1c393e",
          900: "#142a2e",
          950: "#0b1a1c",
        },
        accent: {
          DEFAULT: "#4a99a2",
          50: "#eef7f8",
          100: "#d7ecee",
          200: "#b0d9dd",
          300: "#89c6cc",
          400: "#62b3bb",
          500: "#4a99a2",
          600: "#3c7d85",
          700: "#2f6169",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f6fafb",
          tint: "#e3edf0",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
