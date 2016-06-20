import _ from 'underscore';

import {
    SELECT_CATEGORY,
    REQUEST_REPORT,
    RECEIVE_REPORT,
    REQUEST_TWEETS,
    RECEIVE_TWEETS,
    REQUEST_DELETE_TWEET,
    RECEIVE_DELETE_TWEET,
    SELECT_TWEET,
    REQUEST_USER,
    RECEIVE_USER,
} from 'report/actions/types';

const initialState = {
    isAnalysing: false,
    isFetchingReport: false,
    isFetchingUser: false,
    isFetchingTweets: false,
    isDeletingTweet: false,
    deleteTweetError: false,
    reportUser: {},
    categories: [],
    selectedCategory: null,
    selectedTweets: [],
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
                reportUser: action.reportUser,
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

        case REQUEST_DELETE_TWEET:
            return {
                ...state,
                isDeletingTweet: true,
                deleteTweetError: false,
                tweets: _.filter(state.tweets, (t) => t.id !== action.tweetId),
            };

        case RECEIVE_DELETE_TWEET:
            return {
                ...state,
                isDeletingTweet: false,
                deleteTweetError: action.isSuccess,
            };

        case SELECT_TWEET:
            let newTweets = [];
            let selected = Array.isArray(action.selectedTweet) ? action.selectedTweet : [action.selectedTweet];
            if (action.replace) {
                newTweets = _.union(newTweets, selected);
            } else {
                newTweets = _.union(newTweets, state.selectedTweets, selected);
            }
            return {
                ...state,
                selectedTweets: newTweets,
            };

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

export default reportReducer;
