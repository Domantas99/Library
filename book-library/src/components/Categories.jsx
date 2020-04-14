import React, { useEffect} from 'react';
import _ from 'lodash';
import { getCategories } from '../store/categories/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);
  
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <ul className="navigation__item-content">
      <NavLink to="/library" key="all" activeClassName="active">
        <li className="navigation__item-secondary">All books</li>
      </NavLink>
      {!_.isEmpty(categories) && categories.map(category => (
        <NavLink to={`/library/${category}`} key={encodeURIComponent(category)} activeClassName="active">
          <li className="navigation__item-secondary">{category}</li>
        </NavLink>
      ))}
    </ul>
  );
}
