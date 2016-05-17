import { SELECT_CATEGORY } from 'report/actions/types';

const initialState = {
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

        default:
            return state;
    }
}

export default reportReducer;
