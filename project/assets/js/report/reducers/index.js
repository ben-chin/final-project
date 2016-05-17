import {
    SELECT_CATEGORY,
    REQUEST_REPORT,
    RECEIVE_REPORT,
} from 'report/actions/types';

const initialState = {
    isFetching: false,
    user: {},
    categories: [],
    selectedCategory: null,
};

function reportReducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.categoryId,
            };

        case REQUEST_REPORT:
            return {
                ...state,
                isFetching: true,
            };

        case RECEIVE_REPORT:
            return {
                ...state,
                isFetching: false,
                user: action.user,
                categories: action.categories,
                selectedCategory: action.selectedCategory,
            };

        default:
            return state;
    }
}

export default reportReducer;
