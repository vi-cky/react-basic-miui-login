import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import reduxStore from "./config/configureStore";
import { Provider } from "react-redux";
import Main from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = createRoot(document.getElementById("root"));
const HISTORY = createBrowserHistory();
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={reduxStore}>
      <Router history={HISTORY} forceRefresh={false}>
        <Main />
      </Router>
    </Provider>
  </QueryClientProvider>
);

if (module.hot) {
  module.hot.accept("./Routes", () => {
    const NextApp = require("./Routes").default;
    root.render(
      <Provider store={reduxStore}>
        <Router history={HISTORY} forceRefresh={false}>
          <NextApp />
        </Router>
      </Provider>
    );
  });
}
