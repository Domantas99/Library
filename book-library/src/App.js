import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { Test, Library, Wishlist, RegisterBook } from './features';


function App() {
  return (<>
    <div className="header">
      <SearchBar/>
    </div>
    <div className="sidebar">
      <div className="sidebar__header">
      </div>
      <div className="sidebar__content">
        <ul className="navigation">
          <li>
            <a id="library" className="navigation__item" href="/library">Library</a>
          </li>
        </ul>
        <ul className="navigation">
          <li>
            <a id="wishlist" className="navigation__item" href="/wishlist">Wishlist</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route path={'/test'} component={Test} />
          <Route path={'/library/:id?'} component={Library} />
          <Route path={'/wishlist'} component={Wishlist} />
          <Route path={'/register-book'} component={RegisterBook} />
          <Redirect exact from={'/'} to={'/test'} />
        </Switch>
      </div>
    </div>
    </>);
}

export default App;
