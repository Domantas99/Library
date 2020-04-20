import {
    GET_BOOK_LIST_START,
    GET_BOOK_LIST_END,
    ADD_NEW_BOOK,
    ADD_NEW_BOOK_END,
    GET_BOOK_DETAILS,
    GET_BOOK_DETAILS_END
} from "./actionTypes";

export const getBookList = () => ({type: GET_BOOK_LIST_START});
export const getBookListEnd = (bookList) => ({type: GET_BOOK_LIST_END, payload: bookList});
export const addNewBook = (bookObj) => ({type: ADD_NEW_BOOK, payload: bookObj});
export const addNewBookEnd = (response) => ({type: ADD_NEW_BOOK_END, payload: response});
export const getBookDetails = (id) => ({type: GET_BOOK_DETAILS, payload: parseInt(id)});
export const getBookDetailsEnd = (details) => ({type: GET_BOOK_DETAILS_END, payload: details});
