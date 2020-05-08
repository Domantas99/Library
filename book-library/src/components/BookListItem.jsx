/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setVote, getVote } from '../store/wishlist/actions';
import Button from './Button';

export default ({ data, navigate }) => {
  const dispatch = useDispatch();
  const user = 1;
  const voteStates = useSelector((state) => state.wishlist.voteState);
  const voted = voteStates.find((x) => x.wishId === data.wishId);
  const history = useHistory();

  const createVoteObject = () => {
    return {
      UserId: user,
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
        <Button small dark={voted} onClick={handleClick}>
          {/* TODO fix the classes on this */}
          {data.votes}
        </Button>
      )}
    </div>
  );
};
