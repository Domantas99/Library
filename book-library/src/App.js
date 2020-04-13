import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Test, Library, RegisterBook, Wishlist } from './features';
import { SearchBar, Navigation } from './components';

function App() {
  return (<>
    <div className="header">
      <SearchBar/>
    </div>
    <div className="sidebar">
      <Navigation></Navigation>
    </div>
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route path={'/test'} component={Test} />
          <Route path={'/library/:id?'} component={Library} />
          <Route path={'/wishlist'} component={Wishlist} />
          <Route path={'/register-book'} component={RegisterBook} />
          <Redirect exact from={'/'} to={'/library'} />
        </Switch>
      </div>
    </div>
    </>);
}

export default App;
