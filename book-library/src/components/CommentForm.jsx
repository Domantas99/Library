import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../store/comments/actions';

const CommentForm = ({ book, page, pageSize }) => {
  const dispatch = useDispatch();

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
    <form id="comment-form" onSubmit={handleSubmit}>
      <textarea
        defaultValue="Leave a comment"
        onFocus={handleDefaultClear}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" disabled={!commentText} />
    </form>
  );
};

CommentForm.propTypes = {
  book: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default CommentForm;
