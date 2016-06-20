import _ from 'underscore';
import React from 'react';
import { render } from 'react-dom';

import TweetItem from 'report/components/TweetItem';


export default class TweetList extends React.Component {

    componentWillReceiveProps (nextProps) {
        if (nextProps.deleteTweetError) {
            alert('Error deleting tweet');
        }
    }

    render () {
        return (
            <div className='TweetList col-xs-9'>
                <ul className='TweetList-items'>
                    {this.renderTweetItems(this.props.tweets)}
                </ul>
            </div>
        );
    }

    renderTweetItems (tweets) {
        return tweets.map((item) => {
            return (
                <TweetItem
                    key={item.id}
                    text={item.text}
                    onClick={(e) => this.props.selectTweet(e, item.id)}
                    isSelected={this.isItemSelected(item.id)}
                />
            );
        });
    }

    isItemSelected (tweetId) {
        return _.contains(this.props.selectedTweets, tweetId);
    }

}
