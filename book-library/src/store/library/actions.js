import {
  GET_BOOK_LIST_START,
  GET_BOOK_LIST_END,
  ADD_NEW_BOOK,
  ADD_NEW_BOOK_END,
  GET_BOOK_DETAILS_START,
  GET_BOOK_DETAILS_END,
  GET_BOOK_AVAILABILITY,
  GET_BOOK_AVAILABILITY_END,
  DELETE_BOOK,
  DELETE_BOOK_END,
  UPDATE_BOOK,
  UPDATE_BOOK_END,
  SET_FILTERS_START,
  SET_FILTERS_END,
  GET_CATEGORIES_START,
  GET_CATEGORIES_END,
  SELECT_CATEGORY,
  GET_AUTHORS_START,
  GET_AUTHORS_END,
} from './actionTypes';

export const getBookList = (params) => ({
  type: GET_BOOK_LIST_START,
  payload: params,
});
export const getBookListEnd = (bookList) => ({
  type: GET_BOOK_LIST_END,
  payload: bookList,
});
export const addNewBook = (bookObj) => ({
  type: ADD_NEW_BOOK,
  payload: bookObj,
});
export const addNewBookEnd = (response) => ({
  type: ADD_NEW_BOOK_END,
  payload: response,
});
export const getBookDetails = (bookId, userId) => ({
  type: GET_BOOK_DETAILS_START,
  payload: { bookId, userId },
});
export const getBookDetailsEnd = (details) => ({
  type: GET_BOOK_DETAILS_END,
  payload: details,
});
export const getBookAvailability = (id) => ({
  type: GET_BOOK_AVAILABILITY,
  payload: +id,
});
export const getBookAvailabilityEnd = (availabilityDetails) => ({
  type: GET_BOOK_AVAILABILITY_END,
  payload: availabilityDetails,
});
export const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  payload: bookId,
});
export const deleteBookEnd = (deletedBook) => ({
  type: DELETE_BOOK_END,
  payload: deletedBook,
});

export const updateBook = (id, book) => ({
  type: UPDATE_BOOK,
  payload: { id, book },
});
export const updateBookEnd = (book) => ({
  type: UPDATE_BOOK_END,
  payload: book,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS_START,
  payload: filters,
});

export const setFiltersEnd = (filters) => ({
  type: SET_FILTERS_END,
  payload: filters,
});

export const getCategories = () => ({ type: GET_CATEGORIES_START });

export const getCategoriesEnd = (categories) => ({
  type: GET_CATEGORIES_END,
  payload: categories,
});

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category,
});

export const getAuthors = () => ({
  type: GET_AUTHORS_START,
});

export const getAuthorsEnd = (authors) => ({
  type: GET_AUTHORS_END,
  payload: authors,
});