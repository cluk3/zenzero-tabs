import React from "react";
import { theme } from "./theme";

import { ThemeProvider as SCThemeProvider } from "styled-components";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";

const muiTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
export const ThemeProvider = ({ children }) => {
  return (
    <SCThemeProvider theme={theme}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </SCThemeProvider>
  );
};
