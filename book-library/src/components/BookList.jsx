import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BookListItem from "./BookListItem";
import { getFieldSorter } from "../utilities";

const createBookComponents = (data, sort_field, sort_direction) => {
  return [...data]
    .sort(getFieldSorter(sort_field, sort_direction))
    .map((element) => {
      return <BookListItem key={element.id} data={element} />;
    });
};

function BookList({ dataSelector, dataAction, addLink = "" }) {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState("dateAdded");
  const [sortDirection, setSortDirection] = useState(-1);
  const [bookComponents, setBookComponents] = useState([]);

  const handleChangeSortField = (event) => {
    setSortField(event.target.value);
  };

  const handleChangeSortDirection = (event) => {
    setSortDirection(event.target.value);
  };

  useEffect(() => {
    dispatch(dataAction());
  }, [dispatch, dataAction]);

  useEffect(() => {
    setBookComponents(
      createBookComponents(dataSelector, sortField, sortDirection)
    );
  }, [dataSelector, sortDirection, sortField]);

  return (
    <div className="panel__content">
      <select
        id="book-list-sorting-field"
        defaultValue={sortField}
        onChange={handleChangeSortField}
      >
        <option value="title">Title</option>
        <option value="releaseDate">Release Date</option>
        <option value="dateAdded">Date Added</option>
      </select>
      <select
        id="book-list-sorting-direction"
        defaultValue={`${sortDirection}`}
        onChange={handleChangeSortDirection}
      >
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>
      <div className="book-grid">
        {addLink && (
          <Link className="book" id="register-new" to="/register-book">
            <div className="book__add">
              <span className="book__add_plus">+</span>
              <span className="book__add_text">Register new book</span>
            </div>
          </Link>
        )}
        {bookComponents}
      </div>
    </div>
  );
}

export default BookList;
