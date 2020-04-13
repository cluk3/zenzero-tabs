import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { setupStore } from "./store";
import { ThemeProvider } from "theme/ThemeProvider";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={setupStore()}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
