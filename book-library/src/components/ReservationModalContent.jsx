/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { addReservation } from '../store/reservations/actions';
import { formatDate, isDate } from '../utilities/dateHalper';
import { displayToast } from '../store/general/actions';

export default ({
  reservation,
  onExit,
  Edit,
  isAdmin,
  notReadingUsers,
  isUserReading,
}) => {
  const userData = useSelector((state) => state.user.userData);
  const [returndate, handleDateChange] = useState(
    formatDate(reservation.plannedReturnOn) ||
      formatDate(reservation.returnDate) ||
      newDate()
  );

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const checkOutUsers = _.filter(notReadingUsers, (u) => u.userId !== user.id);
  if (!isUserReading) {
    checkOutUsers.unshift({ fullName: 'Myself' });
  }
  const [selectedCheckOutUser, setCheckOutUser] = useState(
    checkOutUsers[0].userId
  );

  const reservationObj = {
    office:
      reservation.activeOffice ||
      reservation.office ||
      reservation.bookCase.office,
    book: reservation.book || reservation.bookCase.book,
  };

  function onSubmitClick() {
    if (isDate(returndate) && formatDate(new Date()) <= returndate) {
      const obj = createReservationObj();
      dispatch(addReservation(obj));
      onExit();
    } else {
      const toast = {
        type: 'error',
        message: 'Wrong date format',
        duration: 5000,
        position: 'TOP_RIGHT',
      };
      dispatch(displayToast(toast));
    }
  }

  function createReservationObj() {
    return {
      reservationId: reservation.id || null,
      userId: Number(selectedCheckOutUser) || null,
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
              value={selectedCheckOutUser || userData.userId}
            >
              {checkOutUsers.map((u) => (
                <option key={u.userId} value={u.userId}>
                  {/* <img src={user.imageUrl}/> */}
                  {u.fullName}
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
      <button
        onClick={() => onSubmitClick()}
        disabled={!reservation || checkOutUsers.length <= 0}
      >
        {reservationObj.book.id ? 'Save Changes' : 'Confirm Reservation'}
      </button>
    </>
  );
};
