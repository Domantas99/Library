import { DISPLAY_TOAST, ADD_COUNTER, SUBTRACT_COUNTER } from './actionTypes';

const initialState = {
  toast: {
    type: 'warn',
    message: '',
    props: {
      position: 'TOP_RIGHT',
      duration: 5000,
    },
  },
  spinnerCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_TOAST: {
      return {
        ...state,
        toast: action.payload,
      };
    }
    case ADD_COUNTER: {
      return {
        ...state,
        spinnerCount: state.spinnerCount+1,
      };
    }
    case SUBTRACT_COUNTER: {
      return {
        ...state,
        spinnerCount: state.spinnerCount-1,
      };
    }
    default: {
      return state;
    }
  }
};
