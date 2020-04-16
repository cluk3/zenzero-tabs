import preset from "@rebass/preset";

const baseButton = {
  fontSize: 1,
  fontWeight: "bold",
  lineHeight: "21px",
};

export const theme = {
  ...preset,
  breakpoints: ["480px", "715px", "1024px"],
  fontSizes: [16, 18, 20, 22, 32, 48],
  colors: {
    text: "hsl(230, 93%, 97%)",
    primary: "hsl(230, 93%, 63%)",
    secondary: "hsl(137, 76%, 64%)",
    background: "#FDB64C",
    gray: "#777777",
    darkgray: "#999999",
    headerBg: "#535353",
    skeleton: "#535353",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: "roboto, sans-serif",
    heading: "inherit",
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
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)",
    card: "2px 2px 4px rgba(34, 34, 34, 0.7)",
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
      color: "primary",
      fontWeight: "normal",
      fontSize: [1],
      my: 1,
      marginLeft: 1,
    },
  },
  buttons: {
    primary: {
      ...baseButton,
      color: "gray",
      bg: "background",
    },
    active: {
      ...baseButton,
      bg: "#F15454",
      boxShadow: "0px 2px 3px rgba(34, 34, 34, 0.6)",
      borderRadius: "18px",
    },
  },
};
