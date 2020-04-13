import { GET_CATEGORIES, GET_CATEGORIES_END } from './actionTypes';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES: {
            debugger;
            return { ...state };
        }
        case GET_CATEGORIES_END: {
            debugger;
            return { data: action.payload.returnResult };
        }
        default: {
            return state;
        }
    }
}