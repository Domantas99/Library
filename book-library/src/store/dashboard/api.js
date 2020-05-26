/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getLatestBooksAPI = (numberOfBooks) => {
  return httpClient.get(`books/latest/${numberOfBooks}`);
};

export const getRecommendedBooksAPI = (count) => {
  return httpClient.get(`books/recommended/?count=${count}`);
};

export const getCurrentlyReadingBooksAPI = () => {
  return httpClient.get('reservations/currently-reading/');
};
