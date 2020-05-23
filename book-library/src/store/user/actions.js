import {
  GET_USER,
  GET_USER_END,
  UPDATE_USER,
  UPDATE_USER_END,
  LOGIN,
} from './actionTypes';

export const getUser = () => ({
  type: GET_USER,
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
export const login = () => ({
  type: LOGIN,
  payload: {
    email: 'admin@library.com',
    password: 'Password1!',
  },
});
