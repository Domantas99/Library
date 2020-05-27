import {
  DELETE_COMMENT,
  DELETE_COMMENT_END,
  GET_COMMENTS_START,
  GET_COMMENTS_END,
  GET_BOOK_COMMENTS_START,
  GET_BOOK_COMMENTS_END,
  ADD_COMMENT_START,
  ADD_COMMENT_END,
} from './actionTypes';

export const addComment = ({ book, comment, page, pageSize }) => ({
  type: ADD_COMMENT_START,
  payload: { book, comment, page, pageSize },
});
export const addCommentEnd = ({ book, page, pageSize }) => ({
  type: ADD_COMMENT_END,
  payload: { book, page, pageSize },
});

export const deleteComment = ({ id, book, page, pageSize }) => ({
  type: DELETE_COMMENT,
  payload: { id, book, page, pageSize },
});

export const deleteCommentEnd = ({ book, page, pageSize }) => ({
  type: DELETE_COMMENT_END,
  payload: { book, page, pageSize },
});

export const getComments = () => ({ type: GET_COMMENTS_START });
export const getCommentsEnd = (comments) => ({
  type: GET_COMMENTS_END,
  payload: comments,
});

export const getBookComments = ({ book, page, pageSize }) => ({
  type: GET_BOOK_COMMENTS_START,
  payload: { book, page, pageSize },
});
export const getBookCommentsEnd = (comments) => ({
  type: GET_BOOK_COMMENTS_END,
  payload: comments,
});
