import React from "react";
import { theme } from "./theme";

import { ThemeProvider as SCThemeProvider } from "styled-components";

export const ThemeProvider = ({ children }) => {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
};
