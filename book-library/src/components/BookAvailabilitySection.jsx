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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookAvailability } from "../store/library/actions";
import Modal from "./Modal";
import ReservationModalContent from "./ReservationModalContent";
import CantFind from "./CantFind";
import CheckInForm from "./CheckInForm";
import {
  removeReservation,
} from "../store/reservations/actions";
import classNames from 'classnames';
import RadioButton from './Radio';


export default function BookAvailabilitySection({ bookDetails }) {
  const dispatch = useDispatch();
  const bookInOffices = useSelector((state) => state.library.bookAvailability);
  const [modalState, setModalState] = useState(false);
  const [cantFindModal, setCantFindModalState] = useState(false);
  const [checkInModalState, setCheckInModalState] = useState(false);
  const [activeOffice, setActiveOffice] = useState(null);
  const [reservation, setReservation]= useState(null);
  const handleModalClick = () => {
    const book = bookDetails.book;
    setReservation({ book, activeOffice });
    setModalState(true);
  };

  const handleOfficeClick = (e, data) => {
    setActiveOffice(data);
  };

  function onCheckInSubmitClick() {
    dispatch(removeReservation(bookDetails.activeReservation.id, bookDetails.readingUserId));
    setCheckInModalState(false);
  }

  useEffect(() => {
    dispatch(getBookAvailability(bookDetails?.book.id));
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
          disabled={unavailable}
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
      {bookDetails.isUserCurrentlyReading===false ? (
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
                <Modal
                  modalState={modalState}
                  exitAction={() => setModalState(false)}
                  height="auto"
                  width="400px"
                >
                  {(activeOffice) && (
                    <ReservationModalContent
                      reservation={reservation}
                      onExit={() => setModalState(false)}
                      onSubmit={() => ({})}
                    />
                  )}
                </Modal>
              </div>
              <div className="ba-section-buttons">
                <div>
                  <button
                    className="ba-section-buttons-dark"
                    onClick={() => handleModalClick()}
                    disabled={!activeOffice}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Book is not added</div>
          )}
        </div>
      ) : (
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
            />
          </Modal>
          <div className="ba-section-currentlyReading-content">
            <div className="ba-section-currentlyReading-content-text">
              You are currently reading this book
            </div>
            <div>
              Return date:
            <span className="ba-section-currentlyReading-content-date">
              {bookDetails.activeReservation.returnDate.substring(0, 10)}
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
            <button className="ba-section-buttons-light">
              Edit reservation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
