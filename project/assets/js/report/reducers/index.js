import {
    SELECT_CATEGORY,
    REQUEST_REPORT,
    RECEIVE_REPORT,
    REQUEST_TWEETS,
    RECEIVE_TWEETS,
} from 'report/actions/types';

const initialState = {
    isFetchingReport: false,
    isFetchingTweets: false,
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
                isFetchingReport: true,
            };

        case RECEIVE_REPORT:
            return {
                ...state,
                isFetchingReport: false,
                user: action.user,
                categories: action.categories,
                selectedCategory: action.selectedCategory,
            };

        case REQUEST_TWEETS:
            return {
                ...state,
                isFetchingTweets: true,
                tweets: [],
            };

        case RECEIVE_TWEETS:
            return {
                ...state,
                isFetchingTweets: false,
                tweets: action.tweets,
            };

        default:
            return state;
    }
}

export default reportReducer;
