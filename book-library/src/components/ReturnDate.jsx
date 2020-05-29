/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utilities/dateHalper';

export default function ReturnDate({ date, validate }) {
  const today = formatDate(new Date());
  const myDate = formatDate(date);
  const color =
    validate === true
      ? today === myDate
        ? 'today'
        : today < myDate
        ? 'future'
        : 'late'
      : '';

  return <span className={color}>{myDate}</span>;
}

ReturnDate.propTypes = {
  date: PropTypes.string.isRequired,
  validate: PropTypes.bool.isRequired,
};
