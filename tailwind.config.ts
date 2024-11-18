import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        main: "#FFDC58",
        mainAccent: "#ffc800", // not needed for shadcn components
        overlay: "rgba(0,0,0,0.8)", // background color overlay for alert dialogs, modals, etc.

        // light mode
        bg: "#e3dff2",
        text: "#000",
        border: "#000",

        // dark mode
        darkBg: "#374151",
        darkText: "#eeefe9",
        darkBorder: "#000",
        secondaryBlack: "#212121", // opposite of plain white, not used pitch black because borders and box-shadows are that color
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        light: "4px 6px 0px 0px #000",
        dark: "4px 6px 0px 0px #000",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "6px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-6px",
      },
      fontWeight: {
        base: "600",
        heading: "800",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
