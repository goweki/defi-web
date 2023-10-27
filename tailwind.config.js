/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const customColours = {
  primary: {
    DEFAULT: "#e5851e",
    light: "#ff9829",
    dark: "#a55500",
  },
  gray: {
    w1: "#f8fafc",
    w2: "#f1f5f9",
    w3: "#e2e8f0",
    b3: "#1e293b",
    b2: "#0f172a",
    b1: "#020617",
  },
};

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: customColours.primary,
      gray: customColours.gray,
      backg: {
        DEFAULT: customColours.gray.w3,
        surface: customColours.gray.w2,
        raised: customColours.gray.w1,
        dark: {
          DEFAULT: customColours.gray.b1,
          surface: customColours.gray.b2,
          raised: customColours.gray.b3,
        },
      },
      font: {
        DEFAULT: "#334155",
        focus: "#0f172a",
        inactive: "#64748b",
        dark: {
          DEFAULT: "#94a3b8",
          focus: "#e2e8f0",
          inactive: "#475569",
        },
      },
    },
    keyframes: {
      pegIt: {
        "0%": { transform: "r,otate(0deg)" },
        "16%": { transform: "rotate(75deg)" },
        "25%": { transform: "rotate(55deg)" },
        "30%": { transform: "rotate(90deg)" },
        "36%": { transform: "rotate(170deg)" },
        "42%": { transform: "rotate(150deg)" },
        "50%": { transform: "rotate(227deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    extend: {
      animation: {
        "spinner-1": "spin 3s linear infinite",
        "spinner-2": "spin 6s linear infinite",
        "meter-needle": "pegIt 3s ease-in-out infinite",
      },
      backgroundImage: {
        gradientCard: `linear-gradient(to right bottom, ${customColours.gray.w1},${customColours.primary.light})`,
        gradientCardDark: `linear-gradient(to right bottom, ${customColours.gray.b3},${customColours.gray.b2})`,
        gradientBtn: `linear-gradient(to right bottom, ${customColours.primary.light},${customColours.primary.DEFAULT})`,
        gradientBtnHover: `linear-gradient(to left top, ${customColours.primary.light},${customColours.primary.DEFAULT})`,
      },
    },
  },
  plugins: [],
};
