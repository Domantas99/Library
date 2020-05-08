import React from 'react';

// eslint-disable-next-line react/prop-types
const RadioButton = ({ title, name, onClick, disabled }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className="form__input form__radio">
    {title}
    <input type="radio" name={name} onClick={onClick} disabled={disabled} />
    <span className="fake" />
  </label>
);

export default RadioButton;
