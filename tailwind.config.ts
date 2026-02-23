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
        background: "#020617", // slate-950
        foreground: "#f8fafc", // slate-50
        surface: "#0f172a", // slate-900
        surfaceAlt: "#1e293b", // slate-800
        primary: "#0ea5e9", // sky-500
        primaryGlow: "#38bdf8", // sky-400
        accent: "#10b981", // emerald-500
        border: "#334155", // slate-700
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
