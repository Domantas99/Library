/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getCategories, selectCategory } from '../store/library/actions';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.library.categories);
  const activeCategory = useSelector((state) => state.library.activeCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <ul className="navigation__item-content">
      <NavLink to="/library/register-book" key="register-new">
        <li className="navigation__item-secondary">+ Register new book</li>
      </NavLink>
      <li>
        <hr />
      </li>
      <NavLink
        to="/library"
        key="all"
        onClick={() => dispatch(selectCategory(null))}
      >
        <li
          className={`navigation__item-secondary ${
            activeCategory === null && ' active'
          }`}
        >
          All books
        </li>
      </NavLink>
      {!_.isEmpty(categories) &&
        categories.map((category) => (
          <Link
            to={`/library/?category=${category}`}
            key={encodeURIComponent(category)}
          >
            <li
              className={`navigation__item-secondary ${
                activeCategory === category && ' active'
              }`}
              onClick={() => dispatch(selectCategory(category))}
            >
              {category}
            </li>
          </Link>
        ))}
    </ul>
  );
};

export default Categories;
