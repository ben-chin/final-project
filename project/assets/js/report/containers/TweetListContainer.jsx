import _ from 'underscore';
import { connect } from 'react-redux';

import TweetList from 'report/components/TweetList';

const getSelectedCategory = (categories, id) => {
    let category = _.find(categories, (c) => c.category.id === id);
    console.log(category, id);
    return category;
};

const mapStateToProps = (state) => {
    let category = getSelectedCategory(state.categories, state.selectedCategory);

    return {
        categoryName: category.category.name,
        tweets: category.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TweetList)
