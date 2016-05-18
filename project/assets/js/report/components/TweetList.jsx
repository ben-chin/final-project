import React from 'react';
import { render } from 'react-dom';

import TweetItem from 'report/components/TweetItem';


export default class TweetList extends React.Component {

    render () {
        return (
            <div className='TweetList col-xs-8'>
                <header className='CategoryHeader'>
                    <div className='CategoryHeader-inner'>
                        <h2 className='CategoryHeader-title'>{this.props.categoryName}</h2>
                    </div>
                </header>

                <ul className='TweetList-items'>
                    {this.renderTweetItems(this.props.tweets)}
                </ul>
            </div>
        );
    }

    renderTweetItems(tweets) {
        return tweets.map((item) => {
            return (
                <TweetItem
                    key={item.id}
                    text={item.text}
                />
            );
        });
    }

}
