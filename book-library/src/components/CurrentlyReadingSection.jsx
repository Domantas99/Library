/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from './Button';

export default function CurrentlyReadingSection({ books }) {
  return (
    <ul className="currently-reading">
      {books.map((book) => (
        <li key={book.id} className="currently-reading__item">
          <div className="currently-reading__info">
            <div className="currently-reading__image">
              <img src={book.coverPictureUrl} alt="" />
            </div>
            <div>
              <h4 className="currently-reading__title">{book.title}</h4>
              <h5 className="currently-reading__author">{book.author}</h5>
            </div>
          </div>
          <div className="currently-reading__actions">
            <Button secondaryAction small wide>
              Edit
            </Button>
            <Button small wide>
              Check In
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
