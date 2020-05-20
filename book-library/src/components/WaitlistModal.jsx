/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWaiting } from "../store/reservations/actions";

export default ({ waiting, closeModal }) => {
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.user.loggedInUserId);
  
  function onSubmit() {
    const obj = createWaitingObj();
    dispatch(addWaiting(obj));
    closeModal();
  }

  function createWaitingObj() {
    const today = new Date();

    return {
      Id: waiting.id || -1,
      UserId,
      CreatedOn: today,
      BookCase: {
        BookId: waiting.book.id,
        OfficeId: waiting.office,
        CreatedOn: today,
        CreatedBy: UserId,
      },
    };
  }

  return (
    <>
      <h2>Enter waitlist</h2>
      <div className="">
        <img src={waiting.book.coverPictureUrl} alt="" />
      </div>
      <div className="book-details__title">
        {waiting.book.title}
        <h4 className="text-secondary">
          <span className="text-underlined">{waiting.book.author}</span>
        </h4>
      </div>
      <p>There are no available copies at your office. Join a waiting list and get notified once the book becomes available</p>
      <button
        onClick={() => {
          closeModal();
        }}
      >
        Cancel
      </button>
      <button onClick={onSubmit} disabled={!waiting}>
        Join waitlist
      </button>
    </>
  );
};
