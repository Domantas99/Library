import {
    GET_BOOK_LIST,
    GOT_BOOK_LIST
} from "./actionTypes";

export const getBookList = () => ({type: GET_BOOK_LIST});
export const gotBookList = (bookList) => ({type: GOT_BOOK_LIST, payload: bookList});