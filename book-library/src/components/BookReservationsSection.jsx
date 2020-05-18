import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookReservations } from '../store/reservations/actions';
import Button from './Button';

export default ({ id, reffer, unavailableInMyOffice, openWaitingModal }) => {
  const dispatch = useDispatch();
  const reservations = useSelector(
    (state) => state.reservations.bookReservationData
  );
  const [borrowed, setBorrowed] = useState([]);
  const [waiting, setWaiting] = useState([]);

  const generateReservationComponents = (reservations) => {
    let borrowed = [];
    let waiting = [];
    reservations.forEach((reservation) => {
      if (reservation.status === 'Borrowed') {
        if (borrowed.length === 0) {
          borrowed.push(
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
        borrowed.push(
          <div key={reservation.id} className="book-reservation__list-item">
            <div className="book-reservation__employee">
              <img
                className="book-reservation__user-picture"
                src={reservation.userPictureUrl}
                alt=""
              />
              <span>{reservation.userName}</span>
            </div>
            <span className="book-reservation__office">
              {reservation.office}
            </span>
            <span className="book-reservation__bookedFrom">
              {reservation.bookedFrom}
            </span>
            <span className="book-reservation__returnDate">
              {reservation.returnDate}
            </span>
          </div>
        );
      } else if (reservation.status === 'Waiting') {
        if (waiting.length === 0) {
          waiting.push(
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
        waiting.push(
          <div key={reservation.id} className="book-reservation__list-item">
            <div className="book-reservation__employee">
              <img
                className="book-reservation__user-picture"
                src={reservation.userPictureUrl}
                alt=""
              />
              <span>{reservation.userName}</span>
            </div>
            <span className="book-reservation__office">
              {reservation.office}
            </span>
            <span className="book-reservation__bookedFrom">
              {reservation.bookedFrom}
            </span>
          </div>
        );
      }
    });
    setBorrowed(borrowed);
    setWaiting(waiting);
  };

  useEffect(() => {
    dispatch(getBookReservations(id));
  }, [dispatch, id]);

  useEffect(() => {
    generateReservationComponents(reservations);
  }, [dispatch, reservations]);

  return (
    <>
      {borrowed ? (
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
      {waiting ? (
        <>
          <div className="book-reservation__list" ref={reffer}>
            <h3 className="book-reservation__list-title">Waitlist</h3>
            {waiting}
          </div>
        </>
      ) : (
        <></>
      )}
      {unavailableInMyOffice===true && (
      <Button mini dark onClick={openWaitingModal}>
        Join Waitlist
      </Button>)}
    </>
  );
};
