import React from 'react';
import { render } from 'react-dom';

import CategoryList from 'report/components/CategoryList';
import TweetList from 'report/components/TweetList';


export default class App extends React.Component {

    render () {
        return (
            <div className='Report' style={{height: '100%'}}>
                <CategoryList
                    categories={this.props.categories}
                />
                <TweetList
                    categoryName={this.props.categoryName}
                    tweets={this.props.tweets}
                />
            </div>
        );
    }

}
