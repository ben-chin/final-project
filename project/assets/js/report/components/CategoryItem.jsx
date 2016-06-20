import React from 'react';
import { render } from 'react-dom';


export default class CategoryItem extends React.Component {

    render () {
        let isSelected = this.props.isSelected ? 'is-selected' : '';
        return (
            <li className={`CategoryList-item CategoryItem ${isSelected}`} onClick={this.props.onClick}>
                <div className="CategoryItem-hoverBar"></div>
                <div className="CategoryItem-details">
                    <span className="CategoryItem-name">
                        {this.props.name}
                    </span>
                    <span className="CategoryItem-count">
                        {this.props.count}
                    </span>
                </div>
            </li>
        );
    }

}
