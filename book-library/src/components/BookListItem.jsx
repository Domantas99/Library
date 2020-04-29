/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";

export default ({ data, navigate }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => navigate && history.push(`/library/${data.id}`)}
      className="book"
      id={`book-${data.id}`}
    >
      <div className="book__image">
        <img src={data.coverPictureUrl} alt="" />
      </div>
      <span className="book__title">{data.title}</span>
      <span className="book__author">{data.author}</span>
    </div>
  );
};
