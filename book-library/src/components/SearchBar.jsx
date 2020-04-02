import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedBooks } from '../store/search-bar/actions';
import SearchBarResultBlock from './SearchBarResultBlock';

export default function SearchBar() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.searchbar.data);
  
  function  search(value) {
    dispatch(getSearchedBooks(value));
  }

  return (
    <div className="searchbar"> 
        <input className="searchbar-input" onChange={(e) => search(e.target.value)} placeholder="Search books"></input>
        <div className="searchbar-results">
          {
            books.map(book => (<SearchBarResultBlock key={book.id} book={book}></SearchBarResultBlock>))
          }
        </div>
    </div>
  );
}
