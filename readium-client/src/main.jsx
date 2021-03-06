import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import store from "./app/store";
import App from "./app/App";
import theme from "./common/GlobalTheme";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { AuthProvider } from "./common/hooks/useAuth";
import ScrollToTop from "./common/components/ScrollToTop";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <ScrollToTop />
              <App />
            </QueryClientProvider>
          </AuthProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
