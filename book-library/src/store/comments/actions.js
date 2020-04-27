import {
  GET_COMMENTS_START,
  GET_COMMENTS_END,
  GET_BOOK_COMMENTS_START,
  GET_BOOK_COMMENTS_END,
  ADD_COMMENT_START,
  ADD_COMMENT_END,
} from "./actionTypes";

export const getComments = () => ({ type: GET_COMMENTS_START });
export const getCommentsEnd = (comments) => ({
  type: GET_COMMENTS_END,
  payload: comments,
});

export const getBookComments = (book) => ({
  type: GET_BOOK_COMMENTS_START,
  payload: book,
});
export const getBookCommentsEnd = (comments) => ({
  type: GET_BOOK_COMMENTS_END,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT_START,
  payload: comment,
});
export const addCommentEnd = (response) => ({
  type: ADD_COMMENT_END,
  payload: response,
});
