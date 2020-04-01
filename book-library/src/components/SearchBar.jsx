import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedBooks } from '../store/search-bar/actions';

export default function SearchBar() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.searchbar.data);
  let timerId;
  function  search(value) {
   dispatch(getSearchedBooks(value));
  }

  function debounce(func, delay) {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
  }

  return (
    <div>
      {console.log(books, 'cia state')}
        <input onChange={(e) => search(e.target.value)} placeholder="Search books"></input>
        {books.map(b => (
          <div key={b.id}>{b.title}</div>
        ))}
    </div>
  );
}
