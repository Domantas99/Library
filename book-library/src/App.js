import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { Test, Library, RegisterBook, EditBook } from './features';


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
            <Route exact path={'/edit-book/:id?'} component={EditBook} />
            <Redirect exact from={'/'} to={'/test'} />
        </Switch>
      </div>
    </div>
    </>);
}

export default App;
