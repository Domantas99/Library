import { DISPLAY_TOAST, ADD_COUNTER, SUBTRACT_COUNTER } from './actionTypes';

export const displayToast = (message) => ({
  type: DISPLAY_TOAST,
  payload: message,
});

export const addCounter = () => ({ type: ADD_COUNTER });
export const subtractCounter = () => ({ type: SUBTRACT_COUNTER });