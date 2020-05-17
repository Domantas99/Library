/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getLatestBooksAPI = (numberOfBooks) => {
  return httpClient.get(`books/latest/${numberOfBooks}`);
};

export const getRecommendedBooksAPI = (details) => {
  return httpClient.get(
    `books/recommended/?userId=${details.userId}&count=${details.count}`
  );
};

export const getCurrentlyReadingBooksAPI = ({userId}) => {
  debugger
  return httpClient.get(`reservations/currently-reading/${userId}`);
};
