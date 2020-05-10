/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getCategories, selectCategory } from "../store/categories/actions";

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const activeCategory = useSelector((state) => state.categories.selected);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
        onClick={() => dispatch(selectCategory("all"))}
      >
        <li
          className={`navigation__item-secondary ${
            activeCategory === "all" && " active"
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
                activeCategory === category && " active"
              }`}
              onClick={() => dispatch(selectCategory(category))}
            >
              {category}
            </li>
          </Link>
        ))}
    </ul>
  );
}
