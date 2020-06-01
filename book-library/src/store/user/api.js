/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getUserApi = () => {
  return httpClient.get(`users`);
};

export const getUserList = () => {
  return httpClient.get(`users/list`);
};

export const login = (loginInfo) => {
  return httpClient.post('auth/login', loginInfo);
};

export const logoutApi = () => {
  return httpClient.post('auth/logout');
};

export const pingAuthApi = () => {
  return httpClient.get('auth');
};

export const registrationApi = (userData) => {
  return httpClient.post('auth/register', userData);
};

export const updateUserApi = (user) => {
  return httpClient.put('users', user);
};
