import React from 'react';
import { render } from 'react-dom';

import CategoryListContainer from 'report/containers/CategoryListContainer';
import TweetListContainer from 'report/containers/TweetListContainer';


export default class App extends React.Component {

    render () {
        return (
            <div className='Report' style={{height: '100%'}}>
                <CategoryListContainer />
                <TweetListContainer />
            </div>
        );
    }

}
