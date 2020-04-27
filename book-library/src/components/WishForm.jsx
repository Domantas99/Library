/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setWishlistModal, addWish } from "../store/wishlist/actions";

export default function WishForm({exitAction}) {
  const dispatch = useDispatch();
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    coverPictureUrl: "",
    publicationDate: "",
    comment: "",
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
        DateAdded: new Date(),
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
    <div className="wishform">
      <div>
        <h1>Add a new book request</h1>
      </div>
      <div>
        <div className="input-wrapper">
          <label htmlFor="bookTitle">TITLE</label>
          <br />
          <input type="text" name="title" onChange={(e) => handleChange(e)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="bookTitle">AUTHOR</label>
          <br />
          <input type="text" name="author" onChange={(e) => handleChange(e)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="bookTitle">COVER PICTURE URL</label>
          <br />
          <input
            type="text"
            name="coverPictureUrl"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="bookDate">PUBLICATION DATE</label>
          <br />
          <input type="date" name="publicationDate" onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="bookTitle">COMMENT</label>
          <br />
          <textarea
            name="comment"
            cols="30"
            rows="10"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="wishform-buttons">
        <div>
          <button onClick={() => onCancelClick()}>Cancel</button>
        </div>
        <div>
          <button
            onClick={() => onSubmitClick()}
            className="wishform-buttons-submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
