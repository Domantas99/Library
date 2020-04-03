import {
    GET_BOOK_LIST_START,
    GET_BOOK_LIST_END
} from "./actionTypes";

export const getBookList = () => ({type: GET_BOOK_LIST_START});
export const getBookListEnd = (bookList) => ({type: GET_BOOK_LIST_END, payload: bookList});