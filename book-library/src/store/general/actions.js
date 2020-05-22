import { GET_OFFICES, GET_OFFICES_END } from './actionTypes';

export const getOffices = () => ({ type: GET_OFFICES });
export const getOfficesEnd = (offices) => ({
  type: GET_OFFICES_END,
  payload: offices,
});
