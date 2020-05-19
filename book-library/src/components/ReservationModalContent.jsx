/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation } from '../store/reservations/actions';

export default ({ reservation, onExit, Edit }) => {
  const [returndate, handleDateChange] = useState(
    reservation.plannedReturnOn?.substring(0, 10) ||
      reservation.returnDate?.substring(0, 10) ||
      formatDate()
  );
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.user.userData.id);
  const reservationObj = {
    office:
      reservation.activeOffice ||
      reservation.office ||
      reservation.bookCase?.office,
    book: reservation.book || reservation.bookCase.book,
  };

  function onSubmitClick() {
    const obj = createReservationObj();
    dispatch(addReservation(obj));
    onExit();
  }

  function createReservationObj() {
    const today = new Date();
    return {
      Id: reservation.id || -1,
      UserId,
      PlannedReturnOn: returndate,
      CheckedOutOn: today,
      BookCase: {
        BookId: reservationObj.book.id,
        OfficeId: reservationObj.office.id,
        Count: 1,
        CreatedOn: today,
        CreatedBy: UserId,
        ModifiedOn: today,
        ModifiedBy: UserId,
      },
    };
  }

  function formatDate() {
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
        <label htmlFor="reservedUntil">Reserve until:</label>
        <input
          type="date"
          name="reservedUntil"
          min={formatDate()}
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
