/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { displayToast } from '../store/general/actions';
import {
  getBookDetails,
  deleteBook,
  rateBook,
  setBookArchiveState,
} from '../store/library/actions';
import { getBookReservations } from '../store/reservations/actions';
import BookAvailabilitySection from './BookAvailabilitySection';
import BookCommentsSection from './BookCommentsSection';
import BookDetailsGrid from './BookDetailsGrid';
import BookReservationsSection from './BookReservationsSection';
import Button from './Button';
import ConfirmationForm from './ConfirmationForm';
import Modal from './Modal';
import WaitlistModal from './WaitlistModal';

const BookDetails = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.library.bookDetails);
  const reservations = useSelector(
    (state) => state.reservations.bookReservationData
  );
  const { book } = bookDetails;
  const currentUser = useSelector((state) => state.user.userData);
  const userOffice = useSelector((state) => state.user.userData.officeId);
  const [confimationData, setConfirmationData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [unavailableInMyOffice, setUnavailableInMyOffice] = useState(false);
  const [waitingModal, setWaitingModal] = useState(false);
  const [waiting, setWaiting] = useState({ book, userOffice });
  const [activeOffice, setActiveOffice] = useState(null);
  const [moreBtnState, setMoreBtnState] = useState(false);
  console.log(bookDetails)
  const ref = React.createRef();

  useEffect(() => {
    if (!_.isEmpty(currentUser) && currentUser.id) {
      dispatch(getBookDetails(id, currentUser.id));
      dispatch(getBookReservations(id));
    }
  }, [dispatch, id, currentUser]);

  const handleScrollClick = () =>
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

  const createWaitingObj = () => {
    return {
      book: bookDetails.book,
      office: activeOffice ? activeOffice.id : userOffice,
    };
  };

  const openWaitingModal = () => {
    setWaiting(createWaitingObj());
    setWaitingModal(true);
  };

  const closeWaitingModal = () => {
    setActiveOffice(null);
    setWaitingModal(false);
  };

  function onDelete() {
    setModalState(false);
    if (bookDetails.isAnyoneReading === false) {
      dispatch(deleteBook(bookDetails.book.id));
    } else {
      const toast = {
        type: 'error',
        message: 'You cannot delete checked-in book',
        duration: 5000,
        position: 'TOP_RIGHT',
      };
      dispatch(displayToast(toast));
    }
  }

  function onArchive() {
    setModalState(false);
    if (bookDetails.isAnyoneReading === false) {
      dispatch(setBookArchiveState(book.id, !book.isArchived));
    } else {
      const toast = {
        type: 'error',
        message: 'You cannot archive checked-in book',
        duration: 5000,
        position: 'TOP_RIGHT',
      };
      dispatch(displayToast(toast));
    }
  }

  const archiveConfimationData = {
    text: `Do you really want to ${
      book && book.isArchived === true ? 'UN' : ''
    }ARCHIVE this book?`,
    onNo: () => setModalState(false),
    onYes: onArchive,
  };
  const DeleteConfirmationData = {
    text: 'Do you really want to DELETE this book?',
    onNo: () => setModalState(false),
    onYes: onDelete,
  };

  function handleClick() {
    history.push(`/edit-book/${id}`);
  }

  function onArchiveClick() {
    setConfirmationData(archiveConfimationData);
    setModalState(true);
  }

  function onDeleteClick() {
    setConfirmationData(DeleteConfirmationData);
    setModalState(true);
  }

  const onRateClick = (rating) => () => {
    dispatch(rateBook(id, rating));
  };

  const generateRatingStars = useCallback(() => {
    const stars = [];
    let i = 1;
    for (; i <= Math.floor(bookDetails.rating); i += 1) {
      stars.push(
        <img key={i} className="rating__star" onClick={onRateClick(i)} />
      );
    }
    if (bookDetails.rating % 1 > 0.25) {
      if (bookDetails.rating % 1 < 0.75) {
        stars.push(
          <img key={i} className="rating__star_half" onClick={onRateClick(i)} />
        );
      } else {
        stars.push(
          <img key={i} className="rating_star" onClick={onRateClick(i)} />
        );
      }
      i += 1;
    }
    for (; i <= 5; i += 1) {
      stars.push(
        <img key={i} className="rating__star_empty" onClick={onRateClick(i)} />
      );
    }
    return stars;
  }, [bookDetails]);

  if (_.isEmpty(bookDetails)) {
    return null;
  }

  return id ? (
    <>
      <div
        onClick={() => moreBtnState && setMoreBtnState(false)}
        className="book-details"
      >
        <div className="book-details__left-pannel">
          <div className="book-details__image">
            <img
              src={bookDetails.book && bookDetails.book.coverPictureUrl}
              alt=""
            />
          </div>
        </div>
        <div className="book-details__content">
          <div className="book-details__title">
            {bookDetails.book &&
              bookDetails.book.isArchived === true &&
              '[Archived]'}
            {bookDetails.book && bookDetails.book.title}
          </div>
          <h4 className="text-secondary">
            by
            <span className="text-underlined">
              {bookDetails.book && bookDetails.book.author}
            </span>
          </h4>
          <span className="rating__container">
            <span className="rating__stars">{generateRatingStars()}</span>
            <span>{bookDetails.rating && bookDetails.rating.toFixed(2)}</span>
            <span>
              {`${bookDetails.ratingCount} rating${
                bookDetails.ratingCount % 100 === 11 ||
                bookDetails.ratingCount % 10 !== 1
                  ? 's'
                  : ''
              }`}
            </span>
            {bookDetails.userHasRated && (
              <Button onClick={onRateClick(0)}>Remove Rating</Button>
            )}
          </span>
          {currentUser && currentUser.isAdmin === true && (
            <div>
              <Button
                onClick={() => setMoreBtnState(!moreBtnState)}
                mini
                secondary
              >
                <i className="btn__icon btn__icon--settings" />
                More
              </Button>
              {moreBtnState && (
                <div className="book-details-moreContent">
                  <Button small clear onClick={onArchiveClick}>
                    {`${
                      bookDetails.book && bookDetails.book.isArchived === true
                        ? 'Una'
                        : 'A'
                    }rchive book`}
                  </Button>
                  <Button small clear onClick={onDeleteClick}>
                    Delete book
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="book-details__content book-details__content--secondary">
          <div className="book-details__description">
            <p>{bookDetails.book && book.description}</p>
          </div>
          <hr />
          {bookDetails.book && (
            <BookDetailsGrid bookDetails={bookDetails.book} />
          )}
          {currentUser && currentUser.isAdmin === true && (
            <Button dark mini onClick={handleClick}>
              <i className="btn__icon btn__icon--edit" />
              Edit details
            </Button>
          )}
          {(reservations.borrowed.length > 0 ||
            reservations.waiting.length > 0) && (
            <>
              <hr />
              <BookReservationsSection
                reservations={reservations}
                reffer={ref}
                unavailableInMyOffice={unavailableInMyOffice}
                openWaitingModal={openWaitingModal}
              />
            </>
          )}
          <hr />
          <BookCommentsSection id={id} pageSize={5} />
        </div>

        <div className="book-details__side-panel reservation-panel">
          <BookAvailabilitySection
            bookDetails={bookDetails}
            handleScrollClick={handleScrollClick}
            setUnavailableInMyOffice={setUnavailableInMyOffice}
            activeOffice={activeOffice}
            setActiveOffice={setActiveOffice}
            openWaitingModal={openWaitingModal}
            user={currentUser}
            notReadingBookUsers={bookDetails.notReadingUsers}
          />
        </div>
      </div>
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
      <Modal
        modalState={waitingModal}
        exitAction={() => {
          setWaitingModal(false);
        }}
        height="auto"
        width="400px"
      >
        <WaitlistModal waiting={waiting} closeModal={closeWaitingModal} />
      </Modal>
    </>
  ) : (
    <></>
  );
};

BookDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default BookDetails;
