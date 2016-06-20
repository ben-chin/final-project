import _ from 'underscore';
import React from 'react';
import { render } from 'react-dom';

import CategoryItem from 'report/components/CategoryItem';


export default class CategoryList extends React.Component {

    render () {
        return (
            <div className='CategoryList col-xs-3'>
                <ul className="CategoryList-items">
                    {this.renderCategoryItems(this.props.categories)}
                </ul>
            </div>
        );
    }

    renderCategoryItems (categories) {
        return categories.map((item) => {
            return (
                <CategoryItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    count={item.count}
                    onClick={() => this.props.onCategoryClick(item.id)}
                    isSelected={this.isCategorySelected(item.id)}
                />
            );
        });
    }

    isCategorySelected (catId) {
        return catId === this.props.selectedCategory;
    }

}
