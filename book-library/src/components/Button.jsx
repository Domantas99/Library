/* eslint-disable react/button-has-type,no-bitwise */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const BUTTON_APPEARANCE = {
  SECONDARY: 1,
  ACTION: 1 << 2,
  DARK: 1 << 3,
  CLEAR: 1 << 4,
  SMALL: 1 << 5,
  MINI: 1 << 6,
  WIDE: 1 << 7,
  SQUARE: 1 << 8,
  LINK: 1 << 9,
  DANGER: 1 << 10,
  ROUND: 1 << 11,
  HEAVY: 1 << 12,
};

const Button = ({ ref, buttonAppearance, onClick, children, disabled, type }) => {
  const classes = classNames('btn', {
    btn__secondary: buttonAppearance & BUTTON_APPEARANCE.SECONDARY,
    btn__clear: buttonAppearance & BUTTON_APPEARANCE.CLEAR,
    btn__small: buttonAppearance & BUTTON_APPEARANCE.SMALL,
    btn__wide: buttonAppearance & BUTTON_APPEARANCE.WIDE,
    btn__dark: buttonAppearance & BUTTON_APPEARANCE.DARK,
    btn__mini: buttonAppearance & BUTTON_APPEARANCE.MINI,
    btn__square: buttonAppearance & BUTTON_APPEARANCE.SQUARE,
    btn__link: buttonAppearance & BUTTON_APPEARANCE.LINK,
    btn__danger: buttonAppearance & BUTTON_APPEARANCE.DANGER,
    btn__round: buttonAppearance & BUTTON_APPEARANCE.ROUND,
    btn__heavy: buttonAppearance & BUTTON_APPEARANCE.HEAVY,
    'btn__secondary--action':
      buttonAppearance & BUTTON_APPEARANCE.ACTION &&
      buttonAppearance & BUTTON_APPEARANCE.SECONDARY,
  });

  return (
    <button
      ref={ref}
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  buttonAppearance: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  buttonAppearance: 0,
  disabled: false,
  onClick: () => {},
  children: null,
  type: 'button',
};

export default Button;
