import React, { useEffect} from 'react';
import { getCategories } from '../store/categories/actions';
import { useDispatch, useSelector } from 'react-redux';


export default function Categories(props) {
  debugger;
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);
  debugger;
  useEffect(() => {
    dispatch(getCategories());
  }, [])

  //function getCategories

  return (
    <>
        <h1>
      sada
      <ul>
        {
          categories.map(category => (
            <li>{category}</li>
          ))
        }
       
      </ul>
        </h1>
    </>
  );
}
