import { GET_COMMENTS_END } from "./actionTypes";

const initialState = {
    comments: [],
    total: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_END: {
            return {
                ...state, 
                comments: action.payload.comments,
                total: action.payload.total
            }
        }
        
        default: return state;
    }
}