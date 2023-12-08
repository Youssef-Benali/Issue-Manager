import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        red: "#e5484d",
        "red-hover": "#dc3e42",
        "cancel-softgray-button": "#30004010",
        "cancel-text-button": "#0400119c",
        "cancel-button-hover": "#20003820",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
