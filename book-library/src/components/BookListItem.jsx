/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Modal from './Modal';
import BookForm from './BookForm';

export default ({ data, navigate, offices, renderActions }) => {
  const history = useHistory();
  const [moveWishToBookModal, setMoveWishToBookModal] = useState(false);

  const availableClass = classNames('book-status__text', {
    'book-status__text--available': data.isAvailableInMyOffice,
    'book-status__text--unavailable': !data.isAvailableInMyOffice,
  });

  return (
    <div>
      <div
        onClick={() => navigate && history.push(`/library/${data.id}`)}
        className="book"
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
      <div className={availableClass}>
        {typeof data.isAvailableInMyOffice !== 'undefined' &&
          (data.isAvailableInMyOffice ? `Available` : 'Currently unavailable')}
      </div>
      {renderActions(data)}
      {data.votes !== undefined && (
        <div>
          <Modal
            modalState={moveWishToBookModal}
            exitAction={() => setMoveWishToBookModal(false)}
          >
            <BookForm
              formTitle="Add wish to library"
              bookDetails={data}
              id={data.wishId}
              offices={offices}
              moveToWishAction={() => setMoveWishToBookModal(false)}
            />
          </Modal>

          <button onClick={() => setMoveWishToBookModal(true)}>Move</button>
        </div>
      )}
    </div>
  );
};
