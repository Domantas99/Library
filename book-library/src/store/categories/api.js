/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getCategoriesAPI = () => {
  return httpClient.get("books/categories");
};
