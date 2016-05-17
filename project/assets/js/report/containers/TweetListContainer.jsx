import _ from 'underscore';
import { connect } from 'react-redux';

import TweetList from 'report/components/TweetList';

const getSelectedCategory = (categories, id) => {
    if (!id) return null;

    let category = _.find(categories, (c) => c.category.id === id);
    return category;
};

const mapStateToProps = (state) => {
    let category = getSelectedCategory(state.categories, state.selectedCategory);

    let categoryName = category ? category.category.name : '';
    let tweets = category ? category.posts : [];

    return {
        categoryName,
        tweets,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TweetList)
