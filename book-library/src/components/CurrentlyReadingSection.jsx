/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from "react";

export default function CurrentlyReadingSection({ books, title }) {
  return (
    <div className="curr-reading-section">
      <div className="panel__header">
        <h1 className="curr-reading-section-title">{title}</h1>
      </div>
      <div className="panel__content curr-reading-section-list">
        {books.map((book) => (
          <div key={book.id} className="curr-reading-section-block">
            <div className="curr-reading-section-block-info">
              <div className="curr-reading-section-block-info-image">
                <img src={book.coverPictureUrl} alt="" />
              </div>
              <div className="curr-reading-section-block-info-text">
                <div className="curr-reading-section-block-info-text-title">
                  {book.title}
                </div>
                <div>{book.author}</div>
                <div>Rating</div>
                <div>Return date</div>
              </div>
            </div>
            <div className="curr-reading-section-block-buttons">
              <button className="curr-reading-section-block-buttons-edit">
                Edit
              </button>
              <button className="curr-reading-section-block-buttons-checkin">
                Check In
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
