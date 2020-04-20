import React from "react";
import { NavLink } from "react-router-dom";
import Categories from "./Categories";

export default function Navigation() {
  return (
    <div>
      <div>
        <h2>Hello, Nathan!</h2>
        <h3>nathan@gmail.com</h3>
      </div>
      <ul className="navigation">
        <li>
          <NavLink
            to="/dashboard"
            className="navigation__item"
            activeClassName="active"
          >
            <div className="navigation__item-header">
              <i className="navigation__item-icon navigation__item-icon--dashboard" />
              Dashboard
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/library"
            className="navigation__item"
            activeClassName="active"
          >
            <div className="navigation__item-header">
              <i className="navigation__item-icon navigation__item-icon--library" />
              Library
            </div>
          </NavLink>
          <Categories />
        </li>

        <li>
          <NavLink
            to="/wishlist"
            className="navigation__item"
            activeClassName="active"
          >
            <div className="navigation__item-header">
              <i className="navigation__item-icon navigation__item-icon--wishlist" />
              Wishlist
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reservations"
            className="navigation__item"
            activeClassName="active"
          >
            <div className="navigation__item-header">
              <i className="navigation__item-icon navigation__item-icon--history" />
              My reservations
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
