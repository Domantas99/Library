/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import Button, { BUTTON_APPEARANCE } from './Button';

const CheckInForm = ({
  reservation,
  onCancel,
  onConfirm,
  reviewValue,
  reviewHandler,
}) => {
  function onConfirmClick() {
    onConfirm();
    reviewHandler(null);
  }

  return (
    <>
      <h2 className="reservation-modal__title">Check in</h2>
      <div className="reservation-modal">
        <div className="reservation-modal__image">
          <img src={reservation.book.coverPictureUrl} />
        </div>
        <div className="reservation-modal__content">
          <h3>{reservation.book.title}</h3>
          <h5 className="text-secondary">
            by{' '}
            <span className="text-underlined">{reservation.book.author}</span>
          </h5>
          <hr />
          {reviewHandler && (
            <>
              <h5 className="reservation-modal__section-title">Review</h5>
              <div className="form__field">
                <textarea
                  placeholder="Leave a comment..."
                  value={reviewValue}
                  onChange={(e) => reviewHandler(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="reservation-modal__buttons">
            <Button
              buttonAppearance={BUTTON_APPEARANCE.SMALL | BUTTON_APPEARANCE.CLEAR}
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              buttonAppearance={BUTTON_APPEARANCE.SMALL}
              onClick={() => onConfirmClick()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
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
