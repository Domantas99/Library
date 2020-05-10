/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function CheckInForm({ reservation, onCancel, onConfirm }) {
  function onConfirmClick() {
    onConfirm();
  }

  return (
    <div className="checkInForm">
      <h2>Check in</h2>
      <div className="checkInForm-content">
        <div className="checkInForm-content-img">
          <img src={reservation.book.coverPictureUrl} />
        </div>
        <div>
          <div className="checkInForm-content-text-info-title">
            {reservation.book.title}
          </div>
          <div className="checkInForm-content-text-info-author">
            {reservation.book.author}
          </div>
          <div className="checkInForm-content-comment">
            <label>Review</label>
            <textarea placeholder="Leave a comment..." />
          </div>
        </div>
      </div>
      <div className="checkInForm-buttons">
        <button onClick={() => onCancel()}>Cancel</button>
        <button
          className="checkInForm-buttons-confirm"
          onClick={() => onConfirmClick()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
