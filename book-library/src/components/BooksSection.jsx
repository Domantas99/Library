/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

export default function BooksSection({ books, sectionName }) {
  return (
    <div className="panel">
      <div className="panel__header book-section-header">
        <h1>{sectionName}</h1>
        <Link className="book-section-header-link" to="/library">See all</Link>
      </div>
      <div className="panel__content book-grid book-section" data-copies="4">
        {books.map((book) => (
          <div key={book.id}>
            <div className="book-section-block">
              <div className="book-section-block-image">
                <img src="https://picsum.photos/200/300?random=1" alt="" />
              </div>
              <div>
                <div className="book-section-block-title">{book.title}</div>
                <div className="book-section-block-author">{book.author}</div>
                {/* <span>Rating</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
