import {
  GET_BOOK_LIST_START,
  GET_BOOK_LIST_END,
  ADD_NEW_BOOK,
  ADD_NEW_BOOK_END,
  GET_BOOK_DETAILS_START,
  GET_BOOK_DETAILS_END,
  GET_BOOK_AVAILABILITY,
  GET_BOOK_AVAILABILITY_END,
  SET_CONFIRMATION_MODAL,
} from "./actionTypes";

export const getBookList = () => ({ type: GET_BOOK_LIST_START });
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
export const getBookDetails = (id) => ({
  type: GET_BOOK_DETAILS_START,
  payload: +id,
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
export const setConfirmationModal = (modalState) => ({
  type: SET_CONFIRMATION_MODAL,
  payload: modalState,
});
