import React, { useEffect} from 'react';
import { getCategories } from '../store/categories/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);
  
  useEffect(() => {
    dispatch(getCategories());
  }, [])

  return (
        // <ul class="navigation__item-content"> // uncomment when there will be functionality 
        <ul> 
         <Link to="/library">
         <li className="navigation__item-secondary">All books</li>
          </Link> 
        {
          categories.map(category => (
            <Link to={`/library/${category}`}>
              <li className="navigation__item-secondary">{category}</li>
            </Link>
          ))
        }
       </ul> 
  );
}
