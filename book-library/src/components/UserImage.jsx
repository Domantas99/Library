/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const UserImage = ({ url, small, big }) => {
  const classes = classNames('user__image', {
    'user__image--small': small,
    'user__image--big': big,
  });

  return (
    <div className={classes}>
      <img src={url} alt="" />
    </div>
  );
};

UserImage.propTypes = {
  url: PropTypes.string,
  small: PropTypes.bool,
  big: PropTypes.bool,
};

UserImage.defaultProps = {
  url: null, // Could do a placeholder image here, no?
  small: false,
  big: false,
};

export default UserImage;
