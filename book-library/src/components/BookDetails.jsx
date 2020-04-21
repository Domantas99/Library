import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBookDetails } from "../store/library/actions";

export default ({id}) => {
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.library.bookDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(getBookDetails(id));
  }, [dispatch, id]);

  function handleClick() {
    history.push(`/edit-book/${  id}`);
  }

  return (
    <div className="page">
          { bookDetails ? (
            <div>
                <div className="page__content book-details">
                <div className="book-details__image">
                    <img src={bookDetails.CoverPictureUrl} alt=""/>
                </div>
                <div className="book-details__content">
                    <div className="book-details__title">
                    {bookDetails['Title']}
                    </div>
                    <h4 className="text-secondary">by <span className="text-underlined">{bookDetails.Author}</span></h4>
                    <div className="book-details__description">
                        <p>{bookDetails.Description}</p>
                    </div>
                    <hr></hr>
                    <h3>Details</h3>
                    <div className="book-details__grid">
                        <span className="text-secondary">Original Title</span>
                        <span className="book-details__detail">
                            {bookDetails.Title}
                        </span>

                        <span className="text-secondary">Format</span>
                        <span className="book-details__detail">{bookDetails.Format} | {bookDetails.NumberOfPages} pages</span>

                        <span className="text-secondary">Publication date</span>
                        <span className="book-details__detail">{bookDetails.ReleaseDate}</span>

                        <span className="text-secondary">Publisher</span>
                        <span className="book-details__detail">{bookDetails.Publisher}</span>

                        <span className="text-secondary">ISBN</span>
                        <span className="book-details__detail">{bookDetails.Isbn}</span>

                        <span className="text-secondary">Edition Language</span>
                        <span className="book-details__detail">{bookDetails.EditionLanguage}</span>

                        <span className="text-secondary">Series</span>
                        <span className="book-details__detail">{bookDetails.Series}</span>

                        <span className="text-secondary">Copies available</span>
                        <span className="book-details__detail">5 total, Kaunas (3) &middot; Vilnius (1)</span>

                    </div>
                    </div>
                    <div className="reservation-panel">
                        <h4>Reserve at</h4>
                    </div>
                </div>
            </div> ): 
            (<div>Loading</div>)} 
    </div>
  );
 }