import { GET_RESERVATIONS_END } from "./actionTypes";

const initialState = {
  reservationData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_END: {
      return {
        ...state,
        reservationData: action.payload,
      };
    }

    default:
      return state;
  }
};
