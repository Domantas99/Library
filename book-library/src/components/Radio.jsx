/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

// eslint-disable-next-line react/prop-types
const RadioButton = ({ title = null, name, onClick, disabled = false }) => (
  <label className="form__input form__radio">
    {title}
    <input type="radio" name={name} onClick={onClick} disabled={disabled} />
    <span className="fake" />
  </label>
);

export default RadioButton;
