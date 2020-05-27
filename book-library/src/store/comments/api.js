/* eslint-disable import/no-cycle */
import httpClient from '../../core/httpClient';

export const deleteComment = (id) => {
  return httpClient.delete(`comments/${id}`);
};

export const getComments = () => {
  return httpClient.get('comments');
};

export const getBookComments = ({ book, page, pageSize }) => {
  return httpClient.get(
    `books/${book}/comments/?page=${page}&pageSize=${pageSize}`
  );
};

export const addComment = ({ bookId, comment }) => {
  return httpClient.post('comments', { bookId, comment });
};
