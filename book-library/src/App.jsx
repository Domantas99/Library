import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Library, RegisterBook, Wishlist, Reservations, EditBook } from "./features";
import { SearchBar, Navigation } from "./components";
import Dashboard from "./features/dashboard/dashboard";

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
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/library/:id?" component={Library} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/register-book" component={RegisterBook} />
            <Route path="/reservations" component={Reservations} />
            <Route path="/edit-book/:id?" component={EditBook} />
            <Redirect exact from="/" to="/library" />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
