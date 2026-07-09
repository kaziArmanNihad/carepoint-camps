//  @type {import('tailwindcss').Config}

import daisyui from "daisyui";
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
      colors: {
        CPC: {
          white: "#edf6f9",
          sky: "#83c5be",
          ocean: "#006d77",
        },
      },
    },
  },
  plugins: [daisyui, flowbite],
  daisyui: {
    themes: [],
  },
};
