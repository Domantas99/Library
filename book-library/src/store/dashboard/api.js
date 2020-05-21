/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getLatestBooksAPI = (data) => {
  return httpClient.get(`books/latest/${data.numberOfBooks}?userOffice=${data.userOffice}`);
};

export const getRecommendedBooksAPI = (details) => {
  return httpClient.get(
    `books/recommended/?userId=${details.userId}&count=${details.count}`
  );
};

export const getCurrentlyReadingBooksAPI = ({userId}) => {
  return httpClient.get(`reservations/currently-reading/${userId}`);
};
