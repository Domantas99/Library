import { DISPLAY_TOAST, ADD_COUNTER, SUBTRACT_COUNTER } from './actionTypes';

export const displayToast = (toast) => ({
  type: DISPLAY_TOAST,
  payload: toast,
});

export const addCounter = () => ({ type: ADD_COUNTER });
export const subtractCounter = () => ({ type: SUBTRACT_COUNTER });