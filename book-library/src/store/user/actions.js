import { GET_USER, GET_USER_END } from "./actionTypes";

export const getUser = (crediantials) => ({
  type: GET_USER,
  payload: crediantials,
});
export const getUserEnd = (userData) => ({
  type: GET_USER_END,
  payload: userData,
});
