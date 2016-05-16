import React from 'react';
import { render } from 'react-dom';


export default class TweetItem extends React.Component {

    render () {
        return (
            <li className='TweetList-item TweetItem'>
                <div className='TweetItem-details'>
                    <a href='#'>
                        <span className='TweetItem-delete glyphicon glyphicon-remove'></span>
                    </a>
                    <p className='TweetItem-name'>
                        {this.props.text}
                    </p>
                </div>
            </li>
        );
    }

}
