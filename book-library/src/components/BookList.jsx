/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BookListItem from "./BookListItem";
import { getFieldSorter } from "../utilities";

function BookList({
  dataSelector,
  dataAction,
  addLink = "",
  actionButton,
  navigate,
}) {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState("dateAdded");
  const [sortDirection, setSortDirection] = useState(-1);
  const [bookComponents, setBookComponents] = useState([]);

  const createBookComponents = (data, sort_field, sort_direction) => {
    return [...data]
      .sort(getFieldSorter(sort_field, sort_direction))
      .map((element) => {
        return (
          <BookListItem key={element.id} data={element} navigate={navigate} />
        );
      });
  };

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
        {addLink && <div>{actionButton}</div>}
        {bookComponents}
      </div>
    </div>
  );
}

export default BookList;
