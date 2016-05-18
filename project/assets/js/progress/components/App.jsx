import React from 'react';
import { render } from 'react-dom';

import ProgressContainer from 'progress/containers/ProgressContainer';


export default class App extends React.Component {

    render () {
        return (
            <div className='Progress'>
                <ProgressContainer />
            </div>
        );
    }

}