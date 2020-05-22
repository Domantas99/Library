/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getOfficesAPI = () => {
  return httpClient.get('offices');
};
