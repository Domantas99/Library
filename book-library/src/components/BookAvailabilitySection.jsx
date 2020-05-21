/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getBookAvailability } from '../store/library/actions';
import { checkInReservation } from '../store/reservations/actions';
import CantFind from './CantFind';
import CheckInForm from './CheckInForm';
import Modal from './Modal';
import RadioButton from './Radio';
import ReservationModalContent from './ReservationModalContent';

const BookAvailabilitySection = ({
  bookDetails,
  handleScrollClick,
  setUnavailableInMyOffice,
  activeOffice,
  setActiveOffice,
  openWaitingModal,
  user,
  notReadingBookUsers,
}) => {
  const dispatch = useDispatch();
  const bookInOffices = useSelector((state) => state.library.bookAvailability);
  const userOffice = useSelector((state) => state.user.userData.officeId);
  const [modalState, setModalState] = useState(false);
  const [cantFindModal, setCantFindModalState] = useState(false);
  const [checkInModalState, setCheckInModalState] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [reservationReview, setReservationReview] = useState('');
  const [reservationModalMode, setReservationModalMode] = useState(false);

  const handleModalClick = () => {
    setReservationModalMode(false);
    const book = bookDetails.book;
    setReservation({ book, activeOffice });
    setModalState(true);
  };

  const handleOfficeClick = (e, data) => {
    setActiveOffice(data);
  };

  function onCheckInSubmitClick() {
    dispatch(
      checkInReservation(
        bookDetails.activeReservation.id,
        bookDetails.readingUserId,
        reservationReview
      )
    );
    setCheckInModalState(false);
  }

  useEffect(() => {
    if (bookDetails?.book) {
      dispatch(getBookAvailability(bookDetails?.book?.id));
    }
  }, [dispatch, bookDetails]);

  useEffect(() => {
    const officeC = bookInOffices.find((x) => x.id === userOffice);
    if (officeC?.count === 0 && bookDetails.isUserCurrentlyReading === false) {
      setUnavailableInMyOffice(true);
    }
  }, [bookInOffices, setUnavailableInMyOffice, userOffice, bookDetails]);

  const generateOfficeElement = (d) => {
    const unavailable = !d.count;
    const itemClass = classNames('book-status__item', {
      'book-status__item--disabled': unavailable,
    });

    const availableClass = classNames('book-status__text', {
      'book-status__text--available': !unavailable,
      'book-status__text--unavailable': unavailable,
    });

    return (
      <div className={itemClass} key={d.office.name}>
        <RadioButton
          title={<i className="icon icon__office" />}
          name="office"
          onClick={(e) => handleOfficeClick(e, { ...d.office, count: d.count })}
        />
        <div className="book-status__info">
          <div className="book-status__text book-status__text--title">
            {d.office.name} office
          </div>
          <div className={availableClass}>
            {!unavailable ? `${d.count} available` : 'Currently unavailable'}
          </div>
          <div className="book-status__text book-status__text--secondary">
            {d.office.fullAddress}
          </div>
          {d.count > 0 && (
            // TODO there may be a better way to do this?
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className="book-status__text book-status__text--link"
              onClick={() => setCantFindModalState(true)}
            >
              Can't find a copy?
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ba-section">
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="auto"
        width="400px"
      >
        {(activeOffice || bookDetails.activeReservation) && (
          <ReservationModalContent
            Edit={reservationModalMode}
            isAdmin={user?.isAdmin}
            notReadingUsers={notReadingBookUsers}
            reservation={
              reservationModalMode === false
                ? reservation
                : bookDetails.activeReservation
            }
            onExit={() => setModalState(false)}
            onSubmit={() => ({})}
          />
        )}
      </Modal>
      {bookDetails.isUserCurrentlyReading === true && (
        <div className="ba-section-currentlyReading">
          <Modal
            modalState={checkInModalState}
            exitAction={() => setCheckInModalState(false)}
            height="400px"
            width="400px"
          >
            <CheckInForm
              reservation={bookDetails.activeReservation}
              onCancel={() => setCheckInModalState(false)}
              onConfirm={() => onCheckInSubmitClick()}
              reviewValue={reservationReview}
              reviewHandler={setReservationReview}
            />
          </Modal>
          <div className="ba-section-currentlyReading-content">
            <div className="ba-section-currentlyReading-content-text">
              You are currently reading this book
            </div>
            <div>
              Return date:
              <span className="ba-section-currentlyReading-content-date">
                {bookDetails?.activeReservation?.returnDate.substring(0, 10)}
              </span>
            </div>
          </div>
          <div className="ba-section-buttons">
            <button
              className="ba-section-buttons-dark"
              onClick={() => setCheckInModalState(true)}
            >
              Check in
            </button>
            <button
              onClick={() => {
                setModalState(true);
                setReservationModalMode(true);
              }}
              className="ba-section-buttons-light"
            >
              Edit reservation
            </button>
          </div>
        </div>
      )}

      {(bookDetails.isUserCurrentlyReading === false || user?.isAdmin) && (
        <div>
          {bookInOffices.length > 0 ? (
            <div>
              <div className="ba-section-list">
                <Modal
                  modalState={cantFindModal}
                  exitAction={() => setCantFindModalState(false)}
                  height="250px"
                  width="500px"
                >
                  <CantFind onExit={() => setCantFindModalState(false)} />
                </Modal>
                {bookInOffices.map((d) => generateOfficeElement(d))}
              </div>
              {activeOffice && activeOffice.count < 1 ? (
                <div className="ba-section-buttons">
                  <div>
                    <button
                      className="ba-section-buttons-dark"
                      onClick={openWaitingModal}
                      disabled={!activeOffice}
                    >
                      Enter waitlist
                    </button>
                    <button
                      className="ba-section-buttons-light"
                      onClick={handleScrollClick}
                      disabled={!activeOffice}
                    >
                      Who else waiting?
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ba-section-buttons">
                  <div>
                    <button
                      /* TODO add style when book isArchived */
                      className="ba-section-buttons-dark"
                      onClick={() => handleModalClick()}
                      disabled={
                        !activeOffice || bookDetails.book?.isArchived === true
                      }
                    >
                      {bookDetails.isUserCurrentlyReading === true &&
                      user?.isAdmin
                        ? 'Check out for other person'
                        : 'Check out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>Book is not added</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookAvailabilitySection;
