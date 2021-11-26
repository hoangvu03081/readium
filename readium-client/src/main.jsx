import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./app/App";
import GlobalStyles from "./common/GlobalStyles";
import theme from "./common/GlobalTheme";
import "bootstrap/dist/css/bootstrap-grid.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
