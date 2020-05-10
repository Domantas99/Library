import { GET_USER, GET_USER_END, UPDATE_USER, UPDATE_USER_END } from './actionTypes';

export const getUser = (crediantials) => ({
  type: GET_USER,
  payload: crediantials,
});
export const getUserEnd = (userData) => ({
  type: GET_USER_END,
  payload: userData,
});
export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
export const updateUserEnd = (user) => ({
  type: UPDATE_USER_END,
  payload: user,
});
