import fetch from 'isomorphic-fetch';

import {
    SELECT_CATEGORY,
    REQUEST_REPORT,
    RECEIVE_REPORT,
} from 'report/actions/types';


export function selectCategory (categoryId) {
    return { type: SELECT_CATEGORY, categoryId };
}

export function requestReport () {
    return { type: REQUEST_REPORT };
}

export function receiveReport (response) {
    return {
        type: RECEIVE_REPORT,
        user: response.user,
        categories: response.categories,
        selectedCategory: () => {
            if (response.categories.length === 0) return null;
            return response.categories[0].category.id;
        },
    };
}

export function fetchReport () {
    return function (dispatch) {
        dispatch(requestReport());
        return fetch('/api/v1/analysis/', {
            credentials: 'same-origin',
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(receiveReport(data));
            });
    };
}
