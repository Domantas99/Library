/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import BookListItem from "./BookListItem";

export default function BooksSection({ books, sectionName }) {
  return (
    <div className="panel">
      <div className="panel__header book-section-header">
        <h1>{sectionName}</h1>
        <Link className="book-section-header-link" to="/library">
          See all
        </Link>
      </div>
      <div className="panel__content book-grid book-section" data-copies="4">
        {books.map((book) => (
          <div key={book.id} className="book-section-block">
            <BookListItem data={book} navigate />
          </div>
        ))}
      </div>
    </div>
  );
}
