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
  url: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

UserImage.defaultProps = {
  small: false,
};

export default UserImage;
