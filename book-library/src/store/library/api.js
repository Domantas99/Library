import httpClient from "../../core/httpClient";

export const addBookAPI = (bookObj) => {
  return httpClient.post("books", bookObj);
};

export const getBookList = (category) => {
  let url = "books";
  if (category) {
    url += `?category=${category}`;
  }
  return httpClient.get(url);
};

export const getBookDetails = (ids) => {
  return httpClient.get(
    `books/book-details/?bookId=${ids.bookId}&userId=${ids.userId}`
  );
};

export const getBookAvailabilityAPI = (id) => {
  return httpClient.get(`books/${id}/availability`);
};

export const deleteBookApi = (id) => {
  return httpClient.delete(`books/${id}`);
};

export const updateBook = (data) => {
  return httpClient.put(`books/${data.id}`, data.book);
};
