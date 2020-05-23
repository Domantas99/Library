import { DISPLAY_TOAST } from './actionTypes';
import { duration } from 'moment';

const initialState = {
  toast: {
    type: 'warn',
    message: '',
    props: { 
      position: 'TOP_RIGHT',
      duration: 5000,
    } 
  }
};

export default (state = initialState, action) => {
  console.log(action, 'veiksmas')
  switch (action.type) {
    case DISPLAY_TOAST: {
      return {
        ...state,
        toast: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
