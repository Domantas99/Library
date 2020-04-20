import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./core/history";
import "./index.sass";
import App from "./App";
import sagas from "./store/sagas";
import store, { sagaMiddleware } from "./store/store";
import * as serviceWorker from "./serviceWorker";

sagaMiddleware.run(sagas);

try {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}

serviceWorker.unregister();
