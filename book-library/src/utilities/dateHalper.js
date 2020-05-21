/* eslint-disable import/prefer-default-export */
import moment from 'moment';

export const formatDate = (date) => {
  return date ? moment(date).format('YYYY-MM-DD') : '';
};
