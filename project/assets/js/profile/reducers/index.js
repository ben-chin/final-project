import {
    REQUEST_USER,
    RECEIVE_USER,
} from 'report/actions/types';

const initialState = {
    isAnalysing: false,
    isFetchingUser: false,
    user: null,
};

function profileReducer (state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                isFetchingUser: true,
            };

        case RECEIVE_USER:
            return {
                ...state,
                isFetchingUser: false,
                user: action.user,
            };

        default:
            return state;
    }
}

export default profileReducer
