/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBookDetails } from "../store/library/actions";
import BookAvailabilitySection from "./BookAvailabilitySection";
import BookCommentsSection from "./BookCommentsSection";

export default ({ id }) => {
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.library.bookDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(getBookDetails(id));
  }, [dispatch, id]);

  function handleClick() {
    history.push(`/edit-book/${id}`);
  }

  return (
    <div className="panel__content full-width">
      {bookDetails ? (
        <div className="book-details">
          <div className="book-details__main">
            <div className="book-details__book">
              <div className="book-details__image">
                <img src={bookDetails.coverPictureUrl} alt="" />
              </div>
              <div className="book-details__content">
                <div className="book-details__title">{bookDetails.title}</div>
                <h4 className="text-secondary">
                  by <span className="text-underlined">{bookDetails.author}</span>
                </h4>
                <div className="book-details__description">
                < p>{bookDetails.description}</p>
                </div>
                <hr />
                <h3>Details</h3>
                <div className="book-details__grid">
                  <span className="text-secondary">Original Title</span>
                  <span className="book-details__detail">
                    {bookDetails.title}
                  </span>

                  <span className="text-secondary">Format</span>
                  <span className="book-details__detail">
                    {bookDetails.format} | {bookDetails.numberOfPages} pages
                  </span>
                  <span className="text-secondary">Publication date</span>
                  <span className="book-details__detail">
                    {bookDetails.releaseDate}
                  </span>

                  <span className="text-secondary">Publisher</span>
                  <span className="book-details__detail">
                    {bookDetails.publisher}
                  </span>

                  <span className="text-secondary">ISBN</span>
                  <span className="book-details__detail">{bookDetails.isbn}</span>

                  <span className="text-secondary">Edition Language</span>
                  <span className="book-details__detail">
                    {bookDetails.editionLanguage}
                  </span>
                        <span className="text-secondary">Edition Language</span>
                        <span className="book-details__detail">{bookDetails.editionLanguage}</span>

                        <span className="text-secondary">Series</span>
                        <span className="book-details__detail">{bookDetails.series}</span>

                        <span className="text-secondary">Copies available</span>
                        <span className="book-details__detail">5 total, Kaunas (3) &middot; Vilnius (1)</span>

                    </div>
                        <button onClick={handleClick}>
                            Edit details
                        </button>
                    </div>
                    <div className="reservation-panel">
                        <h4>Reserve at</h4>
                    </div>
                </div>
            <hr/>
            <BookCommentsSection id={id}/>
          </div>
          <div className="reservation-panel">
            <BookAvailabilitySection bookId={id} />
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
