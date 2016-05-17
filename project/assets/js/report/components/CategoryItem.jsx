import React from 'react';
import { render } from 'react-dom';


export default class CategoryItem extends React.Component {

    render () {
        return (
            <li className="CategoryList-item CategoryItem" onClick={this.props.onClick}>
                <div className="CategoryItem-hoverBar"></div>
                <div className="CategoryItem-details">
                    <span className="CategoryItem-name">
                        {this.props.name}
                    </span>
                    <span className="CategoryItem-count">
                        {this.props.count}
                    </span>
                </div>
                <div className="CategoryItem-actions">
                    <div className="row">
                        <a className="CategoryItem-action col-xs-3" href="#">
                            <span className="CategoryItem-actionIcon glyphicon glyphicon-ok-circle"></span>
                        </a>
                        <a className="CategoryItem-action col-xs-3" href="#">
                            <span className="CategoryItem-actionIcon glyphicon glyphicon-globe"></span>
                        </a>
                        <a className="CategoryItem-action col-xs-3" href="#">
                            <span className="CategoryItem-actionIcon glyphicon glyphicon-ban-circle"></span>
                        </a>
                        <a className="CategoryItem-action col-xs-3" href="#">
                            <span className="CategoryItem-actionIcon glyphicon glyphicon-eye-close"></span>
                        </a>
                    </div>
                </div>
            </li>
        );
    }

}
