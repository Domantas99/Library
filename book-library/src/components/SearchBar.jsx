/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchedBooks, resetSearchbar } from '../store/search-bar/actions';
import SearchBarResultBlock from './SearchBarResultBlock';

export default function SearchBar() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.searchbar.data);
  const filter = useSelector((state) => state.searchbar.filter);
  const history = useHistory();
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function search(value) {
    dispatch(getSearchedBooks(value));
    setSuggestionsVisible(value);
  }

  function keyHandler(key) {
    switch (key) {
      case 13: // Enter
        if (books[activeIndex] != null) {
          history.push(`/library/${books[activeIndex].id}`);
          dispatch(resetSearchbar());
        }
        break;
      case 38: // Arrow up
        setActiveIndex(activeIndex > 0 ? activeIndex - 1 : 0);
        break;
      case 40: // Arrow down
        setActiveIndex(
          activeIndex < books.length - 1 ? activeIndex + 1 : books.length - 1
        );
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }

  return (
    <div
      onKeyDown={(e) => keyHandler(e.keyCode)}
      onBlur={(e) =>
        setSuggestionsVisible(e.currentTarget.contains(e.relatedTarget))
      }
      onFocus={() => {
        setSuggestionsVisible(books);
      }}
      className="search"
    >
      <i className="search__icon" />
      <input
        className={`search__input${
          suggestionsVisible ? ' suggestions-visible' : ''
        }`}
        onChange={(e) => {
          search(e.target.value);
        }}
        value={filter}
        placeholder="Search books"
      />
      <ul className={`suggestions${suggestionsVisible ? '' : ' hidden'}`}>
        {books.map((book, index) => (
          <li key={book.id}>
            <SearchBarResultBlock
              key={book.id}
              book={book}
              isSelected={activeIndex === index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
