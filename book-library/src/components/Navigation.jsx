import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectCategory } from '../store/library/actions';
import { logOut } from '../store/user/actions';
import Button, { BUTTON_APPEARANCE } from './Button';
import Categories from './Categories';
import UserInfo from './UserInfo';

const Navigation = () => {
  const dispatch = useDispatch();
  function onLogOutClick() {
    dispatch(logOut());
  }

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
              to="/library?sort=recent"
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
              to="/wishlist?sort=recent"
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
              to="/reservations?status=Borrowed&status=Waiting"
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
      <div className="sidebar__footer">
        <Link to="/user-settings">
          <Button buttonAppearance={BUTTON_APPEARANCE.CLEAR | BUTTON_APPEARANCE.WIDE | BUTTON_APPEARANCE.MINI | BUTTON_APPEARANCE.ROUND}>
            Manage my account
          </Button>
        </Link>
        <Button buttonAppearance={BUTTON_APPEARANCE.HEAVY | BUTTON_APPEARANCE.LINK} onClick={() => onLogOutClick()}>
          <i className="btn__icon btn__icon--logout" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
