import { GET_SEARCHED_BOOKS, GET_SEARCHED_BOOKS_END } from './actionTypes';

const initialState = {
    filter: '',
    data: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCHED_BOOKS: {
            if(action.payload === '') {
                return { data:[], filter: action.payload };
            }
            return { ...state, filter: action.payload };
        }
        case GET_SEARCHED_BOOKS_END: {
            const result = action.payload;
            if(!result.error) {
                return { ...state, data: result.returnResult }
            }
            break;
        }
        default: { 
            return state;
        }
    }
}
