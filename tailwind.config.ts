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
        background: "#060611",
        foreground: "#f0f4ff",
        surface: "#0d0f1e",
        surfaceAlt: "#13162b",
        surfaceMid: "#1a1f38",
        primary: "#6366f1",       // indigo-500
        primaryGlow: "#818cf8",   // indigo-400
        primaryDark: "#4f46e5",   // indigo-600
        accent: "#a855f7",        // purple-500
        accentGlow: "#c084fc",    // purple-400
        teal: "#14b8a6",          // teal-500
        border: "#1f2645",
        borderLight: "#2e3456",
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.07) 1px, transparent 1px)",
        'hero-glow': "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.25), transparent)",
        'card-glow': "radial-gradient(ellipse at top right, rgba(168,85,247,0.08), transparent 70%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
