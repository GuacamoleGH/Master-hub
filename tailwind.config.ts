import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cine: {
          950: "#08090D",
          900: "#0F1117",
          850: "#141720",
          800: "#1A1E2B",
          700: "#272C3E",
          600: "#3B425C",
          500: "#5D678C",
          400: "#8B95BD",
          300: "#BAC2DF",
          200: "#E2E6F3",
          100: "#F4F6FB",
        },
        gold: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        ball: {
          low: "#EF4444",
          mid: "#F59E0B",
          high: "#10B981",
          exact: "#8B5CF6",
        },
      },
      backgroundImage: {
        "cine-radial":
          "radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.08) 0%, rgba(8, 9, 13, 0) 70%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(26, 30, 43, 0.6) 0%, rgba(15, 17, 23, 0.8) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "ball-glow": "0 0 20px -3px rgba(16, 185, 129, 0.35)",
        poster: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
export default config;
