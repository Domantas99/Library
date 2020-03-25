import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import './index.sass';
import App from './App';
import sagas from './store/sagas';
import store, { sagaMiddleware } from './store/store';

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
