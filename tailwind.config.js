/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      width: {
        log: "646px",
        mission: "407px",
        itemImage: "29px",
      },
      height: {
        panel: "631px",
        itemImage: "29px",
        tabHeader: "200px",
        fullScreen: "100vh",
      },
      fontFamily: {
        primary: ["Nunito"],
      },
      colors: {
        transparent: "transparent",
        primary: "#00B0AD",
        lightgray: "#F8F8F8",
        gray: "#ECEEF2",
        graymiddle: "#475467",
        graystrong: "#344054",
        graystrongest: "#101828",
        darkgray: "#7E8FAA",
        darkestgray: "#EBF1FB",
        border: "#ECEEF2",
        bordergray: "#EAECF0",
        bordergraymiddle: "#D0D5DD",
        dark: "#121212",
        purple: "#828CC1",
        lightpurple: "#e6e8f3",
        darkpurple: "#6973AA",
        darkestpurple: "#668FC3",
        green: "#47A8AB",
        opacitygreen: "#ddeeee",
        greenweak: "#e2f4f3",
        lightgreen: "#7EAA9A",
        red: "#B00000",
        orange: "#FBE5E5",
        transgray: "#828CC133",
        transblack: "#7E8FAA4D",
        transgreen: "#47A8AB33",
        transpurple: "#668FC333",
        lightwhite: "#FBFCFF",
        lightdarkpurple: "#282828",
        marker: "#86B6B9",
        unverified: "#AA7E7E",
        success: "#067647",
        textDarkBlue: "#101828",
      },
      background: {
        gray: "#EBF1FB",
      },
    },
  },
  plugins: [],
};
