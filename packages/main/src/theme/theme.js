import preset from "@rebass/preset";

export const theme = {
  ...preset,
  breakpoints: ["480px", "715px", "1024px"],
  fontSizes: [16, 18, 20, 22, 32, 48],
  colors: {
    text: "#28272C",
    textContrast: "white",
    primary: "white",
    secondary: "hsl(137, 76%, 64%)",
    background: "white",
    contrast: "#B9C4C9",
    headerBg: "hsla(6, 7%, 6%, 0.78)",
  }, //   0  1  2  3   4  5    6   7
  space: [0, 4, 8, 16, 24, 36, 48, 64, 128, 256],
  fonts: {
    body: "roboto, sans-serif",
    heading: "Lato",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
    text: "19px",
  },
  shadows: {
    text: "2px 2px 1px #000000",
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)",
    card: "1px 1px 2px 1px black;",
    cardHover: "1px 1px 2px black",
    neonBlue: "2px 2px 4px hsl(230,93%,49%)",
    neonBlueHover: "3px 3px 6px 2px hsl(230,93%,49%)",
  },
  variants: {
    ...preset.variants,
    link: {
      color: "gray",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "23px",
      textDecorationLine: "underline",
    },
  },
  text: {
    ...preset.text,
    listTitle: {
      color: "text",
      fontWeight: "normal",
      fontSize: [1],
      my: 1,
      marginLeft: 1,
    },
    appName: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 4,
      textAlign: "center",
      letterSpacing: "0.19em",
      textShadow: "text",
      color: "textContrast",
    },
  },
  buttons: {
    primary: {
      fontSize: 1,
      fontWeight: "bold",
      lineHeight: "21px",
      color: "gray",
      bg: "background",
    },
    active: {
      variant: "buttons.primary",
      bg: "#F15454",
      boxShadow: "0px 2px 3px rgba(34, 34, 34, 0.6)",
      borderRadius: "18px",
    },
  },
};
