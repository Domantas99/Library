/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getLatestBooksAPI = (numberOfBooks) => {
  return httpClient.get(`books/latest/${numberOfBooks}`);
};
