/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BookListItem from './BookListItem';
import { getOffices } from '../store/office/actions';

function BookList({
  dataSelector,
  dataAction,
  addLink = '',
  actionButton,
  navigateItems,
  filterComponent,
  noSort,
  renderItemActions = () => {},
}) {
  const dispatch = useDispatch();
  const [bookComponents, setBookComponents] = useState([]);

  useEffect(() => {
    dispatch(getOffices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(dataAction);
  }, [dispatch]);

  useEffect(() => {
    const createBookComponents = (data) => {
      return [...data].map((element, index) => {
        return (
          <BookListItem
            key={element.id}
            data={element}
            navigate={navigateItems}
            renderActions={(book) => renderItemActions(book, index)}
          />
        );
      });
    };

    setBookComponents(createBookComponents(dataSelector));
  }, [dataSelector, navigateItems]);

  return (
    <div className="book-grid">
      {!noSort && (
        <div className="book-grid__header">
          <div className="book-grid__header-filters">
            {filterComponent && filterComponent}
          </div>
        </div>
      )}
      {!!addLink && !!actionButton && actionButton}
      {bookComponents}
    </div>
  );
}

export default BookList;
