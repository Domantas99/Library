import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Test, Library, RegisterBook } from './features';

function App() {
  return (
    <Switch>
      <Route path={'/test'} component={Test} />
      <Route path={'/library/:id?'} component={Library} />
      <Route path={'/register-book'} component={RegisterBook} />
      <Redirect exact from={'/'} to={'/test'} />
    </Switch>
  );
}

export default App;
