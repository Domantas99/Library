/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addWish } from '../store/wishlist/actions';
import Button from './Button';
import Panel from './Panel';

const WishForm = ({ exitAction }) => {
  const dispatch = useDispatch();
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    coverPictureUrl: '',
    publicationDate: '',
    comment: '',
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const onCancelClick = () => {
    exitAction();
  };

  const createBookWishObject = () => {
    return {
      Book: {
        Title: bookInfo.title,
        Author: bookInfo.author,
        CoverPictureUrl: bookInfo.coverPictureUrl,
        ReleaseDate: bookInfo.publicationDate,
      },
      CreatedOn: new Date(),
      Comment: bookInfo.comment,
    };
  };

  const onSubmitClick = () => {
    const wish = createBookWishObject();
    dispatch(addWish(wish));
    exitAction();
  };

  return (
    <Panel title="Add a new book request">
      <form noValidate onSubmit={onSubmitClick} className="form">
        <div className="form__field">
          <label htmlFor="bookTitle">TITLE</label>
          <input type="text" name="title" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form__field">
          <label htmlFor="bookTitle">AUTHOR</label>
          <input type="text" name="author" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form__field">
          <label htmlFor="bookTitle">COVER PICTURE URL</label>
          <input
            type="text"
            name="coverPictureUrl"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__field">
          <label htmlFor="bookDate">PUBLICATION DATE</label>
          <input type="date" name="publicationDate" onChange={handleChange} />
        </div>
        <div className="form__field">
          <label htmlFor="bookTitle">COMMENT</label>
          <textarea name="comment" cols="30" rows="5" onChange={handleChange} />
        </div>
        <div className="form__buttons">
          <Button secondary onClick={() => onCancelClick()}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Panel>
  );
};

WishForm.propTypes = {
  exitAction: PropTypes.func.isRequired,
};

export default WishForm;
