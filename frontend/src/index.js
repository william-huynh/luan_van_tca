import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { StateProvider } from "./Context/StateContext";
import { ConfirmProvider } from "material-ui-confirm";
import "./App.scss";

ReactDOM.render(
  <ConfirmProvider>
    <StateProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </StateProvider>
  </ConfirmProvider>,

  document.getElementById("root")
);
