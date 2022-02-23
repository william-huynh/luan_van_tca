import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { StateProvider } from "./Context/StateContext";
import "./App.scss";

ReactDOM.render(
  <StateProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </StateProvider>,
  document.getElementById("root")
);
