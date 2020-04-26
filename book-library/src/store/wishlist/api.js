/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getWishlist = () => {
    return httpClient.get('wishlist');
};

export const addWishAPI = (wishObj) => {
  return httpClient.post('books/add-wish', wishObj);
};
