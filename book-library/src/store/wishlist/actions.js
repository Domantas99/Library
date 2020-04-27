import {
  GET_WISHLIST_START,
  GET_WISHLIST_END,
  ADD_WISH,
  ADD_WISH_END,
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
