/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

export default ({ data, navigate, renderActions }) => {
  const history = useHistory();

  const availableClass = classNames('book-status__text', {
    'book-status__text--available': data.isAvailableInMyOffice,
    'book-status__text--unavailable': !data.isAvailableInMyOffice,
  });

  const bookClass = classNames('book', {
    'book--navigable': navigate,
  });

  const generateRatingStars = useCallback(() => {
    const stars = [];
    let i = 1;
    for (; i <= Math.floor(data.rating); i += 1) {
      stars.push(<img key={i} className="rating__star" />);
    }
    if (data.rating % 1 > 0.25) {
      if (data.rating % 1 < 0.75) {
        stars.push(<img key={i} className="rating__star_half" />);
      } else {
        stars.push(<img key={i} className="rating_star" />);
      }
      i += 1;
    }
    for (; i <= 5; i += 1) {
      stars.push(<img key={i} className="rating__star_empty" />);
    }
    return stars;
  }, [data]);

  return (
    <div>
      <div
        onClick={() => navigate && history.push(`/library/${data.id}`)}
        className={bookClass}
        id={`book-${data.id}`}
      >
        <div className="book__image">
          <img src={data.coverPictureUrl} alt="" />
        </div>
        <span className="book__title">
          {(data.isArchived === true ? '[Archived]' : '') + data.title}
        </span>
        <span className="book__author">{data.author}</span>
      </div>
      <span className="book__rating">
        {data.rating > 0 ? (
          <>
            {generateRatingStars()}
            {data.rating.toFixed(2)}
          </>
        ) : (
          'No rating available'
        )}
      </span>
      <div className={availableClass}>
        {typeof data.isAvailableInMyOffice !== 'undefined' &&
          (data.isAvailableInMyOffice ? `Available` : 'Currently unavailable')}
      </div>
      {renderActions(data)}
    </div>
  );
};
