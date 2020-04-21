import { GET_LATEST_BOOKS, GET_LATEST_BOOKS_END } from "./actionTypes";

export const getLatestBooks = (numberOfBooks) => ({
  type: GET_LATEST_BOOKS,
  payload: numberOfBooks,
});
export const getLatestBooksEnd = (details) => ({
  type: GET_LATEST_BOOKS_END,
  payload: details,
});
