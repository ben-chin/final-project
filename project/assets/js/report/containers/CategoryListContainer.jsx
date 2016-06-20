import { connect } from 'react-redux';

import { selectCategory } from 'report/actions/creators';
import CategoryList from 'report/components/CategoryList';

const getCatInfo = (categories) => {
    var cats = [];
    for (var i = 0; i < categories.length; i++) {
        cats.push({
            'id': categories[i].category.id,
            'name': categories[i].category.name,
            'count': categories[i].posts.length,
        });
    }
    return cats;
};

const mapStateToProps = (state) => {
    return {
        categories: getCatInfo(state.categories),
        selectedCategory: state.selectedCategory,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCategoryClick: (id) => {
            console.log('click', id);
            dispatch(selectCategory(id));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)
