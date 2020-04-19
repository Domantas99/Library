import { GET_SEARCHED_BOOKS, GET_SEARCHED_BOOKS_END } from "./actionTypes";

export const getSearchedBooks = (pattern) => ({
  type: GET_SEARCHED_BOOKS,
  payload: pattern,
});
export const searchedBooksLoaded = (books) => ({
  type: GET_SEARCHED_BOOKS_END,
  payload: books,
});
