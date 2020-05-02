/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVote, getVote } from "../store/wishlist/actions";
import { useEffect } from "react";

export default ({ data }) => {
  const dispatch = useDispatch();
  const user = 1;
  const voteStates = useSelector((state) => state.wishlist.voteState);
  const voted = voteStates.find(x => x.wishId === data.wishId);

  const createVoteObject = () => {
    return {
        UserId: user,
        WishId: data.wishId,
      };
  };
  function handleClick(){
    const vote = createVoteObject();
    dispatch(setVote(vote));
  }
  useEffect(() => {
    dispatch(getVote(createVoteObject()));
  });

  return (
  <div>
  <Link to={`/library/${data.id}`} className="book" id={`book-${data.id}`}>
    <div className="book__image">
      <img src={data.coverPictureUrl} alt="" />
    </div>
    <span className="book__title">{data.title}</span>
    <span className="book__author">{data.author}</span>
  </Link>
  {data.votes !== undefined && <button style={voted ? {backgroundColor: '#4568FB'}:{}} onClick={handleClick}>{data.votes}</button>}
  </div>
  );
  };
