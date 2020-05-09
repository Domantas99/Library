import {
  GET_WISHLIST_START,
  GET_WISHLIST_END,
  ADD_WISH,
  ADD_WISH_END,
  SET_VOTE,
  SET_VOTE_END,
  GET_VOTE,
  GET_VOTE_END,
  MOVE_WISH_TO_LIBRARY,
  MOVE_WISH_TO_LIBRARY_END
} from "./actionTypes";

export const getWishlist = () => ({ type: GET_WISHLIST_START });
export const getWishlistEnd = (wishlist) => ({
  type: GET_WISHLIST_END,
  payload: wishlist,
});
export const addWish = (bookWish) => ({
  type: ADD_WISH,
  payload: bookWish,
});
export const addWishEnd = (bookWish) => ({
  type: ADD_WISH_END,
  payload: bookWish,
});
export const setVote = (vote) => ({
  type: SET_VOTE,
  payload: vote,
});
export const setVoteEnd = (vote) => ({
  type: SET_VOTE_END,
  payload: vote,
});
export const getVote = (vote) => ({
  type: GET_VOTE,
  payload: vote,
});
export const getVoteEnd = (vote) => ({
  type: GET_VOTE_END,
  payload: vote,
});
export const moveWishToLibrary = (book) => ({
  type: MOVE_WISH_TO_LIBRARY,
  payload: book,
});
export const moveWishToLibraryEnd = (book) => ({
  type: MOVE_WISH_TO_LIBRARY_END,
  payload: book,
});
