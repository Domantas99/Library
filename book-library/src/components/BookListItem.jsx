/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setVote, getVote } from "../store/wishlist/actions";
import Modal from "../components/Modal";
import BookForm from "./BookForm";
import classNames from 'classnames';

export default ({ data, navigate, offices, renderActions }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.loggedInUserId);
  const voteStates = useSelector((state) => state.wishlist.voteState);
  const voted = voteStates.find((x) => x.wishId === data.wishId);
  const history = useHistory();
  const [moveWishToBookModal, setMoveWishToBookModal] = useState(false)

  const createVoteObject = useCallback(() => {
    return {
      UserId: userId,
      WishId: data.wishId,
    };
  },[userId, data]);

  const availableClass = classNames('book-status__text', {
    'book-status__text--available': data.isAvailableInMyOffice,
    'book-status__text--unavailable': !data.isAvailableInMyOffice,
  });

  return (
    <div>
      <div
        onClick={() => navigate && history.push(`/library/${data.id}`)}
        className="book"
        id={`book-${data.id}`}
      >
        <div className="book__image">
          <img src={data.coverPictureUrl} alt="" />
        </div>
  <span className="book__title">{(data.isArchived===true ? "[Archived]": "") + data.title}</span>
        <span className="book__author">{data.author}</span>
      </div>
      <div className={availableClass}>
      {typeof data.isAvailableInMyOffice !== 'undefined' && (data.isAvailableInMyOffice ? `Available` : 'Currently unavailable')}
      </div>
      {renderActions(data)}
      {data.votes !== undefined && (
        <div>
          <Modal
           modalState={moveWishToBookModal}
           exitAction={()=> setMoveWishToBookModal(false)}
          >
            <BookForm formTitle="Add wish to library"
              bookDetails={data}
              id={data.wishId}
              offices={offices}
              moveToWishAction={()=>setMoveWishToBookModal(false)}
            ></BookForm>
          </Modal>

          <button onClick={()=> setMoveWishToBookModal(true)}>Move</button>
         </div>
      )}
    </div>
  );
};
