import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f8f5ff",
        panel: "rgba(255,255,255,0.72)",
        edge: "rgba(127, 97, 255, 0.14)",
        accent: "#7b57ff",
        ink: "#180f33",
        muted: "#695b96"
      },
      boxShadow: {
        soft: "0 24px 64px rgba(64, 34, 123, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
