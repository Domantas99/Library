/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookListItem from './BookListItem';
import { getFieldSorter } from '../utilities';
import { getOffices } from '../store/office/actions';

function BookList({
  dataSelector,
  dataAction,
  addLink = '',
  actionButton,
  navigateItems,
  filterComponent,
  noSort,
}) {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState('dateAdded');
  const [sortDirection, setSortDirection] = useState(-1);
  const [bookComponents, setBookComponents] = useState([]);
  const offices = useSelector((state)=> state.office.offices);
  const createBookComponents = (data, sort_field, sort_direction) => {
    return [...data]
      .sort(getFieldSorter(sort_field, sort_direction))
      .map((element) => {
        return (
          <BookListItem
            key={element.id}
            data={element}
            navigate={navigateItems}
            offices={offices}
          />
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
    dispatch(getOffices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(dataAction);
  }, [dispatch]);

  useEffect(() => {
    setBookComponents(
      createBookComponents(dataSelector, sortField, sortDirection)
    );
  }, [dataSelector, sortDirection, sortField]);

  return (
    <div className="book-grid">
      {!noSort && (
        <div className="book-grid__header">
          <div className="book-grid__header-filters">
            {filterComponent && filterComponent}
          </div>
          <div className="book-grid__header-sorter">
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
          </div>
        </div>
      )}
      {!!addLink && !!actionButton && actionButton}
      {bookComponents}
    </div>
  );
}

export default BookList;
