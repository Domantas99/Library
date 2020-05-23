import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Categories from './Categories';
import { selectCategory } from '../store/library/actions';
import UserInfo from './UserInfo';

export default function Navigation() {
  const dispatch = useDispatch();
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img className="sidebar__logo" alt="" />
      </div>
      <div className="sidebar__content">
        <UserInfo />
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
              onClick={() => dispatch(selectCategory(null))}
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
        <div className="navigation__item">
          <NavLink to="user-settings">
            <button>Manage my account</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
