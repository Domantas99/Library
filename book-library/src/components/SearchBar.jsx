import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchedBooks } from "../store/search-bar/actions";
import SearchBarResultBlock from "./SearchBarResultBlock";

export default function SearchBar() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.searchbar.data);
  const history = useHistory();
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  function search(value) {
    if (value) {
      dispatch(getSearchedBooks(value));
    }
    setSuggestionsVisible(value);
  }

  function navigationOnEnter() {
    if (books[0] != null) {
      history.push(`/library/${books[0].id}`);
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onKeyPress={(e) => e.key === "Enter" && navigationOnEnter()}
      onBlur={() => setSuggestionsVisible(false)}
      onFocus={() => {
        setSuggestionsVisible(books);
      }}
      className="search"
    >
      <i className="search__icon" />
      <input
        className={`search__input${
          suggestionsVisible ? " suggestions-visible" : ""
        }`}
        onChange={(e) => {
          search(e.target.value);
        }}
        placeholder="Search books"
      />
      <ul className={`suggestions${suggestionsVisible ? "" : " hidden"}`}>
        {books.map((book) => (
          <li key={book.id}>
            <SearchBarResultBlock key={book.id} book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}
