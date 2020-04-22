/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

export default ({ data }) => (
  <Link to={`/library/${data.id}`} className="book" id={`book-${data.id}`}>
    <div className="book__image">
      <img src="https://picsum.photos/200/300?random=1" alt="" />
    </div>
    <span className="book__title">{data.title}</span>
    <span className="book__author">{data.author}</span>
  </Link>
);
