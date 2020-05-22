/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';
import { paramGenerator } from '../../utilities';

export const getWishlist = (params) => {
  let url = 'wishlist';
  if (params) {
    url += `?${paramGenerator(params)}`;
  }
  return httpClient.get(url);
};

export const addWishAPI = (wishObj) => {
  return httpClient.post('wishlist/add', wishObj);
};

export const setVoteAPI = (wishId) => {
  return httpClient.post(`wishlist/vote/${wishId}`);
};

export const moveWishToLibraryAPI = (book) => {
  return httpClient.post('wishlist/move-to-library', book);
};

export const getCategories = () => {
  return httpClient.get('wishlist/categories');
};

export const getAuthors = () => {
  return httpClient.get('wishlist/authors');
};
