import {
    GET_BOOK_LIST_START,
    GET_BOOK_LIST_END,
    GET_BOOK_DETAILS_START,
    GET_BOOK_DETAILS_END
} from "./actionTypes";

export const getBookList = () => ({type: GET_BOOK_LIST_START});
export const getBookListEnd = (bookList) => ({type: GET_BOOK_LIST_END, payload: bookList});

export const getBookDetails = (id) => ({type: GET_BOOK_DETAILS_START, payload: parseInt(id)});
export const getBookDetailsEnd = (details) => ({type: GET_BOOK_DETAILS_END, payload: details});