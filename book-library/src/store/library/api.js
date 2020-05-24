/* eslint-disable import/no-cycle */
import httpClient from '../../core/httpClient';
import { paramGenerator } from '../../utilities';

export const addBookAPI = (bookObj) => {
  return httpClient.post('books', bookObj);
};

export const deleteBookApi = (id) => {
  return httpClient.delete(`books/${id}`);
};

export const getBookAvailabilityAPI = (id) => {
  return httpClient.get(`books/${id}/availability`);
};

export const getBookDetails = (bookId) => {
  return httpClient.get(`books/book-details/${bookId}`);
};

export const getBookList = (data) => {
  let url = 'books?';
  if (data.params) {
    url += `${paramGenerator(data.params)}`;
  }
  return httpClient.get(url);
};

export const getAuthors = () => {
  return httpClient.get('books/authors');
};

export const getCategories = () => {
  return httpClient.get('books/categories');
};

export const rateBook = ({ bookId, rating }) => {
  return httpClient.post(`books/${bookId}/rate?rating=${rating}`);
};

export const setBookArchiveStatusAPI = (data) => {
  return httpClient.post(
    `books/archive-book/?bookId=${data.bookId}&status=${data.status}`
  );
};

export const updateBook = (data) => {
  return httpClient.put(`books/${data.id}`, data.book);
};
