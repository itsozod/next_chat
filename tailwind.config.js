import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        color: "hsl(var(--text-color))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
    },
  },
  plugins: [
    heroui({
      // themes: {
      //   "purple-dark": {
      //     extend: "dark",
      //     colors: {
      //       background: "#0D001A",
      //       foreground: "#ffffff",
      //       primary: {
      //         50: "#3B096C",
      //         100: "#520F83",
      //         200: "#7318A2",
      //         300: "#9823C2",
      //         400: "#c031e2",
      //         500: "#DD62ED",
      //         600: "#F182F6",
      //         700: "#FCADF9",
      //         800: "#FDD5F9",
      //         900: "#FEECFE",
      //         DEFAULT: "#DD62ED",
      //         foreground: "#ffffff",
      //       },
      //       focus: "#F182F6",
      //     },
      //     textColor: {
      //       DEFAULT: "#ffffff",
      //     },
      //   },
      // },
    }),
  ],
};
