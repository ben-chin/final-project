import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';

import {
    selectTweet,
} from 'report/actions/creators';
import CategoryListContainer from 'report/containers/CategoryListContainer';
import TweetListContainer from 'report/containers/TweetListContainer';


class ReportContainer extends React.Component {

    render() {
        return (
            <div className="Report">
                <header className="Report-header">
                    <h2 className="Report-headerTitle">Results</h2>
                </header>
                <div className="Report-subHeader">
                    <h3 className="Report-subHeaderTitle">
                        You are viewing: <span className="Report-subHeaderCategory">{this.props.categoryName}</span>
                    </h3>
                    <p className="Report-subHeaderActions">
                        <a href="#" className="Report-subHeaderAction">Delete Selected</a>
                        &nbsp;|&nbsp;
                        <a href="#" className="Report-subHeaderAction" onClick={(e) => this.props.dispatch(selectTweet(this.props.tweetIds, true))}>Select All</a>
                        &nbsp;|&nbsp;
                        <span className="Report-subHeaderActionCount">{this.props.selectedCount} selected</span>
                    </p>
                </div>
                <CategoryListContainer />
                <TweetListContainer />
            </div>
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

    let tweetIds = state.tweets ? state.tweets.map((t) => t.id) : [];

    return {
        categoryName,
        tweetIds,
        selectedCount: state.selectedTweets.length,
    };
};


export default connect(
    mapStateToProps
)(ReportContainer)
