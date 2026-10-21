import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#14243b",
        ink: "#172b4d",
        brand: "#2878f0",
      },
      boxShadow: {
        soft: "0 8px 28px rgba(24, 53, 92, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
