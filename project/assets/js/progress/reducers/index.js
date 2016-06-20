import {
    MARK_SCRAPING_DONE,
    MARK_ANALYSIS_DONE,
} from 'progress/actions/types';

import {
    REQUEST_USER,
    RECEIVE_USER,
} from 'report/actions/types';

const initialState = {
    isAnalysing: true,
    isScrapingDone: false,
    isAnalysisDone: false,
    isFetchingUser: false,
    user: null,
};

function progressReducer (state = initialState, action) {
    switch (action.type) {
        case MARK_SCRAPING_DONE:
            return {
                ...state,
                isScrapingDone: action.isScrapingDone,
            };

        case MARK_ANALYSIS_DONE:
            return {
                ...state,
                isAnalysisDone: action.isAnalysisDone,
                isAnalysing: false,
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

export default progressReducer
