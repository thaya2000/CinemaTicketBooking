/** @type {import('tailwindcss').Config} */

// const { nextui } = require("@nextui-org/react");
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // prefix: "tw-",
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
  // corePlugins: {
  //   preflight: false,
  // },
};
