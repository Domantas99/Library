/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReservation } from '../store/reservations/actions';
import { formatDate } from '../utilities/dateHalper';

export default ({ reservation, onExit, Edit, isAdmin, notReadingUsers }) => {
  const [returndate, handleDateChange] = useState(
    formatDate(reservation.plannedReturnOn) ||
      formatDate(reservation.returnDate) ||
      newDate()
  );
  const [selectedCheckOutUser, setCheckOutUser] = useState(null);
  const dispatch = useDispatch();

  const reservationObj = {
    office:
      reservation.activeOffice ||
      reservation.office ||
      reservation.bookCase.office,
    book: reservation.book || reservation.bookCase.book,
  };

  function onSubmitClick() {
    const obj = createReservationObj();
    dispatch(addReservation(obj, selectedCheckOutUser));
    onExit();
  }

  function createReservationObj() {
    return {
      reservationId: reservation.id || null,
      userId: selectedCheckOutUser || null,
      plannedReturnOn: returndate,
      bookId: reservationObj.book.id,
      officeId: reservationObj.office.id,
    };
  }

  function newDate() {
    const date = new Date();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

  return (
    <>
      <h2>{Edit === true ? 'Edit reservation' : 'Check out'}</h2>
      <div className="">
        <img src={reservationObj.book.coverPictureUrl} alt="" />
      </div>
      <div className="book-details__title">
        {reservationObj.book.title}
        <h4 className="text-secondary">
          by{' '}
          <span className="text-underlined">{reservationObj.book.author}</span>
        </h4>
      </div>
      <h4>Reserve at:</h4>
      <div className="ba-section-office-details">
        <div className="ba-section-list-item-text-title">
          {reservationObj.office.name} office
        </div>
        {Edit === false && (
          <div className="ba-section-list-item-text-available">
            {reservation.activeOffice.count} available
          </div>
        )}
        <div className="ba-section-list-item-text-address">
          {reservationObj.office.fullAddress}
        </div>
        {isAdmin === true && Edit === false && (
          <div className="ba-section-list-item-text-address">
            <h4>Check out for:</h4>
            <select
              onChange={(e) => setCheckOutUser(e.target.value)}
              value={selectedCheckOutUser}
            >
              {notReadingUsers.map((user) => (
                <option value={user.userId}>
                  {/* <img src={user.imageUrl}/> */}
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
        )}
        <label htmlFor="reservedUntil">Reserve until:</label>
        <input
          type="date"
          name="reservedUntil"
          min={newDate()}
          value={returndate}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      {/* TODO We'll need to fix these buttons too. */}
      <button
        onClick={() => {
          onExit(false);
        }}
      >
        Cancel
      </button>
      <button onClick={() => onSubmitClick()} disabled={!reservation}>
        {reservationObj.book.id ? 'Save Changes' : 'Confirm Reservation'}
      </button>
    </>
  );
};
