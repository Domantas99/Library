import React from 'react';
import PropTypes from 'prop-types';

const BookDetailsGrid = ({ bookDetails }) => (
  <>
    <h3>Details</h3>
    <div className="book-details__grid">
      <span className="text-secondary">Original Title</span>
      <span className="book-details__detail">{bookDetails.title}</span>

      <span className="text-secondary">Format</span>
      <span className="book-details__detail">
        {bookDetails.format} | {bookDetails.numberOfPages} pages
      </span>
      <span className="text-secondary">Publication date</span>
      <span className="book-details__detail">{bookDetails.releaseDate}</span>

      <span className="text-secondary">Publisher</span>
      <span className="book-details__detail">{bookDetails.publisher}</span>

      <span className="text-secondary">Category</span>
      <span className="book-details__detail">{bookDetails.category}</span>

      <span className="text-secondary">ISBN</span>
      <span className="book-details__detail">{bookDetails.isbn}</span>

      <span className="text-secondary">Edition Language</span>
      <span className="book-details__detail">
        {bookDetails.editionLanguage}
      </span>

      <span className="text-secondary">Series</span>
      <span className="book-details__detail">{bookDetails.series}</span>
    </div>
  </>
);

BookDetailsGrid.propTypes = {
  bookDetails: PropTypes.shape({
    title: PropTypes.string,
    format: PropTypes.string,
    numberOfPages: PropTypes.number,
    releaseDate: PropTypes.oneOf([PropTypes.string, PropTypes.date]),
    publisher: PropTypes.string,
    category: PropTypes.string,
    isbn: PropTypes.string,
    editionLanguage: PropTypes.string,
    series: PropTypes.string,
  }).isRequired,
};

export default BookDetailsGrid;
