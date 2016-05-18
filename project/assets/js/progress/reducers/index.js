import {
    MARK_SCRAPING_DONE,
    MARK_ANALYSIS_DONE,
} from 'progress/actions/types';

const initialState = {
    isScrapingDone: false,
    isAnalysisDone: false,
};

function progressReducer (state = initialState, action) {
    switch (action.type) {
        case MARK_SCRAPING_DONE:
            return {
                ...state,
                isScrapingDone: action.isScrapingDone,
            }

        case MARK_ANALYSIS_DONE:
            return {
                ...state,
                isAnalysisDone: action.isAnalysisDone,
            }

        default:
            return state;
    }
}

export default progressReducer
