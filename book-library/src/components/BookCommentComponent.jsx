/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../store/comments/actions';
import Button, { BUTTON_APPEARANCE } from './Button';
import UserImage from './UserImage';

const BookCommentComponent = ({ data, page, pageSize }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteComment({ id: data.id, book: data.bookId, page, pageSize }));
  };

  const user = useSelector((state) => state.user.userData);
  return (
    <div className="comments__comment-wrapper">
      <UserImage url={data.pictureUrl} small />
      <div className="comments__comment">
        <h4>{data.userName}</h4>
        <span>{data.createdOn}</span>
        <p>{data.comment}</p>
        {(user.id === data.userId || user.isAdmin) && (
          <Button
            buttonAppearance={
              BUTTON_APPEARANCE.LINK |
              BUTTON_APPEARANCE.MINI |
              BUTTON_APPEARANCE.SQUARE
            }
            className="comments__delete"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        )}
      </div>
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
