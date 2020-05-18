import httpClient from '../../core/httpClient';
import { paramGenerator } from '../../utilities';

export const addBookAPI = (bookObj) => {
  return httpClient.post('books', bookObj);
};

export const getBookList = (params) => {
  let url = 'books';
  if (params) {
    url += `?${paramGenerator(params)}`;
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

export const getCategories = () => {
  return httpClient.get('books/categories');
};

export const getAuthors = () => {
  return httpClient.get('books/authors');
}

export const setBookArchiveStatusAPI = (data) => {
  return httpClient.get(`books/archive-book/?bookId=${data.bookId}&status=${data.status}`);
}
