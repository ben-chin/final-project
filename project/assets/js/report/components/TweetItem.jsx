import React from 'react';
import { render } from 'react-dom';


export default class TweetItem extends React.Component {

    render () {
        let isSelected = this.props.isSelected ? 'is-selected' : '';
        return (
            <li className={`TweetList-item TweetItem ${isSelected}`} onClick={this.props.onClick}>
                <div className="TweetItem-hoverBar"></div>
                <div className='TweetItem-details'>
                    <p className='TweetItem-name'>
                        {this.props.text}
                    </p>
                </div>
            </li>
        );
    }

}
