import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/comments/actions';

export default ({ book }) => {
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState('');

  const handleDefaultClear = (event) => {
    if (!handleDefaultClear.fired) {
      handleDefaultClear.fired = true;
      event.target.value = '';
    }
  };

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment({ bookId: book, comment: commentText, createdBy: 1 }));
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
