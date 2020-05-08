import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
  secondary,
  dark,
  clear,
  small,
  mini,
  onClick,
  wide,
  children,
  secondaryAction,
  disabled,
}) => {
  const classes = classNames('btn', {
    btn__secondary: secondary || secondaryAction,
    btn__clear: clear,
    btn__small: small,
    btn__wide: wide,
    btn__dark: dark,
    btn__mini: mini,
    'btn__secondary--action': secondaryAction,
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  secondary: PropTypes.bool,
  clear: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
  wide: PropTypes.bool,
  dark: PropTypes.bool,
  mini: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  secondaryAction: PropTypes.bool,
};

Button.defaultProps = {
  secondary: false,
  secondaryAction: false,
  clear: false,
  small: false,
  wide: false,
  dark: false,
  mini: false,
  disabled: false,
  onClick: () => {},
  children: null,
};

export default Button;
