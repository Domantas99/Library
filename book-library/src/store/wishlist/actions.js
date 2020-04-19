import { GET_WISHLIST_START, GET_WISHLIST_END } from "./actionTypes";

export const getWishlist = () => ({ type: GET_WISHLIST_START });
export const getWishlistEnd = (wishlist) => ({
  type: GET_WISHLIST_END,
  payload: wishlist,
});
