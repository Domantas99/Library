import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { Test, Library, RegisterBook } from './features';


function App() {
  return (<>
    <div className="header">
      <SearchBar/>
    </div>
    <div className="sidebar"></div>
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route path={'/test'} component={Test} />
          <Route path={'/library/:id?'} component={Library} />
          <Route path={'/register-book'} component={RegisterBook} />
          <Redirect exact from={'/'} to={'/test'} />
        </Switch>
      </div>
    </div>
    </>);
}

export default App;
