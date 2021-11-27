import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./app/store";
import App from "./app/App";
import theme from "./common/GlobalTheme";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { AuthProvider } from "./common/hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
