/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getSeachedBooksAPI = (pattern) => {
  return httpClient.get(`books/filter/${pattern}`);
};
