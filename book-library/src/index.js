import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import './index.sass';
import App from './App';
import sagas from './store/sagas';
import store, { sagaMiddleware } from './store/store';
import * as serviceWorker from './serviceWorker';

sagaMiddleware.run(sagas);

try {

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
} catch (e) {
  console.log(e);
}

serviceWorker.unregister();
