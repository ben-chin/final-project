import {
    MARK_SCRAPING_DONE,
    MARK_ANALYSIS_DONE,
} from 'progress/actions/types';


export function markScrapingDone () {
    return { type: MARK_SCRAPING_DONE, isScrapingDone: true }
}

export function markAnalysisDone () {
    return { type: MARK_ANALYSIS_DONE, isAnalysisDone: true }
}
