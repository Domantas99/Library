/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define,jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';
import { getBookAvailability } from '../store/library/actions';
import { checkInReservation } from '../store/reservations/actions';
import Button, { BUTTON_APPEARANCE } from './Button';
import CantFind from './CantFind';
import CheckInForm from './CheckInForm';
import Modal from './Modal';
import RadioButton from './Radio';
import ReservationModalContent from './ReservationModalContent';
import ReturnDate from './ReturnDate';

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
  const { id: bookId } = useParams();

  useEffect(() => {
    dispatch(getBookAvailability(bookId));
  }, [dispatch, bookId]);

  useEffect(() => {
    const currentOffice = bookInOffices.find((x) => x.officeId === userOffice);
    if (
      currentOffice &&
      currentOffice.count === 0 &&
      bookDetails.isUserCurrentlyReading === false
    ) {
      setUnavailableInMyOffice(true);
    } else {
      setUnavailableInMyOffice(false);
    }
  }, [bookInOffices, setUnavailableInMyOffice, userOffice, bookDetails]);

  const { activeReservation } = bookDetails;

  const handleModalClick = () => {
    setReservationModalMode(false);
    const { book } = bookDetails;
    setReservation({ book, activeOffice });
    setModalState(true);
  };

  const handleOfficeClick = (e, data) => {
    setActiveOffice(data);
  };

  const closeModal = () => {
    setCheckInModalState(false);
    setReservationReview(null);
  };

  const onReservationExit = () => {
    setModalState(false);
    setActiveOffice(null);
  };

  function onCheckInSubmitClick() {
    dispatch(
      checkInReservation(bookDetails.activeReservation.id, reservationReview)
    );
    setActiveOffice(null);
    setCheckInModalState(false);
  }

  useEffect(() => {
    if (bookDetails.book) {
      dispatch(getBookAvailability(bookDetails.book.id));
    }
  }, [dispatch, bookDetails]);

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
            {`${d.office.name} office`}
          </div>
          <div className={availableClass}>
            {!unavailable ? `${d.count} available` : 'Currently unavailable'}
          </div>
          <div className="book-status__text book-status__text--secondary">
            {d.office.fullAddress}
          </div>
          {d.count > 0 && (
            <a
              className="book-status__text book-status__text--link"
              onClick={() => setCantFindModalState(true)}
            >
              Can&apos;t find a copy?
            </a>
          )}
        </div>
      </div>
    );
  };

  const currentlyReading = (
    <>
      <div className="book-status__item ba-section-currentlyReading-content">
        <div className="ba-section-currentlyReading-content-text">
          You are currently reading this book
        </div>
        <div>
          Return date:
          <span className="ba-section-currentlyReading-content-date">
            {activeReservation && (
              <ReturnDate date={activeReservation.returnDate} validate />
            )}
          </span>
        </div>
      </div>
      <div className="book-status__buttons">
        <Button
          buttonAppearance={BUTTON_APPEARANCE.WIDE}
          onClick={() => setCheckInModalState(true)}
        >
          Check in
        </Button>
        <Button
          buttonAppearance={
            BUTTON_APPEARANCE.WIDE | BUTTON_APPEARANCE.SECONDARY
          }
          onClick={() => {
            setModalState(true);
            setReservationModalMode(true);
          }}
        >
          Edit reservation
        </Button>
      </div>
    </>
  );

  const offices =
    bookInOffices.length > 0 ? (
      <>
        {_.map(bookInOffices, (d) => generateOfficeElement(d))}
        {activeOffice && activeOffice.count < 1 ? (
          <div className="book-status__buttons">
            <div>
              {bookDetails.isUserInWaitlist === false &&
                bookDetails.isUserCurrentlyReading === false && (
                  <Button
                    buttonAppearance={BUTTON_APPEARANCE.WIDE}
                    onClick={openWaitingModal}
                    disabled={!activeOffice}
                  >
                    Enter waitlist
                  </Button>
                )}

              <Button
                buttonAppearance={
                  BUTTON_APPEARANCE.WIDE | BUTTON_APPEARANCE.SECONDARY
                }
                onClick={handleScrollClick}
                disabled={!activeOffice}
              >
                Who else waiting?
              </Button>
            </div>
          </div>
        ) : (
          <div className="book-status__buttons">
            <Button
              buttonAppearance={BUTTON_APPEARANCE.WIDE}
              onClick={() => handleModalClick()}
              disabled={
                !activeOffice ||
                (bookDetails &&
                  bookDetails.book &&
                  bookDetails.book.isArchived === true)
              }
            >
              {bookDetails.isUserCurrentlyReading === true &&
              user &&
              user.isAdmin
                ? 'Check out for other person'
                : 'Check out'}
            </Button>
          </div>
        )}
      </>
    ) : (
      <div>Book is not added</div>
    );

  const availabilitySection = () => {
    if (bookDetails.isUserCurrentlyReading && !user.isAdmin) {
      return currentlyReading;
    }
    if (bookDetails.isUserCurrentlyReading && user.isAdmin) {
      return [currentlyReading, offices];
    }

    return offices;
  };

  return (
    <>
      <div className="book-status">{availabilitySection()}</div>
      <Modal modalState={modalState} exitAction={() => setModalState(false)}>
        {(activeOffice || activeReservation) && (
          <ReservationModalContent
            Edit={reservationModalMode}
            isAdmin={user && user.isAdmin}
            notReadingUsers={notReadingBookUsers}
            setActiveOffice={setActiveOffice}
            isUserReading={bookDetails.isUserCurrentlyReading}
            reservation={
              reservationModalMode === false ? reservation : activeReservation
            }
            onExit={() => onReservationExit()}
            onSubmit={() => ({})}
          />
        )}
      </Modal>
      <Modal modalState={checkInModalState} exitAction={() => closeModal()}>
        {activeReservation && (
          <CheckInForm
            reservation={activeReservation}
            onCancel={() => closeModal()}
            onConfirm={() => onCheckInSubmitClick()}
            reviewValue={reservationReview}
            reviewHandler={setReservationReview}
          />
        )}
      </Modal>
      <Modal
        modalState={cantFindModal}
        exitAction={() => setCantFindModalState(false)}
        width="500px"
      >
        <CantFind onExit={() => setCantFindModalState(false)} />
      </Modal>
    </>
  );
};

export default BookAvailabilitySection;
