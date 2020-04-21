import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Library, RegisterBook, Wishlist } from "./features";
import { SearchBar, Navigation } from "./components";

function App() {
  return (
    <>
      <div className="header">
        <SearchBar />
      </div>
      <Navigation />
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/library/:id?" component={Library} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/register-book" component={RegisterBook} />
            <Redirect exact from="/" to="/library" />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
