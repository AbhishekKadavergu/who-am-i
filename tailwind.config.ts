import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--brand-yellow)", // neon primary
          glow: "var(--brand-yellow-glow)", // glow used for hover/shimmer
          gold: "var(--brand-gold)", // warm accent
        },
        brand: {
          // explicit named tokens
          yellow: "var(--brand-yellow)",
          yellowGlow: "var(--brand-yellow-glow)",
          gold: "var(--brand-gold)",
          black: "var(--brand-black)",
          dark: "var(--brand-dark)",
          white: "var(--brand-white)",
          soft: "var(--brand-soft-white)",
        },
        "text-primary": "var(--brand-text)", // primary text variable
      },
      boxShadow: {
        "soft-lg": "0 12px 36px rgba(2,6,23,0.08)",
        "glow-yellow": "0 6px 24px rgba(230,255,0,0.12)",
      },
    },
  },
  plugins: [lineClamp],
};

export default config;
