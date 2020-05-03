/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReservation } from "../store/reservations/actions";

export default ({ reservation, modalHandler, submitHandler }) => {
 
  const [returndate, handleDateChange] = useState(formatDate());
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.user.userData.id);
  

  function onSubmit() {
    const obj = createReservationObj();
    dispatch(addReservation(obj));
  }

  function createReservationObj() {
    const today = new Date();
   // const today = date.now();
    return {
      UserId,
      PlannedReturnOn: returndate,
      CheckedOutOn: today,
      BookCase: {
        BookId: reservation.book.id,
        OfficeId: reservation.activeOffice.id,
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

    return [year, month, day].join("-");
  }

  return (
    <>
      <h2>Check out</h2>
      <div className="book-details__image">
        <img src={reservation.book.coverPictureUrl} alt="" />
      </div>
      <div className="book-details__title">
        {reservation.book.title}
        <h4 className="text-secondary">
          by <span className="text-underlined">{reservation.book.author}</span>
        </h4>
      </div>
      <h2>Reserve at:</h2>
      <div className="ba-section-office-details">
        <div className="ba-section-list-item-text-title">
          {reservation.book.name} office
        </div>
        <div className="ba-section-list-item-text-available">
          {reservation.activeOffice.count} available
        </div>
        <div className="ba-section-list-item-text-address">
          {reservation.activeOffice.fullAddress}
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
      <button
        onClick={() => {
          modalHandler(false);
        }}
      >
        Cancel
      </button>
      <button onClick={onSubmit} disabled={!reservation}>
        {reservation.book.id ? "Save Changes" : "Confirm Reservation"}
      </button>
    </>
  );
};
