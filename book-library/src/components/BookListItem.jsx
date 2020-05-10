/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setVote, getVote } from '../store/wishlist/actions';
import Modal from "../components/Modal";
import BookForm from "./BookForm";

export default ({ data, navigate, offices }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userData.id);
  const voteStates = useSelector((state) => state.wishlist.voteState);
  const voted = voteStates.find((x) => x.wishId === data.wishId);
  const history = useHistory();
  const [moveWishToBookModal, setMoveWishToBookModal] = useState(false)

  const createVoteObject = () => {
    return {
      UserId: userId,
      WishId: data.wishId,
    };
  };
  function handleClick() {
    const vote = createVoteObject();
    dispatch(setVote(vote));
  }
  useEffect(() => {
    dispatch(getVote(createVoteObject()));
  }, []);

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
        <span className="book__title">{data.title}</span>
        <span className="book__author">{data.author}</span>
      </div>
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
          <button //TODO This and the next should be updated to the new Button component.
            style={voted ? { backgroundColor: "#4568FB" } : {}}
            onClick={handleClick}
          >
            {data.votes}
          </button>
          <button onClick={()=> setMoveWishToBookModal(true)}>Move</button>
         </div>
      )}
    </div>
  );
};
