/* eslint-disable import/prefer-default-export */
import moment from 'moment';

export const formatDate = (date) => {
  return date ? moment(date).format('YYYY-MM-DD') : '';
};

export const formatDateTime = (date) => {
  return date ? moment(date).format('YYYY-MM-DD h:mm:ss') : '';
};

export const isDate = (date) => {
  return date ? moment(date).isValid() : false;
};
