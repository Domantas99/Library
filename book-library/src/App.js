import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Test, Library } from './features';
import { RegisterBook } from './features';

function App() {
  return (
    <Switch>
      <Route path={'/test'} component={Test} />
      <Route path={'/library'} component={Library} />
      <Route path={'/register-book'} component={RegisterBook} />
      <Redirect exact from={'/'} to={'/register-book'} />
    </Switch>
  );
}

export default App;
