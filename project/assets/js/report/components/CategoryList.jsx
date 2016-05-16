import React from 'react';
import { render } from 'react-dom';

import CategoryItem from 'report/components/CategoryItem';


export default class CategoryList extends React.Component {

    render () {
        return (
            <div className='CategoryList col-xs-4'>
                <header className="ReportHeader">
                    <div className="ReportHeader-inner">
                        <h2 className="ReportHeader-title">Report</h2>
                    </div>
                </header>

                <ul className="CategoryList-items">
                    {this.renderCategoryItems(this.props.categories)}
                </ul>
            </div>
        );
    }

    renderCategoryItems(categories) {
        return categories.map((item) => {
            return (
                <CategoryItem
                    key={item.idx}
                    id={item.idx}
                    name={item.name}
                    count={item.count}
                />
            );
        });
    }

}
