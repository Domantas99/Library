import {
  GET_USER,
  GET_USER_END,
  UPDATE_USER,
  UPDATE_USER_END,
  LOGIN,
  LOGIN_END,
  LOGOUT,
  REGISTER,
  REGISTER_END,
  PING_AUTH,
  PING_AUTH_END,
  PING_AUTH_ERROR,
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
export const login = (credentials) => ({
  type: LOGIN,
  payload: credentials,
});
export const loginEnd = (response) => ({
  type: LOGIN_END,
  payload: response,
});
export const register = (userInfo) => ({
  type: REGISTER,
  payload: userInfo,
});
export const registerEnd = (response) => ({
  type: REGISTER_END,
  payload: response,
});
export const logOut = () => ({
  type: LOGOUT,
});
export const isAuth = () => ({
  type: PING_AUTH,
});
export const isAuthEnd = () => ({
  type: PING_AUTH_END,
});
export const authError = () => ({
  type: PING_AUTH_ERROR,
});
