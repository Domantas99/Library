/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getWishlist = () => {
  return httpClient.get('wishlist');
};

export const addWishAPI = (wishObj) => {
  return httpClient.post('wishlist/add', wishObj);
};

export const setVoteAPI = (vote) => {
  return httpClient.post('wishlist/vote', vote);
};

export const getVoteAPI = (vote) => {
  return httpClient.get(
    `wishlist/vote/?userId=${vote.UserId}&wishId=${vote.WishId}`
  );
};

export const moveWishToLibraryAPI = (book) => {
  return httpClient.post("wishlist/move-to-library", book);
};
