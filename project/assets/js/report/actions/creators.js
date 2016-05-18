import fetch from 'isomorphic-fetch';

import {
    SELECT_CATEGORY,
    REQUEST_REPORT,
    RECEIVE_REPORT,
    REQUEST_TWEETS,
    RECEIVE_TWEETS,
    REQUEST_DELETE_TWEET,
    RECEIVE_DELETE_TWEET,
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
        selectedCategory: (() => {
            if (response.categories.length === 0) return null;
            return response.categories[0].category.id;
        })(),
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

export function requestTweets (tweetIds) {
    return { type: REQUEST_TWEETS, tweetIds };
}

export function receiveTweets (response) {
    return {
        type: RECEIVE_TWEETS,
        tweets: response.tweets,
    };
}

export function fetchTweets (tweetIds) {
    return function (dispatch) {
        dispatch(requestTweets(tweetIds));
        let q = `?ids[]=${tweetIds.join('&ids[]=')}`;
        return fetch(`/tweets/${q}`, {
            credentials: 'same-origin',
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(receiveTweets(data));
            });
    };
}

export function fetchTweetsIfNeeded (tweetIds) {
    return (dispatch) => {
        if (tweetIds.length === 0) return Promise.resolve();
        return dispatch(fetchTweets(tweetIds));
    };
}

export function requestDeleteTweet (tweetId) {
    return { type: REQUEST_DELETE_TWEET, tweetId };
}

export function receiveDeleteTweet (tweetId, isSuccess) {
    return { type: RECEIVE_DELETE_TWEET, tweetId, isSuccess };
}

export function deleteTweet (tweetId) {
    return function (dispatch) {
        dispatch(requestDeleteTweet(tweetId));
        return fetch(`/tweets/${tweetId}/delete/`, {
            credentials: 'same-origin',
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(receiveDeleteTweet(tweetId, data.success));
            });
    };
}
