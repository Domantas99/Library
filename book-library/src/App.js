import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Test, Library } from './features';

function App() {
  return (
    <Switch>
      <Route path={'/test'} component={Test} />
      <Route path={'/library'} component={Library} />
      <Redirect exact from={'/'} to={'/test'} />
    </Switch>
  );
}

export default App;
