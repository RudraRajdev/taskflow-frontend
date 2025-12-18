import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    ...heroui.content,
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
