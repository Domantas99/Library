/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../store/comments/actions';
import Button from './Button';

const BookCommentComponent = ({ data, page, pageSize }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteComment({ id: data.id, book: data.bookId, page, pageSize }));
  };

  const user = useSelector((state) => state.user.userData);
  return (
    <div>
      <img src={data.pictureUrl} />
      <span>{data.userName}</span>
      <span>{data.createdOn}</span>
      {(user.id === data.userId || user.isAdmin) && (
        <Button onClick={handleDeleteClick}>Delete comment</Button>
      )}
      <p>{data.comment}</p>
    </div>
  );
};

BookCommentComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    bookId: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default BookCommentComponent;
