/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0F161E",
        secondary: "#8D9094",
        tertiary: "#E3E3E4",
        successbox: "#8EEBD7",
        successtext: "#3FC2A6",
        failurebox: "#FFA5A5",
        failuretext: "#C23F3F",
        highlight: "#5278F3",
      },
      fontFamily: {
        rethinkSans: ["RethinkSans", "sans-serif"],
        kablammo: ["Kablammo", "sans-serif"],
        publicBlack: ["PublicBlack", "sans-serif"],
        publicBold: ["PublicBold", "sans-serif"],
        publicExtraBold: ["PublicExtraBold", "sans-serif"],
        publicExtraLight: ["PublicExtraLight", "sans-serif"],
        publicLight: ["PublicLight", "sans-serif"],
        publicMedium: ["PublicMedium", "sans-serif"],
        publicRegular: ["PublicRegular", "sans-serif"],
        publicSemiBold: ["PublicSemiBold", "sans-serif"],
        publicThin: ["PublicThin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
