import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
        card: "hsl(var(--card))",
      },
      boxShadow: {
        glow: "0 0 60px rgba(45, 212, 191, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
