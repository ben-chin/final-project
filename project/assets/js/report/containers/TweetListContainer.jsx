import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';

import { fetchTweetsIfNeeded } from 'report/actions/creators';
import TweetList from 'report/components/TweetList';

class TweetListContainer extends React.Component {

    componentDidMount () {
        if (this.props.tweetIds.length > 0) {
            this.props.dispatch(fetchTweetsIfNeeded(this.props.tweetIds));
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.selectedCategory !== this.props.selectedCategory) {
            nextProps.dispatch(fetchTweetsIfNeeded(nextProps.tweetIds));
        }
    }

    render () {
        return (
            <TweetList
                categoryName={this.props.categoryName}
                tweets={this.props.tweets || []}
            />
        );
    }

}

const getSelectedCategory = (categories, id) => {
    if (!id) return null;

    let category = _.find(categories, (c) => c.category.id === id);
    return category;
};

const mapStateToProps = (state) => {
    let category = getSelectedCategory(state.categories, state.selectedCategory);

    let categoryName = category ? category.category.name : '';
    let tweetIds = category ? category.posts : [];

    return {
        categoryName,
        tweetIds,
        tweets: state.tweets,
        selectedCategory: state.selectedCategory,
    };
};


export default connect(
    mapStateToProps
)(TweetListContainer)
