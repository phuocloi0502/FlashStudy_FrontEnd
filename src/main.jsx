import { RouterProvider } from "react-router-dom";
import Router from "./routers/Router.jsx";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import App from "./App.jsx";
import "@fontsource/inter"; // Defaults to weight 400.
import store from "./redux/store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
