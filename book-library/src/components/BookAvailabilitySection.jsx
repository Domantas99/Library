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
  getReservations,
  removeReservation,
} from "../store/reservations/actions";

export default function BookAvailabilitySection({ bookDetails }) {
  const dispatch = useDispatch();
  const bookInOffices = useSelector((state) => state.library.bookAvailability);
  const [modalState, setModalState] = useState(false);
  const [cantFindModal, setCantFindModalState] = useState(false);
  const [checkInModalState, setCheckInModalState] = useState(false);
  const [activeReservation, setActiveReservation] = useState(false);
  const [activeOffice, setActiveOffice] = useState(null);
  const [reservation, setReservation] = useState(null);
  debugger;
  const handleModalClick = () => {
    const book = bookDetails.book;
    setReservation({ book, activeOffice });
    setModalState(true);
  };


  const onSubmitClick = () => {
    setActiveReservation(reservation);
  };

  const handleOfficeClick = (e, data) => {
    setActiveOffice(data);
  };

  function onCheckInSubmitClick() {
    debugger
    dispatch(removeReservation(bookDetails.activeReservation.id, bookDetails.readingUserId));
    setCheckInModalState(false);
  }

  useEffect(() => {
    dispatch(getBookAvailability(bookDetails?.book.id));
  }, [dispatch, bookDetails]);


  const generateOfficeElement = (d) => {
    if (d.count > 0) {
      return (
        <div className="ba-section-list-item" key={d.office.name}>
          <input
            type="radio"
            name="office"
            className="no_forced_size"
            onClick={(e) =>
              handleOfficeClick(e, { ...d.office, count: d.count })
            }
          />
          <div className="ba-section-office-details">
            <div className="ba-section-list-item-text-title">
              {d.office.name} office
            </div>
            <div className="ba-section-list-item-text-available">
              {d.count} available
            </div>
            <div className="ba-section-list-item-text-address">
              {d.office.fullAddress}
            </div>
            <div
              className="ba-section-list-item-text-other"
              onClick={() => setCantFindModalState(true)}
            >
              Can't find a copy?
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ba-section-list-item" key={d.office.name}>
          <div className="ba-section-list-item-text-title">
            {d.office.name} office
          </div>
          <div className="ba-section-list-item-text-unavailable">
            Currently unavailable
          </div>
          <div className="ba-section-list-item-text-address">
            {d.office.fullAddress}
          </div>
        </div>
      );
    }
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
                  {(activeOffice || activeReservation) && (
                    <ReservationModalContent
                      reservation={reservation}
                      onExit={() => setModalState(false)}
                      onSubmit={() => onSubmitClick()}
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
            <div className="ba-section-currentlyReading-content-date">
              {bookDetails.activeReservation.returnDate.substring(0, 10)}
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
