import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedBooks } from '../store/search-bar/actions';
import SearchBarResultBlock from './SearchBarResultBlock';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function SearchBar() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.searchbar.data);
  const history = useHistory();

  function search(value) {
    dispatch(getSearchedBooks(value));
  }

  function navigationOnEnter() {
    if(books[0] != null) {
      history.push('/library/' + books[0].id);
    }
  } 

  return (
    <div onKeyPress= {e => e.key === 'Enter' && navigationOnEnter() } className="searchbar"> 
        <input className="_searchbar-input" onChange={(e) => search(e.target.value)} placeholder="Search books"></input>
        <div className="_searchbar-results">
          {
            books.map(book => (
            <Link to={`/library/` + book.id}>
             <SearchBarResultBlock key={book.id} book={book}></SearchBarResultBlock>
            </Link>))
          }
        </div>
    </div>
  );
}
