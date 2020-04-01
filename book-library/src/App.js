import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Test, Library } from './features';
import SearchBar from './components/SearchBar';

function App() {
  return (<>
    <SearchBar></SearchBar>
    <Switch>
      <Route path={'/test'} component={Test} />
      <Route path={'/library'} component={Library} />
      <Redirect exact from={'/'} to={'/test'} />
    </Switch>
    </>);
}

export default App;
