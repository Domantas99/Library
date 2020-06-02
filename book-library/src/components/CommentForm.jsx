import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../store/comments/actions';
import Button, { BUTTON_APPEARANCE } from './Button';
import UserImage from './UserImage';

const CommentForm = ({ book, page, pageSize }) => {
  const dispatch = useDispatch();

  const userImageUrl = useSelector(state => state.user.userData.profilePictureUrl);

  const [commentText, setCommentText] = useState('');

  const handleDefaultClear = (event) => {
    if (!handleDefaultClear.fired) {
      handleDefaultClear.fired = true;
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment({ book, comment: commentText, page, pageSize }));
    document.getElementById('comment-form').reset();
    handleChange.fired = false;
    setCommentText('');
  };

  return (
    <form id="comment-form" className="comments__form" onSubmit={handleSubmit}>
      <UserImage url={userImageUrl} small />
      <textarea
        className="comments__input"
        defaultValue="Leave a comment"
        onFocus={handleDefaultClear}
        onChange={handleChange}
      />
      <Button
        buttonAppearance={BUTTON_APPEARANCE.SQUARE}
        type="submit"
        disabled={!commentText}
      >
        <i className="btn__icon btn__icon--send" />
      </Button>
    </form>
  );
};

CommentForm.propTypes = {
  book: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default CommentForm;
