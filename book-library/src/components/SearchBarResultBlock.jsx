import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSearchbar } from '../store/search-bar/actions';

export default function SearchBarResultBlock({ book }) {
  const dispatch = useDispatch();
  return (
    <Link
      to={`/library/${book.id}`}
      className="suggestions__item"
      onClick={() => dispatch(resetSearchbar())}
    >
      <div className="suggestions__image">
        <img src={book.coverPictureUrl} alt="" />
      </div>
      <div className="suggestions__text">
        <span className="suggestions__text--primary">{book.title}</span>
        <span className="suggestions__text--secondary">{book.author}</span>
      </div>
    </Link>
  );
}
