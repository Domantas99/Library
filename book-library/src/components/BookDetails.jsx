/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBookDetails, deleteBook } from "../store/library/actions";
import BookAvailabilitySection from "./BookAvailabilitySection";
import BookCommentsSection from "./BookCommentsSection";
import Modal from "./Modal";
import ConfirmationForm from "./ConfirmationForm";

export default ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.library.bookDetails);
  const [confimationData, setConfirmationData] = useState([]);
  const [modalState, setModalState] = useState(false);

  function onDelete() {
    setModalState(false);
    history.push("/library");
    dispatch(deleteBook(bookDetails.id));
  }

  const archiveConfimationData = {
    text: "Do you really want to ARCHIVE this book?",
    onNo: () => setModalState(false),
    onYes: () => {},
  };
  const DeleteConfimationData = {
    text: "Do you really want to DELETE this book?",
    onNo: () => setModalState(false),
    onYes: onDelete,
  };

  useEffect(() => {
    dispatch(getBookDetails(id));
  }, [dispatch, id]);

  function handleClick() {
    history.push(`/edit-book/${id}`);
  }

  function onArchiveClick() {
    setConfirmationData(archiveConfimationData);
    setModalState(true);
  }

  function onDeleteClick() {
    setConfirmationData(DeleteConfimationData);
    setModalState(true);
  }

  return (
    <div className="panel__content full-width">
      {bookDetails ? (
        <div className="book-details">
          <Modal
            modalState={modalState}
            exitAction={() => setModalState(false)}
            height="120px"
            width="400px"
          >
            <ConfirmationForm
              text={confimationData.text}
              onNoAction={confimationData.onNo}
              onYesAction={confimationData.onYes}
            />
          </Modal>
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
                  <p>{bookDetails.description}</p>
                </div>
                <div>
                  <button onClick={() => onArchiveClick()}>Archive book</button>
                  <button onClick={() => onDeleteClick()}>Delete book</button>
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
                  <span className="book-details__detail">
                    {bookDetails.isbn}
                  </span>

                  <span className="text-secondary">Edition Language</span>
                  <span className="book-details__detail">
                    {bookDetails.editionLanguage}
                  </span>
                  <span className="text-secondary">Edition Language</span>
                  <span className="book-details__detail">
                    {bookDetails.editionLanguage}
                  </span>

                  <span className="text-secondary">Series</span>
                  <span className="book-details__detail">
                    {bookDetails.series}
                  </span>
                </div>
                <button onClick={handleClick}>Edit details</button>
              </div>
            </div>
            <hr />
            <BookCommentsSection id={id} />
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
