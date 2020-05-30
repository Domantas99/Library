import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from './Button';

const BookReservationSection = ({
  reservations,
  reffer,
  unavailableInMyOffice,
  openWaitingModal,
}) => {
  const dispatch = useDispatch();
  const [borrowed, setBorrowed] = useState([]);
  const [waiting, setWaiting] = useState([]);

  useEffect(() => {
    const generateReservationComponents = () => {
      const borrowedElements = [];
      const waitingElements = [];
      reservations.borrowed.forEach((reservation) => {
        if (borrowedElements.length === 0) {
          borrowedElements.push(
            <div key="header" className="book-reservation__list-header">
              <span className="book-reservation__list-header-employee">
                Employee
              </span>
              <span className="book-reservation__list-header-office">
                Office
              </span>
              <span className="book-reservation__list-header-bookedFrom">
                Booked From
              </span>
              <span className="book-reservation__list-header-returnDate">
                Return Date
              </span>
            </div>
          );
        }
        borrowedElements.push(
          <div key={reservation.id} className="book-reservation__list-item">
            <div className="book-reservation__employee">
              <img
                className="book-reservation__user-picture"
                src={reservation.user.profilePictureUrl}
                alt=""
              />
              <span>{reservation.user.fullName}</span>
            </div>
            <span className="book-reservation__office">
              {reservation.office.name}
            </span>
            <span className="book-reservation__bookedFrom">
              {reservation.bookedFrom}
            </span>
            <span className="book-reservation__returnDate">
              {reservation.returnDate}
            </span>
          </div>
        );
      });
      reservations.waiting.forEach((reservation) => {
        if (waitingElements.length === 0) {
          waitingElements.push(
            <div key="header" className="book-reservation__list-header">
              <span className="book-reservation__list-header-employee">
                Employee
              </span>
              <span className="book-reservation__list-header-office">
                Office
              </span>
              <span className="book-reservation__list-header-bookedFrom">
                Requested On
              </span>
            </div>
          );
        }
        waitingElements.push(
          <div key={reservation.id} className="book-reservation__list-item">
            <div className="book-reservation__employee">
              <img
                className="book-reservation__user-picture"
                src={reservation.user.profilePictureUrl}
                alt=""
              />
              <span>{reservation.user.fullName}</span>
            </div>
            <span className="book-reservation__office">
              {reservation.office.name}
            </span>
            <span className="book-reservation__bookedFrom">
              {reservation.bookedFrom}
            </span>
          </div>
        );
      });
      setBorrowed(borrowedElements);
      setWaiting(waitingElements);
    };
    generateReservationComponents(reservations);
  }, [dispatch, reservations]);

  return (
    <>
      {borrowed && borrowed.length > 0 ? (
        <>
          <div className="book-reservation__list">
            <h3 className="book-reservation__list-title">
              Active reservations
            </h3>
            {borrowed}
          </div>
        </>
      ) : (
        <></>
      )}
      {waiting && waiting.length > 0 ? (
        <>
          <div className="book-reservation__list" ref={reffer}>
            <h3 className="book-reservation__list-title">Waitlist</h3>
            {waiting}
          </div>
        </>
      ) : (
        <></>
      )}
      {unavailableInMyOffice === true && (
        <Button mini dark onClick={openWaitingModal}>
          Join Waitlist
        </Button>
      )}
    </>
  );
};

BookReservationSection.propTypes = {
  reservations: PropTypes.shape({
    borrowed: PropTypes.array,
    waiting: PropTypes.array,
  }).isRequired,
  reffer: PropTypes.shape({ current: PropTypes.any }).isRequired,
  unavailableInMyOffice: PropTypes.bool.isRequired,
  openWaitingModal: PropTypes.func.isRequired,
};

export default BookReservationSection;
