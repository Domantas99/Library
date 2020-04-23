import httpClient from "../../core/httpClient";

export const addBookAPI = (bookObj) => {
  return httpClient.post("books", bookObj);
};

export const getBookList = () => {
  return httpClient.get("books");
};

export const getBookDetails = (id) => {
  return httpClient.get(`books/${id}`);
};

export const getBookAvailabilityAPI = (id) => {
  return httpClient.get(`books/${id}/availability`);
};
