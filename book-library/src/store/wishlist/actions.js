import {
  GET_WISHLIST_START,
  GET_WISHLIST_END,
  SET_WISHLIST_MODAL,
} from "./actionTypes";

export const getWishlist = () => ({ type: GET_WISHLIST_START });
export const getWishlistEnd = (wishlist) => ({
  type: GET_WISHLIST_END,
  payload: wishlist,
});
export const setWishlistModal = (state) => ({
  type: SET_WISHLIST_MODAL,
  payload: state,
});
