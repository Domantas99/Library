/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation, updateReservation } from '../store/reservations/actions';

export default ({ reservation, onExit, onSubmit, Edit }) => {
  debugger;
  const [returndate, handleDateChange] = useState(
    reservation.returnDay || formatDate()
  );
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.user.userData.id);
  
  function onSubmitClick() {
    const obj = createReservationObj();
    debugger
  //  if(Edit) {
     // dispatch(updateReservation(obj));
  //  } else {
      dispatch(addReservation(obj));
  //  }
    
    onSubmit();
    onExit();
  }

  function createReservationObj() {
    const today = new Date();
    debugger
    return {
      Id: reservation.id || -1,
      UserId,
      PlannedReturnOn: returndate,
      CheckedOutOn: today,
      BookCase: {
        BookId: reservation.book.id,
        OfficeId: reservation.activeOffice?.id || reservation.office.id,
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
      <h2>{Edit===true? "Edit reservation" : "Check out"}</h2>
      <div className="">
        <img src={reservation.book.coverPictureUrl} alt="" />
      </div>
      <div className="book-details__title">
        {reservation.book.title}
        <h4 className="text-secondary">
          by <span className="text-underlined">{reservation.book.author}</span>
        </h4>
      </div>
      <h4>Reserve at:</h4>
      <div className="ba-section-office-details">
        <div className="ba-section-list-item-text-title">
          {reservation?.activeOffice?.name || reservation.office.name } office
        </div>
        { Edit === false && (
          <div className="ba-section-list-item-text-available">
            {reservation.activeOffice.count} available
          </div>
          )
        }
        <div className="ba-section-list-item-text-address">
          {reservation?.activeOffice?.fullAddress || reservation.office.fullAddress }
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
        {reservation.book.id ? "Save Changes" : "Confirm Reservation"}
      </button>
    </>
  );
};
