/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getUserApi = () => {
  return httpClient.get(`users`);
};
export const updateUserApi = (user) => {
  return httpClient.put('users', user);
};
export const login = (loginInfo) => {
  return httpClient.post('auth/login', loginInfo);
};
export const registrationApi = (userData) => {
  return httpClient.post('auth/register', userData);
};
export const logoutApi = () => {
  return httpClient.post('auth/logout');
};
export const pingAuthApi = () => {
  return httpClient.get('auth');
};
