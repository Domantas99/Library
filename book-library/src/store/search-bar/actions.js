import {
  GET_SEARCHED_BOOKS,
  GET_SEARCHED_BOOKS_END,
  RESET_SEARCHBAR,
} from "./actionTypes";

export const getSearchedBooks = (pattern) => ({
  type: GET_SEARCHED_BOOKS,
  payload: pattern,
});
export const searchedBooksLoaded = (books) => ({
  type: GET_SEARCHED_BOOKS_END,
  payload: books,
});

export const resetSearchbar = () => ({ type: RESET_SEARCHBAR });
