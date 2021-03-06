import {
  GET_LATEST_BOOKS,
  GET_LATEST_BOOKS_END,
  GET_CURRENTLY_READING_BOOKS,
  GET_CURRENTLY_READING_BOOKS_END,
  GET_RECOMMENDED_BOOKS,
  GET_RECOMMENDED_BOOKS_END,
} from './actionTypes';

export const getLatestBooks = (numberOfBooks) => ({
  type: GET_LATEST_BOOKS,
  payload: numberOfBooks,
});
export const getLatestBooksEnd = (books) => ({
  type: GET_LATEST_BOOKS_END,
  payload: books,
});
export const getCurrentlyReadingBooks = () => ({
  type: GET_CURRENTLY_READING_BOOKS,
});
export const getCurrentlyReadingBooksEnd = (books) => ({
  type: GET_CURRENTLY_READING_BOOKS_END,
  payload: books,
});
export const getRecommendedBooks = (count) => ({
  type: GET_RECOMMENDED_BOOKS,
  payload: count,
});
export const getRecommendedBooksEnd = (books) => ({
  type: GET_RECOMMENDED_BOOKS_END,
  payload: books,
});
