/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getUserApi = (id) => {
  return httpClient.get(`users/${id}`);
};
export const updateUserApi = (user) => {
  return httpClient.put('users', user);
};
