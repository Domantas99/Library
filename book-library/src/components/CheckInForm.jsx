/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';

const CheckInForm = ({
  reservation,
  onCancel,
  onConfirm,
  reviewValue,
  reviewHandler,
}) => {
  function onConfirmClick() {
    onConfirm();
    if (reviewHandler)
      reviewHandler(null);
  }

  return (
    <div className="checkInForm">
      <h2>Check in</h2>
      <div className="checkInForm-content">
        <div className="checkInForm-content-img">
          <img src={reservation.book.coverPictureUrl} />
        </div>
        <div>
          <div className="checkInForm-content-text-info-title">
            {reservation.book.title}
          </div>
          <div className="checkInForm-content-text-info-author">
            {reservation.book.author}
          </div>
          {reviewHandler && (
            <div className="checkInForm-content-comment">
              <label>Review</label>
              <textarea
                placeholder="Leave a comment..."
                value={reviewValue}
                onChange={(e) => reviewHandler(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="checkInForm-buttons">
        <button onClick={() => onCancel()}>Cancel</button>
        <button
          className="checkInForm-buttons-confirm"
          onClick={() => onConfirmClick()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

CheckInForm.propTypes = {
  reservation: PropTypes.shape({
    book: PropTypes.shape({
      coverPictureUrl: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
    }),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  reviewValue: PropTypes.string,
  reviewHandler: PropTypes.func,
};

CheckInForm.defaultProps = {
  reviewValue: '',
  reviewHandler: null,
};

export default CheckInForm;
