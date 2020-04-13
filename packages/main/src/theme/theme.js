import preset from "@rebass/preset";

const baseButton = {
  fontSize: 1,
  fontWeight: "bold",
  lineHeight: "21px",
};

export const theme = {
  ...preset,
  breakpoints: ["480px", "715px", "1024px"],
  fontSizes: [16, 18, 20, 22, 32],
  colors: {
    text: "#cccccc",
    primary: "#aaaaaa",
    background: "#333333",
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
    image: "2px 2px 4px rgba(34, 34, 34, 0.7)",
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
    bookName: {
      fontWeight: "bold",
      fontSize: 3,
      lineHeight: "26px",
      color: "text",
    },
    ownedBy: {
      fontWeight: 500,
      fontSize: 0,
      lineHeight: "text",
      color: "darkgray",
    },
    username: {
      fontWeight: "bold",
      fontSize: 0,
      lineHeight: "text",
      color: "text",
    },
    groupTitle: {
      fontSize: 4,
      fontWeight: 200,
      lineHeight: "37px",
      color: "primary",
      mb: 4,
    },
    detailLabel: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "text",
      color: "darkgray",
      textTransform: "capitalize",
    },
    detailValue: {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "text",
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
