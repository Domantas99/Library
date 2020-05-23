import { DISPLAY_TOAST } from './actionTypes';

export const displayToast = (message) => ({
  type: DISPLAY_TOAST,
  payload: message,
});
